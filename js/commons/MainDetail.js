import React from "react";
import {ActivityIndicator, Image, PixelRatio, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {BOOK_DETAIL_BASE, ZSSQ_IMG_URL, ZSSQ_NAME} from "../constants/api";
import I18n from "../i18n/i18n";
import {BOOKMARK_HEIGHT, BOOKMARK_WIDTH} from "../utils/DimensionsUtil";
import {connect} from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StarScore from "./StarScore";
import ReadButton from "./ReadButton";
import {clearDetail, requestDetail} from "../actions/detail";
import {requestBookmarks} from "../actions/bookmarks";
import {saveBookmark} from "../utils/BookmarkUtil";
import {Bookmark} from "../model/Bookmark";
import {getChineseText} from "../utils/LanguageUtil";

class MainDetail extends React.Component {

    componentDidMount() {
        if (this.props.params) {
            let bookId = this.props.params.bookId;
            this.bookDetailUrl = BOOK_DETAIL_BASE + bookId;
            this.props.dispatch(requestDetail(this.bookDetailUrl))
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearDetail())
    }

    saveAndRereadBookmarks = async () => {
        //TODO saving
        await this._saveBookmark();
        //TODO saved
        await this._reReadBookmark();
    };

    //加入书签
    _saveBookmark = () => {
        if (this.bookDetail !== null && this.bookDetail !== undefined) {
            let bookmark = new Bookmark(
                this.bookDetail._id,
                this.bookDetail.title,
                null,
                null,
                1,
                1,
                0,
                ZSSQ_IMG_URL + this.bookDetail.cover,
                ZSSQ_NAME,
                this.bookDetail._id,
                new Date().getTime());
            // console.log('saveBookmark', bookmark.tag);
            saveBookmark(bookmark);
        }
    };

    //刷新书签
    _reReadBookmark = () => {
        this.props.dispatch(requestBookmarks())
    };

    render() {
        const appTheme = this.props.appTheme;
        this.bookDetail = this.props.bookDetail;
        if (this.bookDetail) {
            try {
                this.score = this.bookDetail.rating.score;
                this.tags = this.bookDetail.tags;
                this._id = this.bookDetail._id;
            } catch (e) {
                console.warn('BookDetailPage render', e.message)
            }
            if (this.props.bookmarks) {
                const _findIndex = require('lodash/findIndex');
                let index = _findIndex(this.props.bookmarks, (item) => {
                    return item.id === this.bookDetail._id;
                });
                this.bookmark = this.props.bookmarks[index]
            }
        }
        return (
            <View style={{backgroundColor: '#fff'}}>
                {this.bookDetail && this._id && this.score
                    ?
                    <View>
                        {this.props.isFetchingDetail
                            ?
                            <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}
                            >
                                <ActivityIndicator
                                    animating={true}
                                    color={appTheme.primaryColor}
                                    size="small"
                                />
                                <Text style={{color: appTheme.primaryColor}}>加载中，请稍等</Text>
                            </View>

                            : null
                        }

                        {this._renderInfo()}
                        {this._renderReadButton(appTheme.primaryColor)}
                        {this._renderChapterCatalog()}
                        {/*{this._serializeWordCount()}*/}
                    </View>
                    :
                    null
                }


            </View>
        )
    }

    /**
     * 渲染书籍详情
     * @returns {*}
     * @private
     */
    _renderInfo = () => {
        return (
            <View style={styles.bookInfo}>
                <Image source={{uri: ZSSQ_IMG_URL + this.bookDetail.cover}}
                       style={styles.bookImage}/>
                <View style={{justifyContent: 'space-around', marginLeft: 12}}>
                    <Text style={styles.bookTitle}>{getChineseText(this.bookDetail.title)}</Text>
                    <View style={styles.bookAuthor}>
                        <MaterialIcons name="account-circle" size={16}
                                       style={{color: '#ddd', marginRight: 5}}/>
                        <Text>{getChineseText(this.bookDetail.author)}</Text>
                    </View>
                    <StarScore score={this.score ? this.score : 3.15}/>
                    <Text>{getChineseText(this.bookDetail.majorCate)} <Text
                        style={{color: '#474747'}}>{this.bookDetail.isSerial ? I18n.t('serial') : I18n.t('over')}</Text></Text>
                </View>
            </View>
        )
    };

    /**
     * 渲染按钮
     * @param color
     * @returns {*}
     * @private
     */
    _renderReadButton = (color) => {
        return (
            <View style={styles.margin}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <ReadButton
                        style={styles.readButton}
                        color={'#fff'}
                        backgroundColor={color}
                        borderColor={color}
                        title={I18n.t('startRead')}
                        onPress={() => {
                            this.props.navToReader(this.bookmark, this.bookDetail)
                        }}/>
                    {this.bookmark
                        ?
                        <ReadButton style={styles.readButton}
                                    color='#eee'
                                    borderColor={'#eee'}
                                    title={I18n.t('inBookcase')}/>
                        :
                        <ReadButton
                            style={styles.readButton}
                            title={I18n.t('saveBookmark')}
                            onPress={() => {
                                this.saveAndRereadBookmarks()
                            }}
                        />
                    }
                    <ReadButton
                        style={styles.readButton}
                        title={I18n.t('wjSearh')}
                        onPress={() => {
                            global.globalBookNameParam = this.bookDetail.title;
                            this.props.navToSearch()
                        }}
                    />
                </View>

                <Text style={{marginTop: 30, marginBottom: 0}}>
                    {getChineseText(this.bookDetail.longIntro)}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 10
                }}>
                    {this.tags ? this.tags.map((tag, index) => {
                        return (
                            <Text style={[styles.tag, {color: color, borderColor: color}]}
                                  key={index}>{getChineseText(tag)}</Text>)
                    }) : null}
                </View>

            </View>
        )
    };

    _renderChapterCatalog = () => {
        return (
            <View style={[styles.margin, styles.chapterCatalog]}>
                <TouchableHighlight>
                    <Text>{I18n.t('newChapter')} {getChineseText(this.bookDetail.lastChapter)}</Text>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={styles.catalog}>
                        <MaterialIcons name="format-list-bulleted" size={18}/>
                        <Text>{I18n.t('catalog')}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const pr = PixelRatio.get();
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    readButton: {
        borderRadius: 2,
        borderWidth: StyleSheet.hairlineWidth,
    },
    margin: {
        paddingLeft: 20,
        paddingRight: 20
    },
    bookImage: {
        width: BOOKMARK_WIDTH,
        height: BOOKMARK_HEIGHT
    },
    bookInfo: {
        flexDirection: 'row',
        marginLeft: 18 * pr,
        marginTop: 18 * pr,
        marginBottom: 18 * pr
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    bookAuthor: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bookStar: {
        color: '#f0ad4e',
        marginRight: 5
    },
    chapterCatalog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        paddingTop: 16,
        paddingBottom: 16
    },
    catalog: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tag: {
        marginTop: 10,
        // marginBottom: 10,
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 1,
        paddingBottom: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgreen',
        borderRadius: 1,
        color: 'lightgreen',
        fontSize: 12,
        marginRight: 5
    },
    serializeWordCount: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
    }
});

function mapStateToProps(state) {
    const {bookDetail, isFetchingDetail} = state.detail;
    const {items: bookmarks} = state.bookmarks;
    return {bookDetail, bookmarks, isFetchingDetail}
}

export default connect(mapStateToProps)(MainDetail)