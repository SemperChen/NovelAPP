import React from "react";
import {ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import {Article} from "../model/Article";
import Loading from "./Loading";
import I18n from "../i18n/i18n";
import {getChineseText, Traditionalized} from "../utils/LanguageUtil";

const VIEWABILITY_CONFIG = {
    viewAreaCoveragePercentThreshold: 80,//item80%部分可见才视为可见
};
class CustomFlatList extends React.Component {
    currentArticle: Article;

    constructor() {
        super();
        this.state = this.initializeData()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.fontSize !== nextState.fontSize ||
            this.state.color !== nextState.color ||
            this.props.articles !== nextProps.articles ||
            this.props.isFetching !== nextProps.isFetching ||
            this.props.prevArticle !== nextProps.prevArticle ||
            this.props.catalogDataLength !== nextProps.catalogDataLength
    }

    /**
     * 初始化数据
     *
     * @returns {{fontSize: number, color: string}}
     */
    initializeData = () => {
        let state = {
            fontSize: NovelAppConfig.readConfig.fontSize,
            color: NovelAppConfig.readConfig.fontColor
        };
        if (NovelAppConfig.readConfig.isNightMode) {
            state.color = NovelAppConfig.readConfig.darkFontColor
        }
        return state
    };

    setFontSize = (fontSize) => {
        this.setState({
            fontSize: fontSize
        })
    };

    setFontColor = (color) => {
        this.setState({
            color: color
        })
    };

    scrollToIndex(params: {
        animated?: ?boolean,
        index: number,
        viewOffset?: number,
        viewPosition?: number,
    }) {
        this._flatRef.scrollToIndex(params);
    }

    /**
     * 简繁体转换
     *
     * @param text
     * @returns {*}
     */
    toggleChineseText = (text) => {
        if (NovelAppConfig.isTraditional) {
            return Traditionalized(text)
        } else {
            return text
        }
    };

    render() {
        // console.log('articles',this.props.articles)
        return (
            <FlatList
                debug={false}
                scrollEnabled={false}
                ref={(ref) => {
                    this._flatRef = ref
                }}
                ListEmptyComponent={() => {
                    return (
                        <View style={{alignSelf: 'center', height: HEIGHT}}>
                            <Loading animating={true}/>
                        </View>
                    )
                }}
                data={this.props.articles}
                extraData={[this.props.prevAricle]}
                getItemLayout={this._getItemLayout}
                renderItem={this._renderItem}
                onViewableItemsChanged={this._onViewableItemsChanged}
                viewabilityConfig={VIEWABILITY_CONFIG}
                keyExtractor={this._keyExtractor}
            />
        )
    }

    _onViewableItemsChanged = (info) => {

        let itemsLength = info.viewableItems.length;
        if (itemsLength === 1) {
            this.currentArticle = (info.viewableItems[itemsLength - 1]).item;
            this.props.setCurrentArticle(this.currentArticle);
            if (!this.props.prevArticle) {
                this.props.fetchArticles()
            }
            try {
                if (this.props.prevArticle &&
                    this.currentArticle &&
                    this.currentArticle.currentChapterNum !== this.props.prevArticle.currentChapterNum &&
                    this.currentArticle.currentChapterNum > this.props.prevArticle.currentChapterNum &&
                    !this.props.isFetching) {
                    this.props.fetchArticles()
                }
            } catch (e) {
                console.warn('CustomFlatList _onViewableItemsChanged', e.message)
            }


            this.props.scrollIndexByBookmark()
        }

    };

    /**
     * 字体lineHeight大小，上下间距
     *
     * @returns {number}
     */
    getLineHeight =()=>{
        if(Platform.OS==='ios'){
            return (this.state.fontSize)*1.4
        }else{
            return (this.state.fontSize)*1.9
        }
    };

    _renderItem = (info: { item: Article, index: number }) => {
        return (
            <View
                style={styles.itemContainer}>
                <Text
                    style={[{color: this.state.color}, styles.itemTitle]}>{this.toggleChineseText(info.item.chapterName)}</Text>
                <Text
                    allowFontScaling={false} //控制字体是否要根据系统的“字体大小”辅助选项来进行缩放,默认true
                    style={[{
                        color: this.state.color,
                        fontSize: this.state.fontSize,
                        lineHeight:this.getLineHeight(),
                        textAlign:'center'
                    }, styles.articleText]}>
                    {this.toggleChineseText(info.item.chapterContent)}
                </Text>
                {
                    this.props.catalogDataLength === info.item.currentChapterNum && info.index === this.props.articles.length - 1
                        ?
                        <Text
                            style={[
                                styles.noMoreChapter,
                                {color: this.state.color}
                            ]}
                        >{getChineseText('没有更多章节了')}</Text>
                        :
                        <View style={styles.reFetchContainer}>
                            {info.index === this.props.articles.length - 1
                                ?
                                <TouchableOpacity
                                    style={styles.reFetchButton}
                                    onPress={() => {
                                        this.props.reFetchArticle()
                                    }}
                                >
                                    {
                                        this.props.isFetching
                                            ?
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={styles.reFetchText}>{I18n.t('loadingNextPage')}</Text>
                                                <ActivityIndicator
                                                    animating={true}
                                                    color="#fff"
                                                    size="small"
                                                />
                                            </View>

                                            :
                                            <Text style={styles.reFetchText}>{I18n.t('loadNextPage')}</Text>
                                    }
                                </TouchableOpacity>
                                :
                                null
                            }
                        </View>
                }

            </View>
        )
    };

    _getItemLayout = (data, index) => (
        {length: HEIGHT, offset: HEIGHT * index, index}
    );

    _keyExtractor = (item, index) => {
        return item.chapterName + index
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: HEIGHT,
        width: WIDTH,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 12,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    articleText: {
        alignSelf: 'center',
        textAlign: 'justify',
        textAlignVertical:'center'

    },
    reFetchContainer: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0
    },
    reFetchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'deeppink',
        width: WIDTH - 50,
        alignSelf: 'center',
        borderRadius: 20,
        marginBottom: 5
    },
    reFetchText: {
        fontSize: 16,
        margin: 8,
        color: '#fff'
    },
    noMoreChapter: {
        position: 'absolute',
        bottom: 0,
        fontSize: 18,
        alignSelf: 'center'
    }
});
export default CustomFlatList