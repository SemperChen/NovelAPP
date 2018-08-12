/**
 * @author Semper
 */
import React from "react";
import {FlatList, InteractionManager, RefreshControl, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import BookItem from "../commons/BookItem";
import {RANKING_TYPE, RefreshControlColor} from "../constants/constants";
import {requestRankingDetail} from "../actions/rankingDetail";
import I18n from "../i18n/i18n";

class TotalRanking extends React.Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(requestRankingDetail(this.props.totalRankUrl, RANKING_TYPE.TOTAL));
        });
    }

    _navToDetail = (bookId) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId
        })
    };

    render() {
        if (this.props.totalRankingData) {
            this.ranking = this.props.totalRankingData.ranking.books;
        }
        return (
            <View>
                <View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isFetchingTotalRanking}
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
    const {totalRankingData, isFetchingTotalRanking} = state.rankingDetail;
    return {totalRankingData, isFetchingTotalRanking}
}

export default connect(mapStateToProps)(TotalRanking)