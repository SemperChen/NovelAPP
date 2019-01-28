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

class GuessYouLike extends React.Component {

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

    shouldComponentUpdate(nextProps,nextState){
        if (nextProps.guessYouLikeData) {
            try{
                this.data = _chunk(nextProps.guessYouLikeData.ranking.books, 8);
                if(this.data.length > 1 ){
                    if (nextState.index > this.data.length - 2) {
                        this.books = this.data[0];
                        this.setState({
                            index: 0
                        });
                    } else {
                        this.books = this.data[nextState.index];
                    }
                }

            }catch (e) {
                console.warn('BestEndBooks shouldComponentUpdate',e.message)
            }

        }
        return this.props.guessYouLikeData !== nextProps.guessYouLikeData||this.state.index !== nextState.index
    }

    render() {
        return (
            this.books&&this.books.length>0 ?
                <View style={styles.container}>
                    <CardHeader tagColor={this.props.appTheme.primaryColor} title={I18n.t('guessYouLike')}/>
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
    const {guessYouLikeData} = state.guessYouLike;
    return {guessYouLikeData}
}

export default connect(mapStateToProps)(GuessYouLike)
