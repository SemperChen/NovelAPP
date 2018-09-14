/**
 * @author Semper
 */
import React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {BOOKMARK_HEIGHT, BOOKMARK_WIDTH} from "../utils/DimensionsUtil";
import {BOOKMARKS_URL, ZSSQ_IMG_URL, ZSSQ_NAME} from "../constants/api";
import ReadButton from "./ReadButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {Bookmark} from "../model/Bookmark";
import {saveBookmark} from "../utils/BookmarkUtil";
import {requestBookmarks} from "../actions/bookmarks";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";

class MainSearchContent extends React.Component {

    componentDidMount() {

    }

    saveAndRereadBookmarks = async () => {
        //TODO saving
        await this._saveBookmark();
        //TODO saved
        await this._reReadBookmark();
    };

    _saveBookmark = () => {
        if (this.bookInfo !== null && this.bookInfo !== undefined) {
            let bookmark = new Bookmark(
                this.bookInfo._id,
                this.bookInfo.title,
                null,
                null,
                1,
                1,
                0,
                ZSSQ_IMG_URL + this.bookInfo.cover,
                ZSSQ_NAME,
                this.bookInfo._id,
                new Date().getTime());
            // console.log('saveBookmark', bookmark.tag);
            saveBookmark(bookmark);
        }
    };

    _reReadBookmark = () => {
        this.props.dispatch(requestBookmarks(BOOKMARKS_URL))
    };

    render() {
        if (this.props.searchResult) {
            this.bookInfo = this.props.searchResult.books[0];
            if (this.props.bookmarks) {
                const _findIndex = require('lodash/findIndex');
                let index = _findIndex(this.props.bookmarks, (item) => {
                    return item.id === this.bookInfo._id;
                });
                this.bookmark = this.props.bookmarks[index]
            }
        }
        return (
            <View>
                {this.bookInfo
                    ?
                    <View style={{backgroundColor: '#fff'}}>
                        {this._renderInfo()}
                        {this._renderReadButton()}
                        {this._renderChapterCatalog()}
                    </View>
                    :
                    null
                }
            </View>
        )
    }

    _renderReadButton = () => {
        return (
            <View style={styles.margin}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <ReadButton
                        style={styles.readButton}
                        color={'#fff'}
                        backgroundColor={this.props.primaryColor}
                        borderColor={this.props.primaryColor}
                        title={I18n.t('startRead')}
                        onPress={() => {
                            if (this.bookmark) {
                                this.props.navToReaderWithBookmark(this.bookmark)
                            } else {
                                this.props.navToReader(null, this.bookInfo.title, ZSSQ_IMG_URL + this.bookInfo.cover, ZSSQ_NAME, this.bookInfo._id)
                            }
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
                            title="加入书架"
                            onPress={() => {
                                this.saveAndRereadBookmarks()
                            }}
                        />
                    }
                    <ReadButton style={styles.readButton} title={I18n.t('bookDetail')}
                                onPress={() => {
                                    this.props.navBookDetail(this.bookInfo._id, ZSSQ_NAME)
                                }}/>
                </View>

                <Text numberOfLines={3} style={{marginTop: 30, marginBottom: 30}}>
                    {getChineseText(this.bookInfo.shortIntro)}
                </Text>
            </View>
        )
    };

    _renderInfo = () => {
        return (
            <TouchableHighlight underlayColor="#fff"
                                onPress={() => {
                                    this.props.navBookDetail(this.bookInfo._id, ZSSQ_NAME)
                                }}>
                <View style={styles.bookInfo}>
                    <Image source={{uri: ZSSQ_IMG_URL + this.bookInfo.cover}}
                           style={styles.bookImage}/>
                    <View style={{justifyContent: 'space-around', marginLeft: 12}}>
                        <Text style={styles.bookTitle}>{getChineseText(this.bookInfo.title)}</Text>
                        <View style={styles.bookAuthor}>
                            <MaterialIcons name="account-circle" size={16}
                                           style={{color: '#ddd', marginRight: 5}}/>
                            <Text>{getChineseText(this.bookInfo.author)}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialIcons name="star" size={24} style={styles.bookStar}/>
                            <MaterialIcons name="star" size={24} style={styles.bookStar}/>
                            <MaterialIcons name="star" size={24} style={styles.bookStar}/>
                            <MaterialIcons name="star" size={24} style={styles.bookStar}/>
                            <MaterialIcons name="star-border" size={24}
                                           style={styles.bookStar}/>
                        </View>
                        <Text>{getChineseText(this.bookInfo.cat)}</Text>
                        {/*<Text>
                            来源:
                            <Text style={{color: 'cornflowerblue'}}>笔趣阁</Text>
                        </Text>*/}
                    </View>
                </View>
            </TouchableHighlight>

        )
    };

    _renderChapterCatalog = () => {
        return (
            <View style={[styles.margin, styles.chapterCatalog]}>
                <TouchableHighlight>
                    <Text>{I18n.t('newChapter')} {getChineseText(this.bookInfo.lastChapter)}</Text>
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
        marginLeft: 60,
        marginTop: 60,
        marginBottom: 60
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
});

function mapStateToProps(state) {
    const {searchResult, baseSearchUrl} = state.search;
    const {items: bookmarks} = state.bookmarks;
    return {searchResult, baseSearchUrl, bookmarks}
}

export default connect(mapStateToProps)(MainSearchContent)