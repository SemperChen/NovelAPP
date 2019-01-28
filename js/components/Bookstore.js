/**
 * @author Semper
 */
import React from 'react';
import {DeviceEventEmitter, RefreshControl, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {requestRankings} from "../actions/rankings";
import {RANKING_BASE_URL, RANKINGS_URL, SPREAD_URL} from "../constants/api";
import HotRecommend from "../commons/HotRecommend";
import BestEndBooks from "../commons/BestEndBooks";
import EditorRecommend from "../commons/EditorRecommend";
import ImageCarousel from "../commons/ImageCarousel";
import {requestSpread} from "../actions/spread";
import {Ranking} from "../model/Ranking";
import {Rankings} from "../model/Rankings";
import {requestHotRec} from "../actions/hotRec";
import {requestBestEnd} from "../actions/bestEnd";
import {requestEditorRec} from "../actions/editorRec";
import {READER_SEX, RefreshControlColor, TAB_ICON_SIZE} from "../constants/constants";
import GuessYouLike from "../commons/GuessYouLike";
import {requestGuessYouLike} from "../actions/guessYouLike";
import HotSearch from "../commons/HotSearch";
import {requestHotSearch} from "../actions/hotSearch";
import I18n from "../i18n/i18n";

class Bookstore extends React.Component {

    rankings: Rankings;
    ranking: Ranking;
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            tabBarLabel: ({focused}) => (
                <Text style={[{
                    fontSize: 12,
                    marginBottom: 5
                }, focused ?
                    {color: screenProps.appTheme.darkColor} :
                    {color: screenProps.appTheme.lightColor}]}>{I18n.t('bookStore')}</Text>

            ),
            tabBarIcon: ({focused}) => (
                <MaterialIcons name="store" size={TAB_ICON_SIZE}
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
            headerStyle: {paddingRight: 10, backgroundColor: screenProps.appTheme.primaryColor},
        }
    };

    constructor() {
        super();
        this.isFirstOpen = true
    }

    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        this._initData();
        this.subscription = DeviceEventEmitter.addListener('ChangeReaderSex', () => {
            this._fetchAllData()
        })
    }

    _initData = () => {
        this.props.dispatch(requestRankings(RANKINGS_URL));
        this.props.dispatch(requestSpread(SPREAD_URL));
    };

    componentWillUnmount() {
        // 移除
        this.subscription.remove();
    }

    _navToDetail = (bookId) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId
        })
    };

    fetchHotRecommend = (id) => {
        this.props.dispatch(requestHotRec(RANKING_BASE_URL + id))
    };

    fetchBestEndBook = (id) => {
        this.props.dispatch(requestBestEnd(RANKING_BASE_URL + id))
    };

    fetchEditorRecommend = (id) => {
        this.props.dispatch(requestEditorRec(RANKING_BASE_URL + id))
    };

    fetchGuessYouLike = (id) => {
        this.props.dispatch(requestGuessYouLike(RANKING_BASE_URL + id))
    };

    fetchHotSearch = (id) => {
        this.props.dispatch(requestHotSearch(RANKING_BASE_URL + id))
    };

    _fetchAllData = () => {
        if (this.props.rankingsData) {
            this.rankings = this.props.rankingsData;
            if (NovelAppConfig.readerSex === READER_SEX.FEMALE) {
                this.fetchHotRecommend(this.rankings.female[11]._id);
                this.fetchBestEndBook(this.rankings.female[6]._id);
                this.fetchEditorRecommend(this.rankings.female[10]._id);
                this.fetchGuessYouLike(this.rankings.female[0]._id);
                this.fetchHotSearch(this.rankings.female[5]._id)

            } else {
                this.fetchHotRecommend(this.rankings.male[12]._id);
                this.fetchBestEndBook(this.rankings.male[5]._id);
                this.fetchEditorRecommend(this.rankings.male[11]._id);
                this.fetchGuessYouLike(this.rankings.male[0]._id);
                this.fetchHotSearch(this.rankings.male[4]._id)

            }
        }
    };

    render() {
        const appTheme = this.props.screenProps.appTheme;
        if (this.props.rankingsData && this.isFirstOpen) {
            this.isFirstOpen = false;
            this._fetchAllData();
        }
        return (
            <View style={{flex: 1}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this._initData}
                            tintColor={RefreshControlColor.tintColor}
                            title="同步中..."
                            titleColor={RefreshControlColor.titleColor}
                            colors={RefreshControlColor.colors}
                            progressBackgroundColor={RefreshControlColor.progressBackgroundColor}
                        />
                    }
                >
                    <ImageCarousel appTheme={appTheme} navToDetail={this._navToDetail}/>
                    <HotRecommend appTheme={appTheme} navToDetail={this._navToDetail}/>
                    <BestEndBooks appTheme={appTheme} navToDetail={this._navToDetail}/>
                    <EditorRecommend appTheme={appTheme} navToDetail={this._navToDetail}/>
                    <GuessYouLike appTheme={appTheme} navToDetail={this._navToDetail}/>
                    <HotSearch appTheme={appTheme} navToDetail={this._navToDetail}/>
                </ScrollView>
            </View>

        )
    }

}

function mapStateToProps(state) {
    const {rankingsData, isFetchingRankings} = state.rankings;
    return {rankingsData, isFetchingRankings}
}

export default connect(mapStateToProps)(Bookstore)