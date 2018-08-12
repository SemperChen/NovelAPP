/**
 * @author Semper
 */
import React from "react";
import {FlatList, InteractionManager, RefreshControl, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {requestRankingDetail} from "../actions/rankingDetail";
import {RANKING_TYPE, RefreshControlColor} from "../constants/constants";
import BookItem from "../commons/BookItem";
import I18n from "../i18n/i18n";

class MonthRanking extends React.Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(requestRankingDetail(this.props.monthRankUrl, RANKING_TYPE.MONTH));
        });
    }

    _navToDetail = (bookId) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId
        })
    };

    render() {
        if (this.props.monthRankingData) {
            this.ranking = this.props.monthRankingData.ranking.books;
        }
        return (
            <View>
                <View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isFetchingMonthRanking}
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
    const {monthRankingData, isFetchingMonthRanking} = state.rankingDetail;
    return {monthRankingData, isFetchingMonthRanking}
}

export default connect(mapStateToProps)(MonthRanking)