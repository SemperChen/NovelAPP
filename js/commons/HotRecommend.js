/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {IMG_MARGIN, IMG_WIDTH} from "../utils/DimensionsUtil";
import {ZSSQ_IMG_URL} from "../constants/api";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import ShadowImage from "./ShadowImage";
import {connect} from "react-redux";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";

const _chunk = require('lodash/chunk');

class HotRecommend extends React.Component {

    constructor() {
        super();
        this.books = [];
        this.data = [];
        this.state = {
            index: 0
        }
    }

    nextPage = () => {
        if (this.state.index > this.data.length - 3) {
            this.setState({
                index: 0
            })
        } else {
            this.setState((prevState) => ({
                index: prevState.index + 1
            }))
        }
    };

    render() {
        if (this.props.hotRecData) {
            this.data = _chunk(this.props.hotRecData.ranking.books, 8);
            if (this.state.index > this.data.length - 2) {
                this.setState({
                    index: 0
                });
                this.books = this.data[0];
            } else {
                this.books = this.data[this.state.index];
            }
        }
        const appTheme = this.props.appTheme;
        return (
            this.props.hotRecData ?
                <View style={styles.container}>
                    <CardHeader tagColor={appTheme.primaryColor} title={I18n.t('hotRec')}/>
                    <View style={[styles.cardContent,]}>
                        {this.books.map((item, index) => {
                            return (
                                <TouchableHighlight key={index} underlayColor="#fff" onPress={() => {
                                    this.props.navToDetail(item._id)
                                }}>
                                    <View>
                                        <ShadowImage source={{uri: ZSSQ_IMG_URL + item.cover}}/>
                                        <View style={styles.contentInfo}>
                                            <Text style={styles.title}
                                                  numberOfLines={1}>{getChineseText(item.title)}</Text>
                                            <Text style={styles.author}
                                                  numberOfLines={1}>{getChineseText(item.author)}</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )
                        })}
                    </View>
                    <CardFooter onPress={() => {
                        this.nextPage()
                    }}/>
                </View> : null
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    cardContent: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        padding: IMG_MARGIN,
        marginBottom: IMG_MARGIN,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee'
    },
    contentInfo: {
        marginTop: -5,
        marginLeft: IMG_MARGIN,
        marginRight: IMG_MARGIN,
        alignItems: 'center',
        width: IMG_WIDTH,
        flex: 1
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    author: {
        marginTop: 2,
        fontSize: 12,
        color: '#99979c'
    }
});

function mapStateToProps(state) {
    const {hotRecData} = state.hotRec;
    return {hotRecData}
}

export default connect(mapStateToProps)(HotRecommend)
