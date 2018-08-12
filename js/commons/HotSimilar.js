/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {IMG_MARGIN, IMG_WIDTH} from "../utils/DimensionsUtil";
import {BOOK_DETAIL_BASE, ZSSQ_IMG_URL} from "../constants/api";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import ShadowImage from "./ShadowImage";
import {connect} from "react-redux";
import {requestHotSimilar} from "../actions/hotSimilar";
import I18n from "../i18n/i18n";
import {requestDetail} from "../actions/detail";
import {getChineseText} from "../utils/LanguageUtil";
import Loading from "./Loading";

const _chunk = require('lodash/chunk');

class HotSimilar extends React.Component {

    constructor() {
        super();
        this.books = [];
        this.data = [];
        this.sex = 'male';
        this.title = NovelAppConfig.readerSex + I18n.t('hotRead');
        this.state = {
            index: 0
        }
    }

    componentDidMount() {
        if (NovelAppConfig.readerSex === '男生') {
            this.sex = 'male';
            this.major = '玄幻'
        } else {
            this.sex = 'female';
            this.major = '古代言情'
        }
        let url = 'http://api.zhuishushenqi.com/book/by-categories?major=' +
            this.major + '&start=0&gender=' + this.sex + '&type=hot';
        this.props.dispatch(requestHotSimilar(url))
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.hotSimilarData !== nextProps.hotSimilarData || this.state.index !== nextState.index
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
        if (this.props.hotSimilarData) {
            try {
                this.data = _chunk(this.props.hotSimilarData.books, 8);
                if (this.state.index > this.data.length - 2) {
                    this.setState({
                        index: 0
                    });
                    this.books = this.data[0];
                } else {
                    this.books = this.data[this.state.index];
                }
            } catch (e) {
                console.log('HotSimilar render func error' + e.message)
            }

        }
        const appTheme = this.props.appTheme;
        return (
            this.props.hotSimilarData && this.books ?
                <View style={styles.container}>
                    <CardHeader tagColor={appTheme.primaryColor} title={this.title}/>
                    <View style={styles.cardContent}>
                        {this.books.map((item, index) => {
                            return (
                                <TouchableHighlight key={index} underlayColor="#fff" onPress={() => {
                                    this.props.dispatch(requestDetail(BOOK_DETAIL_BASE + item._id));
                                    this.props.scrollToTop()
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
                </View> :
                <Loading
                    size={'small'}
                    animating={true}
                />
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
    const {hotSimilarData,isFetching} = state.hotSimilar;
    return {hotSimilarData,isFetching}
}

export default connect(mapStateToProps)(HotSimilar)
