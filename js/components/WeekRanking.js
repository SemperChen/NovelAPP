/**
 * @author Semper
 */
import React from "react";
import {FlatList, InteractionManager, RefreshControl, StyleSheet, Text, View} from "react-native";
import {clearRankingDetailCache, requestRankingDetail} from "../actions/rankingDetail";
import {connect} from "react-redux";
import {RANKING_TYPE, RefreshControlColor} from "../constants/constants";
import BookItem from "../commons/BookItem";
import I18n from "../i18n/i18n";

class WeekRanking extends React.Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(requestRankingDetail(this.props.weekRankUrl, RANKING_TYPE.WEEK));
        });
    }

    _navToDetail = (bookId) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId
        })
    };

    componentWillUnmount() {
        this.props.dispatch(clearRankingDetailCache())
    }

    render() {
        if (this.props.weekRankingData) {
            this.ranking = this.props.weekRankingData.ranking.books;
        }
        return (
            <View>
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
            <BookItem navToDetail={this.props.navToDetail} book={item}/>
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

export default connect(mapStateToProps)(WeekRanking)