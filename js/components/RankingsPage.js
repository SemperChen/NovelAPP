/**
 * @author Semper
 */
import React from 'react';
import {Image, InteractionManager, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {RANKINGS_URL, ZSSQ_IMG_URL} from "../constants/api";
import {requestRankings} from "../actions/rankings";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";

class RankingsPage extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: I18n.t('rankings'),
        headerStyle: {backgroundColor: screenProps.appTheme.primaryColor},
        headerTintColor: '#fff'
    });

    navToRankingDetail = (item) => {
        if (item.monthRank) {
            this.props.navigation.navigate('Ranking', {ranking: item})
        } else {
            this.props.navigation.navigate('WeekRankingPage', {ranking: item})
        }
    };

    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        if (!this.props.rankingsData) {
            InteractionManager.runAfterInteractions(() => {
                this.props.dispatch(requestRankings(RANKINGS_URL));
            });
        }
    }

    render() {
        if (this.props.rankingsData) {
            // console.log(this.props.rankingsData);
            this.femaleRanks = this.props.rankingsData.female;
            this.maleRanks = this.props.rankingsData.male;
        }
        return (
            this.props.rankingsData ?
                <ScrollView>
                    <Text style={styles.rankTag}>{I18n.t('femaleRankings')}</Text>
                    <View style={styles.itemsContent}>
                        {this.femaleRanks.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        this.navToRankingDetail(item)
                                    }}>
                                    <View style={styles.item}>
                                        <Image
                                            source={index < 5
                                                ?
                                                {uri: ZSSQ_IMG_URL + item.cover}
                                                :
                                                require('../../data/img/collapse.png')}
                                            style={styles.itemImg}/>
                                        <Text style={styles.itemText}>{getChineseText(item.title)}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}

                    </View>
                    <Text style={styles.rankTag}>{I18n.t('maleRankings')}</Text>
                    <View style={styles.itemsContent}>
                        {this.maleRanks.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => {
                                    this.navToRankingDetail(item)
                                }}>
                                    <View style={styles.item}>
                                        <Image
                                            source={index < 5
                                                ?
                                                {uri: ZSSQ_IMG_URL + item.cover}
                                                :
                                                require('../../data/img/collapse.png')}
                                            style={styles.itemImg}/>
                                        <Text style={styles.itemText}>{getChineseText(item.title)}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}

                    </View>
                </ScrollView>

                : null
        )
    }
}

const styles = StyleSheet.create({
    itemText: {
        fontSize: 18,
        marginLeft: 10
    },
    rankTag: {
        color: '#999',
        backgroundColor: '#F8F8F8',
        padding: 10
    },
    itemsContent: {
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#eee',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    itemImg: {
        width: 30,
        height: 30,
        opacity: 0.5
    }
});

function mapStateToProps(state) {
    const {rankingsData, isFetchingRankings} = state.rankings;
    return {rankingsData, isFetchingRankings}
}

export default connect(mapStateToProps)(RankingsPage)