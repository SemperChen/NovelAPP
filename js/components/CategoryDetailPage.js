/**
 * @author Semper
 */
import React from "react";
import {Animated, FlatList, RefreshControl, StatusBar, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {CATEGORY_BOOKS_URL} from "../constants/api";
import BookItem from "../commons/BookItem";
import {clearBookCache, requestCategoryDetail} from "../actions/categoryDetail";
import {filterWidth} from "../utils/DimensionsUtil";
import Icon from "react-native-vector-icons/Ionicons";
import {RefreshControlColor} from "../constants/constants";
import Loading from "../commons/Loading";
import SortDrawer from "../commons/SortDrawer";
import I18n from "../i18n/i18n";

class CategoryDetailPage extends React.Component {

    constructor() {
        super();
        this.isOpen = false;
        this.animatedValue = new Animated.Value(-filterWidth);
        this.start = 0;
        this.books = [];
        this.type = 'hot';
        this.state = {
            currentCateIndex: 0,
            currentOtherIndex: 0
        }

    }

    static navigationOptions = ({navigation, screenProps}) => {
        const {item, toggleFilter} = navigation.state.params;
        let major = item.major;
        return {
            headerTitle: major ? major : I18n.t('detail'),
            headerStyle: {elevation: 0, backgroundColor: screenProps.appTheme.primaryColor},
            headerTintColor: '#fff',
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        toggleFilter()
                    }}>
                    <Icon
                        style={{padding: 18}}
                        name='ios-funnel'
                        size={20}
                        color='#fff'
                        // onPress={this._search.bind(this)}
                    />
                </TouchableOpacity>)
            // headerTintColor:screenProps.theme
        }
    };

    openFilter() {
        this.sortDrawer.openFilterDrawer()
    }

    closeFilter() {
        this.sortDrawer.closeFilterDrawer()
    }

    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        const {setParams, state} = this.props.navigation;
        const {params} = state;
        this.item = params.item;
        this.major = this.item.major;
        this.mins = this.item.mins;
        this.category = [I18n.t('all')].concat(this.mins);
        this.otherTypes = [{type: 'hot', title: I18n.t('hot')}, {type: 'reputation', title: I18n.t('reputation')},
            {type: 'new', title: I18n.t('newBook')}, {type: 'over', title: I18n.t('over')}];
        this.gender = params.gender;
        setParams({toggleFilter: this.toggleFilter});
        this.fetchCategoryDetail()
    }

    shouldComponentUpdate(nextProps) {
        return !(this.props.categoryDetailData === nextProps.categoryDetailData
            && this.props.isFetching === nextProps.isFetching);
    }

    componentWillUnmount() {
        this.props.dispatch(clearBookCache())
    }

    toggleFilter = () => {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.openFilter();
        } else {
            this.closeFilter();
        }
    };

    _navToDetail = (bookId) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId
        })
    };

    fetchCategoryDetail = (type = 'hot', min) => {

        let url = CATEGORY_BOOKS_URL + '?major=' + this.major + '&limit=30' + '&start=' +
            this.start + '&gender=' + this.gender + '&type=' + type;
        if (min && min !== '全部') {
            url = url + '&minor=' + min;
        }
        console.log('url:', url);
        this.props.dispatch(requestCategoryDetail(url));
        this.start = this.start + 30;
    };

    _clearBookData = () => {
        this.books = [];
        this.start = 0;
    };

    setTypeAndCat = (type, cat) => {
        this.type = type;
        this.cat = cat
    };

    render() {
        const appTheme = this.props.screenProps.appTheme;
        if (this.props.categoryDetailData && !this.props.isFetching) {
            this.books = this.books.concat(this.props.categoryDetailData.books);
            // console.log('this.books',this.books)
        }
        return (

            <View style={{flex: 1}}>
                <View
                    onStartShouldSetResponder={() => {
                        return this.isOpen;
                    }}
                    onMoveShouldSetResponder={() => {
                        return this.isOpen;
                    }}
                    onResponderRelease={this._onResponderRelease}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isFetching}
                                onRefresh={() => {
                                }}
                                tintColor={RefreshControlColor.tintColor}
                                title={I18n.t('loadingGetBook')}
                                titleColor={RefreshControlColor.titleColor}
                                colors={RefreshControlColor.colors}
                                progressBackgroundColor={RefreshControlColor.progressBackgroundColor}
                            />
                        }
                        onEndReachedThreshold={10}
                        onEndReached={() => {
                            // console.log('onEndReached');
                            if (!this.props.isFetching) {
                                this.fetchCategoryDetail(this.type, this.cat);
                            }

                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{opacity: 0}}>
                                    <Loading/>
                                </View>
                            )
                        }}
                        data={this.books}
                        extraData={[this.start]}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
                <SortDrawer
                    ref={(ref) => {
                        this.sortDrawer = ref
                    }}
                    category={this.category}
                    otherTypes={this.otherTypes}
                    toggleFilter={this.toggleFilter}
                    fetchCategoryDetail={this.fetchCategoryDetail}
                    setTypeAndCat={this.setTypeAndCat}
                    clearBookData={this._clearBookData}
                    appTheme={appTheme}
                />

            </View>
        )
    }

    _renderItem = ({item}) => {
        return (
            <BookItem navToDetail={this._navToDetail} book={item}/>
        )
    };

    _keyExtractor = (item, index) => {
        return index
    };

    _onResponderRelease = () => {
        if (this.isOpen) {
            this.toggleFilter()
        }
    }
}

function mapStateToProps(state) {
    const {categoryDetailData, isFetching} = state.categoryDetail;
    return {categoryDetailData, isFetching}
}

export default connect(mapStateToProps)(CategoryDetailPage)