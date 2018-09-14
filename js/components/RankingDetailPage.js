/**
 * @author Semper
 */
import React from "react";
import ScrollableTabView from "react-native-scrollable-tab-view";
import WeekRanking from "./WeekRanking";
import MonthRanking from "./MonthRanking";
import TotalRanking from "./TotalRanking";
import {RANKING_BASE_URL} from "../constants/api";
import I18n from "../i18n/i18n";
import {StatusBar} from "react-native";

class RankingDetailPage extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        const {ranking} = navigation.state.params;
        let rankingName = I18n.t('rankingDetail');
        if (ranking) {
            rankingName = ranking.title
        }
        return {
            headerTitle: rankingName,
            headerStyle: {backgroundColor: screenProps.appTheme.primaryColor, elevation: 0},
            headerTintColor: '#fff'
        }

    };

    componentWillMount() {
        const {state, setParams} = this.props.navigation;
        const {ranking} = state.params;
        const title = ranking.title;
        if (title) {
            setParams({title: title})
        }
        this.weekRankUrl = RANKING_BASE_URL + ranking._id;
        this.monthRankUrl = RANKING_BASE_URL + ranking.monthRank;
        this.totalRankUrl = RANKING_BASE_URL + ranking.totalRank;
    }

    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
    }

    _navToDetail = (bookId) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId
        })
    };

    render() {
        const appTheme = this.props.screenProps.appTheme;
        return (
            <ScrollableTabView
                tabBarBackgroundColor={appTheme.primaryColor}
                tabBarActiveTextColor='#fff'
                tabBarInactiveTextColor='#eee'
                tabBarUnderlineStyle={{
                    backgroundColor: 'gold',
                    height: 2
                }}>
                <WeekRanking tabLabel={I18n.t('weekRanking')} weekRankUrl={this.weekRankUrl}
                             navToDetail={this._navToDetail}/>
                <MonthRanking tabLabel={I18n.t('monthRanking')} monthRankUrl={this.monthRankUrl}
                              navToDetail={this._navToDetail}/>
                <TotalRanking tabLabel={I18n.t('totalRanking')} totalRankUrl={this.totalRankUrl}
                              navToDetail={this._navToDetail}/>
            </ScrollableTabView>
        )
    }
}

export default RankingDetailPage