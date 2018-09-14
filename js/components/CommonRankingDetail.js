/**
 * @author Semper
 */
import React from "react";
import {FlatList, InteractionManager, RefreshControl, StatusBar, StyleSheet, Text, View} from "react-native";
import {requestRankingDetail} from "../actions/rankingDetail";
import {connect} from "react-redux";
import {RANKING_BASE_URL} from "../constants/api";
import {RANKING_TYPE, RefreshControlColor} from "../constants/constants";
import BookItem from "../commons/BookItem";
import I18n from "../i18n/i18n";

class CommonRankingDetail extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {ranking} = navigation.state.params;
        let rankingName = I18n.t('rankingDetail');
        if (ranking) {
            rankingName = ranking.title
        }
        return {
            tabBarLabel: () => {
                return (
                    <Text
                        style={{color: screenProps.appTheme.primaryColor, fontSize: 12}}>{I18n.t('weekRanking')}</Text>
                )
            },
            headerTitle: rankingName,
            headerStyle: {elevation: 0, backgroundColor: screenProps.appTheme.primaryColor},
            headerTintColor: '#fff'
            // headerTintColor:screenProps.theme
        }
    };

    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        const {state, setParams} = this.props.navigation;
        const {ranking} = state.params;
        const title = ranking.title;
        if (title) {
            setParams({title: title})
        }
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(requestRankingDetail(RANKING_BASE_URL + ranking._id, RANKING_TYPE.WEEK));
        });
    }

    _navToDetail = (bookId) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId
        })
    };

    render() {
        if (this.props.weekRankingData) {
            this.ranking = this.props.weekRankingData.ranking.books;
        }
        const appTheme = this.props.screenProps.appTheme;
        return (
            <View>
                <StatusBar
                    animated={true}
                    backgroundColor={appTheme.darkColor}
                    barStyle="light-content"
                />
                <View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isFetchingWeekRanking}
                                onRefresh={() => {
                                }}
                                tintColor={RefreshControlColor.tintColor}
                                title={I18n.t('loadingGetBook')}
                                titleColor={RefreshControlColor.titleColor}
                                colors={RefreshControlColor.colors}
                                progressBackgroundColor={RefreshControlColor.progressBackgroundColor}
                            />
                        }
                        ListFooterComponent={() => {
                            return (
                                this.ranking ?
                                    <View style={{
                                        alignItems: 'center', padding: 10,
                                        borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#eee'
                                    }}>
                                        <Text>{I18n.t('noMore')}</Text>
                                    </View> : null
                            )
                        }}
                        data={this.ranking}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
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
    }
}

function mapStateToProps(state) {
    const {weekRankingData, isFetchingWeekRanking} = state.rankingDetail;
    return {weekRankingData, isFetchingWeekRanking}
}

export default connect(mapStateToProps)(CommonRankingDetail)