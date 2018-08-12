/**
 * @author Semper
 */
import React from 'react';
import {Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BookmarkComponent from "../commons/BookmarkComponent";
import {requestBookmarks} from "../actions/bookmarks";
import {WIDTH} from "../utils/DimensionsUtil";
import {TAB_ICON_SIZE} from "../constants/constants";
import {removeBookmark, sortBy} from "../utils/BookmarkUtil";
import I18n from '../i18n/i18n';

class Bookcase extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        tabBarLabel: ({focused}) => (
            <Text style={[{
                color: screenProps.appTheme.darkColor,
                fontSize: 12,
                marginBottom: 5
            }, focused ?
                {color: screenProps.appTheme.darkColor} :
                {color: screenProps.appTheme.lightColor}]}>{I18n.t('bookcase')}</Text>
        ),
        tabBarIcon: ({focused}) => (
            <MaterialIcons name="book" size={TAB_ICON_SIZE}
                           style={focused ?
                               {color: screenProps.appTheme.darkColor} :
                               {color: screenProps.appTheme.lightColor}}/>
        ),
        headerRight: (
            <TouchableOpacity
                style={{padding: 5}}
                onPress={() => {
                    navigation.navigate('Search')
                }}>
                <MaterialIcons name="search" size={28} style={{color: '#fff'}}/>
            </TouchableOpacity>),
        headerLeft: (
            <TouchableOpacity
                style={{padding: 5,marginLeft:5}}
                onPress={() => {
                    navigation.navigate('User')
                }}>
                <MaterialIcons name="person" size={28} style={{color: '#fff'}}/>
            </TouchableOpacity>
        ),
        headerStyle: {paddingRight: 10, backgroundColor: screenProps.appTheme.primaryColor},
    });

    constructor() {
        super();
    }

    componentWillMount(){
        StatusBar.setHidden(false);
    }

    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        this.props._onRefresh();
    }

    navToReader = (bookmark) => {
        this.props.navigation.navigate('Read', {bookmark: bookmark})
    };

    _removeAndReLoadBookmark = async (key, id) => {
        await removeBookmark(key, id);

    };

    /**
     * 提示是否要删除书签
     * @param tag 唯一标识
     *  @param bookName 书名
     */
    showIsDeleteBookmark = (tag, bookName) => {
        Alert.alert(
            I18n.t('reminder'),
            I18n.t('isDel') + '《' + bookName + '》？',
            [
                {text: I18n.t('cancel'), style: 'cancel'},
                {
                    text: I18n.t('del'), onPress: () => {
                        this._removeAndReLoadBookmark('bookmark', tag).then(this.props._onRefresh())
                    }
                },
            ],
        )
    };

    render() {
        const {bookmarks} = this.props;
        let sortBookmarks = [];
        if (bookmarks) {
            sortBookmarks = bookmarks.sort(sortBy('lastReadTime'));
        }
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    {sortBookmarks && sortBookmarks.length !== 0 ? sortBookmarks.map((bookmark) => {
                        return <BookmarkComponent
                            key={bookmark.tag}
                            bookmark={bookmark}
                            navToReader={this.navToReader}
                            showIsDeleteBookmark={this.showIsDeleteBookmark}
                        />
                    }) : <Text>{I18n.t('notSaveBookmark')}</Text>}
                    {/*<Text style={{marginTop:500}}>{this.props.bookmarks.toString()}</Text>*/}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        padding: WIDTH / 24,
    }
});

function mapStateToProps(state) {
    const {items: bookmarks, isRefreshing} = state.bookmarks || {items: [], isRefreshing: false};
    return {bookmarks, isRefreshing}
}

function mapDispatchToProps(dispatch) {
    return {
        _onRefresh: () => dispatch(requestBookmarks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookcase)
