/**
 * @author Semper
 */
import React from "react";
import {
    ActivityIndicator,
    Alert,
    BackHandler,
    Button,
    InteractionManager,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import {connect} from "react-redux";
import {clearArticle, receiveArticle, requestArticle} from "../actions/read";
import {
    getBookContentBQG,
    getBookContentBQG2,
    getBookContentBQT,
    getBookContentDZZ,
    getBookContentPBDZS,
    getBookContentWLZW,
    getBookContentZSSQ,
    getCatalogBQT,
    getCatalogDZZ,
    getCatalogPBDZS,
    getCatalogWLZW
} from "../utils/ParseHtmlUtil";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import ToastUtil from "../utils/ToastUtil";
import {NavigationActions, StackActions} from "react-navigation";
import ReaderMenuHeader from "../commons/ReaderMenuHeader";
import ReaderMenuFooter from "../commons/ReaderMenuFooter";
import ReaderMenuSet from "../commons/ReaderMenuSet";
import ReaderMenuProgress from "../commons/ReaderMenuProgress";
import CustomFlatList from "../commons/CustomFlatList";
import {Article} from "../model/Article";
import {
    BOOKMARKS_URL,
    BQG2_NAME,
    BQG_BASE_URL,
    BQG_NAME,
    BQT_BASE_URL,
    BQT_NAME,
    DZZ_NAME,
    M_DAIZHUZAI_URL,
    PBDZS_NAME,
    WLZW_NAME,
    ZSSQ_CATALOG_BASE,
    ZSSQ_CHARTER_BASE,
    ZSSQ_NAME
} from "../constants/api";
import {Bookmark} from "../model/Bookmark";
import {requestBookmarks} from "../actions/bookmarks";
import {saveBookmark} from "../utils/BookmarkUtil";
import {clearCatalog, requestCatalog} from "../actions/catalog";
import {RECEIVE_TYPE, REQUEST_ARTICLE_FAILED, REQUEST_CATALOG_FAILED} from "../constants/constants";
import {saveAppConfig} from "../utils/ConfigUtil";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";

class ReadPage extends React.Component {
    static navigationOptions = {
        header: null
    };
    currentArticle: Article;
    prevArticle: Article;
    bookmark: Bookmark;

    constructor(props) {
        super(props);
        this.isFetching = false;
        this.lastChapterNum = 0;
        this.articles = [];
        this.isOpenMenu = false;
        this.isFirstOpenReader = true;
        this.isFirstGetCatalog = false;
        this.articleTag = '';
        this.bookName = '';
        this.articleData = [];
        this.currentIndex = 0;
        this.bookImageUrl = '';
        this.currentNum = 1;
        this.size = NovelAppConfig.readConfig.fontSize;
        this.isNightMode = false
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('ReadBackPress', this.onBackAndroid);
        }
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        try {
            let params = this.props.navigation.state.params;
            this.siteName = params.siteName;
            switch (this.siteName) {
                case ZSSQ_NAME:
                    this.bookId = params.bookId;
                    this.articleTag = this.bookId;
                    this.bookName = params.bookName;
                    this.bookImageUrl = params.image;
                    this.fetchCatalogData();
                    break;
                case DZZ_NAME:
                    this.articleTag = M_DAIZHUZAI_URL + params.articleUrlTag;
                    this.bookName = params.bookName;
                    this.bookImageUrl = params.image;
                    this.fetchCatalogData();
                    break;
                case PBDZS_NAME:
                    this.articleTag = params.articleUrlTag;
                    this.bookName = params.bookName;
                    this.bookImageUrl = params.image;
                    this.fetchCatalogData();
                    break;
                case BQG_NAME:
                    this.articleTag = params.articleUrlTag;
                    this.bookName = params.bookName;
                    this.bookImageUrl = params.image;
                    this.fetchCatalogData();
                    break;
                default:
                    this.articleTag = params.articleUrlTag;
                    this.bookName = params.bookName;
                    this.bookImageUrl = params.image;
                    this.fetchCatalogData();
                    break;
            }

            this.bookmark = params.bookmark;
            if (this.bookmark) {
                this.siteName = this.bookmark.siteName;
                this.bookName = this.bookmark.bookName;
                this.bookImageUrl = this.bookmark.image;
                this.lastChapterNum = this.bookmark.currentChapterNum - 1;
                this.currentIndex = this.bookmark.pageNum - 1;
                switch (this.siteName) {
                    case ZSSQ_NAME:
                        this.bookId = this.bookmark.id;
                        this.articleTag = this.bookId;
                        this.fetchCatalogData();
                        break;
                    default:
                        this.articleTag = this.bookmark.tag;
                        this.fetchCatalogData();
                        break;
                }

            }
        } catch (e) {
            console.warn('ReadPage componentDidMount', e.message)
        }


    }

    onBackAndroid = () => {
        this._showIsSaveBookcase();
        return true
    };

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('ReadBackPress', this.onBackAndroid);
        }
        StatusBar.setHidden(false);
        this.props.dispatch(clearCatalog());
        this.props.dispatch(clearArticle())
    }

    shouldComponentUpdate(nextProps) {
        // console.log('nextProps.catalogData',nextProps.catalogData)
        if (nextProps.catalogData === REQUEST_CATALOG_FAILED) {
            if (this.props.isCatalogFetching) {
                ToastUtil.showShort(I18n.t('netError'));
            }
            return true
        }
        if (nextProps.article === REQUEST_ARTICLE_FAILED && this.props.isFetching) {
            ToastUtil.showShort(I18n.t('netError2'));
        }
        //首次获取目录返回false不渲染
        if (!this.isFirstGetCatalog && nextProps.catalogData) {
            this.isFirstGetCatalog = true;
            switch (this.siteName) {
                case ZSSQ_NAME:
                    this.catalogData = nextProps.catalogData;
                    break;
                case DZZ_NAME:
                    this.catalogData = getCatalogDZZ(nextProps.catalogData);
                    break;
                case PBDZS_NAME:
                    this.catalogData = getCatalogPBDZS(nextProps.catalogData);
                    break;
                case BQG_NAME:
                    this.catalogData = getCatalogPBDZS(nextProps.catalogData);
                    break;
                case BQG2_NAME:
                    this.catalogData = getCatalogPBDZS(nextProps.catalogData);
                    break;
                case WLZW_NAME:
                    this.catalogData = getCatalogWLZW(nextProps.catalogData);
                    break;
                case BQT_NAME:
                    this.catalogData = getCatalogBQT(nextProps.catalogData);
                    break;
            }
            this.fetchArticles();
            return false
        } else {
            return this.props.article !== nextProps.article || this.props.isFetching !== nextProps.isFetching ||
                this.props.isCatalogFetching !== nextProps.isCatalogFetching
        }
    }

    /**
     * 获取目录数据
     */
    fetchCatalogData = () => {
        try {
            switch (this.siteName) {
                case ZSSQ_NAME:
                    this.props.dispatch(requestCatalog(ZSSQ_CATALOG_BASE + this.bookId, RECEIVE_TYPE.JSON));
                    break;
                case DZZ_NAME:
                    this.props.dispatch(requestCatalog(this.articleTag.replace('m.', 'www.'), RECEIVE_TYPE.TEXT));
                    break;
                case PBDZS_NAME:
                    this.props.dispatch(requestCatalog(this.articleTag.replace('m.', 'www.'), RECEIVE_TYPE.TEXT));
                    break;
                case WLZW_NAME:
                    this.props.dispatch(requestCatalog(this.articleTag, RECEIVE_TYPE.GBKTEXT));
                    break;
                default:
                    this.props.dispatch(requestCatalog(this.articleTag, RECEIVE_TYPE.TEXT))
            }
        } catch (e) {
            console.warn('ReadPage fetchCatalogData error', e.message)
        }

    };

    /**
     * 通过点击目录获取文章数据
     * @param num
     */
    fetchArticleByCatalog = (num) => {
        this.articles = [];
        this.currentArticle = null;
        this.prevArticle = null;
        this.currentIndex = 0;
        this.lastChapterNum = num;
        InteractionManager.runAfterInteractions(() => {
            this.fetchArticles();
        });

    };

    /**
     * 获取文章数据
     */
    fetchArticles = () => {
        //看到第十章后自动保存书签
        if (this.currentArticle !== null &&
            this.currentArticle !== undefined &&
            this.lastChapterNum > 10 &&
            this.lastChapterNum % 10 === 0) {
            this.saveAndRereadBookmarks().then();
        }

        if (this.props.catalogData && this.props.catalogData !== REQUEST_CATALOG_FAILED) {
            let chapterCount = 0;
            switch (this.siteName) {
                case ZSSQ_NAME:
                    try {
                        chapterCount = this.props.catalogData.mixToc.chapters.length
                    } catch (e) {
                        chapterCount = 0;
                        console.warn('ReadPage fetchArticles func error:', e.message)
                    }
                    break;
                default:
                    if (this.catalogData.length > 0) {
                        chapterCount = this.catalogData.length
                    } else {
                        chapterCount = 0
                    }
            }

            if (this.lastChapterNum === chapterCount) {
                return
            }
        }

        let url = '';
        this.prevArticle = this.currentArticle;
        this.lastChapterNum++;
        if (this.lastChapterNum < 1) {
            this.lastChapterNum = 1
        }
        switch (this.siteName) {
            case ZSSQ_NAME:

                try {
                    url = ZSSQ_CHARTER_BASE + this.catalogData.mixToc.chapters[this.lastChapterNum - 1].link
                        .replace('/', '%2F').replace('?', '%3F');
                    this.lastRequestUrl = url;
                    this.chapterName = this.catalogData.mixToc.chapters[this.lastChapterNum - 1].title;
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles ZSSQ_NAME', e.message)
                }
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.JSON));
                break;
            case DZZ_NAME:
                try {
                    url = M_DAIZHUZAI_URL + this.catalogData[this.lastChapterNum - 1].url;
                    this.lastRequestUrl = url;
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles DZZ_NAME', e.message)
                }

                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                break;
            case PBDZS_NAME:

                try {
                    url = (this.articleTag + this.catalogData[this.lastChapterNum - 1].url).replace('www.', 'm.');
                    this.lastRequestUrl = url;
                    this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles PBDZS_NAME', e.message)
                }
                break;
            case BQG_NAME:

                try {
                    url = BQG_BASE_URL + this.catalogData[this.lastChapterNum - 1].url;
                    this.lastRequestUrl = url;
                    this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles BQG_NAME', e.message)
                }
                break;
            case BQG2_NAME:

                try {
                    url = (this.articleTag + this.catalogData[this.lastChapterNum - 1].url);
                    this.lastRequestUrl = url;
                    this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles PBDZS_NAME', e.message)
                }
                break;
            case WLZW_NAME:

                try {
                    url = (this.articleTag + this.catalogData[this.lastChapterNum - 1].url);
                    this.lastRequestUrl = url;
                    this.props.dispatch(requestArticle(url, RECEIVE_TYPE.GBKTEXT));
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles WLZW_NAME', e.message)
                }
                break;
            case BQT_NAME:

                try {
                    url = (BQT_BASE_URL + this.catalogData[this.lastChapterNum - 1].url);
                    this.lastRequestUrl = url;
                    this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                } catch (e) {
                    this.props.dispatch(receiveArticle(REQUEST_ARTICLE_FAILED, url));
                    console.warn('ReadPage fetchArticles BQT_NAME', e.message)
                }
                break;
        }
        console.log('fetchArticles url', this.lastRequestUrl);
    };

    /**
     * 重新获取文章
     * @param url 文章url
     * @private
     */
    _reFetchArticle = (url = this.lastRequestUrl) => {
        switch (this.siteName) {
            case ZSSQ_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.JSON));
                break;
            case DZZ_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                break;
            case PBDZS_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                break;
            case BQG_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                break;
            case WLZW_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.GBKTEXT));
                break;
            case BQT_NAME:
                this.props.dispatch(requestArticle(url, RECEIVE_TYPE.TEXT));
                break
        }
    };

    /**
     * 从书签打开阅读时，滚动到上一次阅读位置
     */
    _scrollIndexByBookmark = () => {
        if (this.isFirstOpenReader && this.articles.length > 0) {
            this.isFirstOpenReader = false;
            if (this.currentArticle.totalPage < this.currentIndex) {
                this.currentIndex = 0
            }
            this._scrollToIndex();
        }
    };

    _scrollToIndex = () => {
        try {
            this._flatRef.scrollToIndex({
                animated: false,
                index: this.currentIndex
            });
        } catch (e) {
            console.warn('ReadPage scrollToIndex err:', e.message)
        }
    };

    /**
     * 打开设置菜单
     */
    _openMenuSet = () => {
        this.readerSet.open()
    };

    /**
     * 关闭设置菜单
     */
    _closeMenuSet = () => {
        this.readerSet.close()
    };

    /**
     * 打开进度设置
     */
    _openMenuProgress = () => {
        this.readerProgress.open()
    };

    /**
     * 关闭进度设置
     */
    _closeMenuProgress = () => {
        this.readerProgress.close()
    };

    /**
     * 导航到目录
     * @private
     */
    _openBookCatalog = () => {
        //TODO currentChapterNum为空异常
        this.props.navigation.navigate('Catalog', {
            siteName: this.siteName,
            currentChapterNum: this.currentArticle ? this.currentArticle.currentChapterNum + 1 : this.lastChapterNum + 1,
            fetchArticleByCatalog: this.fetchArticleByCatalog
        })
    };

    /**
     * 改变阅读背景颜色
     * @param skinColor 皮肤颜色
     * @private
     */
    _changeSkin = (skinColor = '#fff') => {
        this.readerContainer.setNativeProps({
            style: {
                backgroundColor: skinColor
            }
        });
        this._flatRef.setFontColor('#000')
    };

    /**
     * 阅读模式切换（白天模式，夜间模式）
     */
    toggleLightAndDark = () => {
        this._flatRef.setFontColor('#999999')
    };

    /**
     * 改变字体大小
     * @param fontSize
     * @private
     */
    _changeFontSize = (fontSize = this.size) => {
        //如果书签存在，保存书签，可选
        if (this.bookmark) {
            this.saveAndRereadBookmarks().then();
        }

        this.size = fontSize;
        this._flatRef.setFontSize(fontSize);
        this.articles = [];
        this.currentIndex = 0;
        this.lastChapterNum = this.currentArticle ?
            this.currentArticle.currentChapterNum - 1 : this.lastChapterNum - 1;
        this.currentArticle = null;
        this.prevArticle = null;
        this.fetchArticles();
        NovelAppConfig.readConfig.fontSize = fontSize;
        saveAppConfig(NovelAppConfig)

    };

    //返回
    _navBack = () => {
        this.saveAndRereadBookmarks().then();
        this.props.navigation.goBack(null)
    };

    /**
     * 重制导航到搜索页面（换源）
     * @private
     */
    _navToSearch = () => {
        global.globalBookNameParam = this.bookName;
        this.props.navigation.dispatch(StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'App'}),
                NavigationActions.navigate({routeName: 'Search'})
            ]
        }))

    };

    _resetNav = () => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'App'})
            ]
        }))
    };

    /**
     * 导航到书架
     */
    _navigateToBookcase = () => {
        if (!this.bookmark && this.currentArticle) {
            Alert.alert(
                I18n.t('reminder'),
                I18n.t('isSaveBook'),
                [
                    {
                        text: I18n.t('cancel'), style: 'cancel', onPress: () => {
                            this._resetNav()
                        }
                    },
                    {
                        text: I18n.t('saveBookmark'), onPress: () => {
                            this.saveAndRereadBookmarks().then();
                            this._resetNav()
                        }
                    },
                ],
            )
        } else {
            this.saveAndRereadBookmarks().then();
            this._resetNav()
        }

    };

    /**
     * 导航到网页浏览
     */
    _navToWebReadPage = () => {
        try {
            if (this.currentArticle) {
                if (this.siteName === ZSSQ_NAME) {
                    this.props.navigation.navigate('WebRead', {url: 'http://www.biqiuge.com/', siteName: '笔趣阁'})
                } else {
                    this.props.navigation.navigate('WebRead', {
                        url: this.currentArticle.bookUrl,
                        siteName: this.siteName
                    })
                }
            }
        } catch (e) {
            console.warn('ReadPage _navToWebReadPage', e.message)
        }

    };

    saveAndRereadBookmarks = async () => {
        //TODO saving
        await this._saveBookmark();
        //TODO saved
        await this._reReadBookmark();
    };

    /**
     * 保存书签
     */
    _saveBookmark = () => {
        try {
            if (this.lastChapterNum < 1) {
                return
            }
            if (this.currentArticle !== null && this.currentArticle !== undefined) {
                let bookmark = new Bookmark(
                    this.articleTag,
                    this.currentArticle.bookName,
                    this.currentArticle.bookUrl,
                    this.currentArticle.chapterName,
                    this.currentArticle.currentChapterNum,
                    this.currentArticle.pageNum,
                    this.currentArticle.totalPage,
                    this.bookImageUrl,
                    this.siteName,
                    this.bookId,
                    new Date().getTime());
                // console.log('saveBookmark', bookmark.tag);
                saveBookmark(bookmark);
            }
        } catch (e) {
            console.warn('ReadPage _saveBookmark', e.message)
        }
    };

    _reReadBookmark = () => {
        this.props.dispatch(requestBookmarks(BOOKMARKS_URL))
    };

    setCurrentArticle = (article) => {
        this.currentArticle = article;
        this.readerProgress._setCurrentArticle(this.currentArticle)
    };

    /**
     * 初始化背景
     * @returns {*}
     */
    initializeBg = () => {
        if (NovelAppConfig.readConfig.isNightMode) {
            return NovelAppConfig.readConfig.darkBgColor
        } else {
            return NovelAppConfig.readConfig.bgColor
        }
    };

    /**
     * 设置夜间模式字体颜色
     */
    setNightModeFontColor = () => {
        this._flatRef.setFontColor(NovelAppConfig.readConfig.darkFontColor)
    };

    /**
     * 获取目录长度
     * @returns {number}
     * @private
     */
    _getBookCatalogLength = () => {
        if (this.catalogData && this.catalogData !== REQUEST_CATALOG_FAILED) {
            switch (this.siteName) {
                case ZSSQ_NAME:
                    try {
                        return this.catalogData.mixToc.chapters.length;
                    } catch (e) {
                        console.warn('ReadPage _getBookCatalogLength func error:', e.message);
                        return 0
                    }
                case DZZ_NAME:
                    return this.catalogData.length;
                case PBDZS_NAME:
                    return this.catalogData.length;
                case BQG_NAME:
                    return this.catalogData.length;
                case WLZW_NAME:
                    return this.catalogData.length;
                default:
                    return this.catalogData.length;
            }
        } else {
            return 0
        }
    };

    render() {
        //目录请求失败渲染本部分
        if (this.props.catalogData === REQUEST_CATALOG_FAILED) {
            return this._renderError()
        }

        //初次请求文章失败，渲染本部分
        if (this.props.article === REQUEST_ARTICLE_FAILED && this.articles.length === 0) {
            return this._renderError()
        }

        // console.log('render',this.props.article);
        this.isFetching = this.props.isFetching;
        if (this.props.article && !this.isFetching && this.props.article !== REQUEST_ARTICLE_FAILED) {
            let articles = [];
            switch (this.siteName) {
                case ZSSQ_NAME:
                    try {
                        articles = getBookContentZSSQ(this.props.article.chapter.body, this.props.articleUrl,
                            this.chapterName, this.bookName, this.lastChapterNum, this.size);
                        this.articles = this.articles.concat(articles);
                    } catch (e) {
                        console.log('ReadPage render ZSSQ_NAME', e.message)
                    }

                    break;
                case DZZ_NAME:
                    articles = getBookContentDZZ(this.props.article, this.props.articleUrl,
                        this.bookName, this.lastChapterNum, this.size);
                    this.articles = this.articles.concat(articles);
                    break;
                case PBDZS_NAME:
                    articles = getBookContentPBDZS(this.props.article, this.props.articleUrl,
                        this.bookName, this.lastChapterNum, this.size);
                    this.articles = this.articles.concat(articles);
                    break;
                case BQG_NAME:
                    articles = getBookContentBQG(this.props.article, this.props.articleUrl,
                        this.bookName, this.lastChapterNum, this.size);
                    this.articles = this.articles.concat(articles);
                    break;
                case WLZW_NAME:
                    articles = getBookContentWLZW(this.props.article, this.props.articleUrl,
                        this.bookName, this.lastChapterNum, this.size);
                    this.articles = this.articles.concat(articles);
                    break;
                case BQT_NAME:
                    articles = getBookContentBQT(this.props.article, this.props.articleUrl,
                        this.bookName, this.lastChapterNum, this.size);
                    this.articles = this.articles.concat(articles);
                    break;
                case BQG2_NAME:
                    articles = getBookContentBQG2(this.props.article, this.props.articleUrl,
                        this.bookName, this.lastChapterNum, this.size);
                    this.articles = this.articles.concat(articles);
                    break;
            }

            if (this.articleData.length < 2) {
                this.articleData.shift()
            }
            this.articleData.push({url: this.props.articleUrl, data: this.props.article})
        }

        return (

            <View
                style={[styles.container, {backgroundColor: this.initializeBg()}]}
                ref={(ref) => {
                    this.readerContainer = ref
                }}>
                <View
                    style={{height: HEIGHT, width: WIDTH, flex: 1}}
                    onStartShouldSetResponder={() => {
                        return true
                    }}
                    onResponderRelease={this._onResponderRelease}>

                    <CustomFlatList
                        ref={(ref) => {
                            this._flatRef = ref
                        }}
                        articles={this.articles}
                        isFetching={this.isFetching}
                        setCurrentArticle={this.setCurrentArticle}
                        prevArticle={this.prevArticle}
                        scrollIndexByBookmark={this._scrollIndexByBookmark}
                        fetchArticles={this.fetchArticles}
                        reFetchArticle={this._reFetchArticle}
                        catalogDataLength={this._getBookCatalogLength()}
                    />
                </View>
                <ReaderMenuHeader
                    ref={(ref) => {
                        this.menuHeader = ref
                    }}
                    style={[styles.menu]}
                    showIsSaveBookcase={this._showIsSaveBookcase}
                    navToSearch={this._navToSearch}
                />
                <ReaderMenuSet
                    ref={(ref) => {
                        this.readerSet = ref
                    }}
                    styles={styles}
                    changeSkin={this._changeSkin}
                    changeFontSize={this._changeFontSize}
                    navToWebReadPage={this._navToWebReadPage}
                />
                <ReaderMenuProgress
                    ref={(ref) => {
                        this.readerProgress = ref
                    }}
                    styles={styles}
                    catalogDataLength={this._getBookCatalogLength()}
                    fetchArticleByCatalog={this.fetchArticleByCatalog}
                />
                <ReaderMenuFooter
                    changeSkin={this._changeSkin}
                    ref={(ref) => {
                        this.menuFooter = ref
                    }} styles={styles}
                    openMenuSet={this._openMenuSet}
                    closeMenuSet={this._closeMenuSet}
                    openMenuProgress={this._openMenuProgress}
                    closeMenuProgress={this._closeMenuProgress}
                    navigateToBookcase={this._navigateToBookcase}
                    openBookCatalog={this._openBookCatalog}
                    toggleLightAndDark={this.toggleLightAndDark}
                    setNightModeFontColor={this.setNightModeFontColor}
                />
            </View>
        )
    }

    /**
     * 请求目录失败或初次请求文章失败，渲染报错信息
     * @returns {*}
     * @private
     */
    _renderError = () => {
        return (
            <View style={styles.getCatalogFailedContainer}>
                {
                    this.props.isCatalogFetching
                        ?
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.failedText}>{getChineseText('获取资源中')}</Text>
                            <ActivityIndicator
                                style={{marginTop: 3}}
                                animating={true}
                                color="#aa3300"
                                size="small"
                            />
                        </View>
                        :
                        <Text style={styles.failedText}>{getChineseText('请求资源失败')}</Text>
                }

                <View style={styles.failedView}>
                    <Button
                        title={I18n.t('reFetch')}
                        color='deeppink'
                        onPress={() => {
                            this.fetchCatalogData()
                        }}
                    />
                    <Button
                        title={I18n.t('changeBookOrigin')}
                        color='deeppink'
                        onPress={() => {
                            this._navToSearch()
                        }}
                    />
                    <Button
                        title={I18n.t('exit')}
                        color='deeppink'
                        onPress={() => {
                            this.props.navigation.goBack(null)
                        }}
                    />
                </View>
            </View>
        )
    };

    /**
     * 提示是否保存书签
     */
    _showIsSaveBookcase = () => {
        if (!this.bookmark && this.currentArticle) {
            Alert.alert(
                I18n.t('reminder'),
                I18n.t('isSaveBook'),
                [
                    {
                        text: I18n.t('cancel'), style: 'cancel', onPress: () => {
                            this.props.navigation.goBack(null)
                        }
                    },
                    {
                        text: I18n.t('saveBookmark'), onPress: () => {
                            this._navBack()
                        }
                    },
                ],
            )
        } else {
            this._navBack()
        }
    };

    /**
     * 翻到下一页
     */
    turnToNextPage = () => {
        if (this.currentIndex < this.articles.length - 1) {
            this.currentIndex++;
            this._scrollToIndex();
        } else {
            // ToastUtil.showShort('正在加载下一页数据')
        }
    };

    /**
     * 翻到上一页
     */
    turnToPrePage = () => {
        if (this.currentIndex < this.articles.length && this.currentIndex > 0) {
            this.currentIndex--;
            this._scrollToIndex();
        } else {
            ToastUtil.showShort(I18n.t('onTop'))
        }
    };

    _onResponderRelease = (e) => {
        if (this.menuFooter.getIsOpenReaderSet()) {
            this.menuFooter.closeMenuSet();
            this.menuFooter.setIsOpenReaderSet(false);
            return
        } else if (this.menuFooter.getIsOpenMenuProgress()) {
            this.menuFooter.closeMenuProgress();
            this.menuFooter.setIsOpenMenuProgress(false);
            return
        } else if (this.isOpenMenu) {
            this.menuHeader.closeMenuHeader();
            this.menuFooter.closeMenuFooter();
            this.isOpenMenu = false;
            return
        }
        let pageY = e.nativeEvent.pageY;
        let pageX = e.nativeEvent.pageX;
        if (pageY < HEIGHT / 5 * 2) {
            this.turnToPrePage()
        } else if (pageY > HEIGHT / 5 * 3) {
            this.turnToNextPage()
        } else {
            if (pageX < WIDTH / 3) {
                this.turnToPrePage()
            } else if (pageX > WIDTH / 3 * 2) {
                this.turnToNextPage()
            } else if (!this.isOpenMenu) {
                this.menuHeader.openMenuHeader();
                this.menuFooter.openMenuFooter();
                this.isOpenMenu = true
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        width: WIDTH,
        height: 55,
        opacity: 0.9,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    menuItem: {
        height: 55,
        width: WIDTH / 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    readerSet: {
        width: WIDTH,
        opacity: 0.9,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    readerSetItem: {
        width: WIDTH,
        opacity: 0.9,
        height: 55,
        borderBottomColor: 'rgba(255,255,255,.1)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    readerModeButton: {
        width: WIDTH / 10 * 4,
        height: WIDTH / 12,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },
    readerSkinButton: {
        width: WIDTH / 6,
        height: WIDTH / 12,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },
    menuIcon: {
        color: '#fff',
    },
    slider: {
        flex: 1,
    },
    catalogContainer: {
        position: 'absolute',
        height: HEIGHT,
        width: WIDTH,
        left: this.animatedValue,
        zIndex: 1000,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    getCatalogFailedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1
    },
    failedText: {
        fontSize: 20,
        marginRight: 5
    },
    failedView: {
        flexDirection: 'row',
        marginTop: 20,
        width: WIDTH / 2,
        justifyContent: 'space-around'
    }
});

function mapStateToProps(state) {
    const {article, articleUrl, isFetching} = state.read;
    const {catalogData, isCatalogFetching} = state.catalog;
    // console.log('mapStateToProps');
    return {article, articleUrl, isFetching, catalogData, isCatalogFetching}
}

export default connect(mapStateToProps)(ReadPage)