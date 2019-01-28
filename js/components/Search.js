/**
 * @author Semper
 */
import React from "react";
import {
    Button,
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from "react-native";
import {BOOKMARK_HEIGHT, BOOKMARK_WIDTH, WIDTH} from "../utils/DimensionsUtil";
import {connect} from "react-redux";
import {requestSearch} from "../actions/search";
import ToastUtil from "../utils/ToastUtil";
import {getBookInfoDZZ, getSearchBookInfoByParseHtml} from "../utils/ParseHtmlUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {BookInfo} from "../model/BookInfo";
import {DAIZHUZAI_SEARCH, ZSSQ_SEARCH} from "../constants/api";
import {requestOtherSearch} from "../actions/otherSearch";
import MainSearchContent from "../commons/MainSearchContent";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";

class Search extends React.Component {

    static navigationOptions = ({screenProps}) => {
        return {
            headerTitle: I18n.t('search'),
            headerStyle: {elevation: 0, backgroundColor: screenProps.appTheme.primaryColor},
            headerTintColor: '#fff'
        }
    };

    searchBookName = '';
    bookInfo: BookInfo;

    constructor(props) {
        super(props);
        this.otherBookInfos = [];
        this.state = {res: '', searchBookName: ''}
    }

    componentDidMount() {
        if (globalBookNameParam) {
            this.searchBookName = globalBookNameParam;
            this._searchBook();
            globalBookNameParam = undefined;
        }
    }

    setSearchBookName(searchBookName) {
        this.searchBookName = searchBookName
    }

    shouldComponentUpdate(nextProps) {
        return this.props.searchResult !== nextProps.searchResult ||
            this.props.baseSearchUrl !== nextProps.baseSearchUrl ||
            this.props.otherSearchResult !== nextProps.otherSearchResult ||
            this.props.baseOtherSearchUrl !== nextProps.baseOtherSearchUrl ||
            this.props.siteName !== nextProps.siteName

    }

    componentWillUpdate() {
    }

    componentWillUnmount() {
        // this.props.dispatch(quitSearchPage(this.mainSearchRes, this.mainUrl))
    }

    _searchBook = () => {
        if (this.searchBookName === undefined || this.searchBookName === '') {
            ToastUtil.showShort(I18n.t('pleaseInputText'));
        } else {
            this.props.dispatch(requestSearch(ZSSQ_SEARCH + this.searchBookName));
            this.otherBookInfos = [];
            this.props.dispatch(requestOtherSearch(this.searchBookName))
        }
    };

    _navBookDetail = (bookId, siteName) => {
        this.props.navigation.navigate('BookDetail', {
            bookId: bookId,
            siteName: siteName
        })
    };

    _navToReader = (articleUrlTag, bookName, image, siteName, bookId) => {
        this.props.navigation.navigate('Read', {
            articleUrlTag: articleUrlTag,
            bookName: bookName,
            image: image,
            siteName: siteName,
            bookId: bookId
        })
    };

    navToReaderWithBookmark = (bookmark) => {
        this.props.navigation.navigate('Read', {bookmark: bookmark})
    };

    render() {

        const appTheme = this.props.screenProps.appTheme;
        // console.log(this.props.searchResult);
        if (this.props.otherSearchResult) {
            // console.log(this.props.otherSearchResult);
            switch (this.props.baseOtherSearchUrl) {
                case DAIZHUZAI_SEARCH:
                    this.otherBookInfo = getBookInfoDZZ(this.props.otherSearchResult);
                    break;
                default:
                    this.otherBookInfo = getSearchBookInfoByParseHtml(this.props.otherSearchResult);
                    break;
            }
            if (this.otherBookInfo) {
                this.otherBookInfos.push({siteName: this.props.siteName, otherBookInfo: this.otherBookInfo})
            }
        }

        return (
            <ScrollView>
                {this._renderSearchInput(appTheme.primaryColor)}
                <MainSearchContent
                    primaryColor={appTheme.primaryColor}
                    navBookDetail={this._navBookDetail}
                    navToReader={this._navToReader}
                    navToReaderWithBookmark={this.navToReaderWithBookmark}
                />
                {this.otherBookInfos.length > 0 ? this._renderOtherSearch(appTheme) : null}
            </ScrollView>
        )
    }

    formatText = (text) => {
        while (text.indexOf('<em>') !== -1) {
            text = text.replace('<em>', '')
        }
        while (text.indexOf('</em>') !== -1) {
            text = text.replace('</em>', '')
        }
        return getChineseText(text)
    };

    _renderSearchInput = (color) => {
        return (
            <View style={styles.searchContainer}>
                <TextInput
                    // autoFocus={true}
                    style={{width: WIDTH * 0.8}}
                    placeholder={I18n.t('bookName')}
                    placeholderTextColor="#ddd"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    underlineColorAndroid={color}
                    returnKeyType='search'
                    onSubmitEditing={() => {
                        if (this.searchBookName && this.searchBookName !== '' && this.searchBookName !== undefined) {
                            this._searchBook()
                        }
                    }}
                    onChangeText={(searchBookName) => this.setSearchBookName(searchBookName)}
                />
                <Button
                    title={I18n.t('search')}
                    color={color}
                    onPress={this._searchBook}/>
            </View>
        )
    };

    _renderOtherSearch = (appTheme) => {
        return (
            <View style={styles.otherSearchItem}>
                <Text style={styles.itemHeaderText}>— {I18n.t('otherOrigin')} —</Text>
                {this.otherBookInfos.map((item, index) => {
                    return (
                        <TouchableHighlight key={index}
                                            underlayColor="#fff"
                                            onPress={() => {
                                                this._navToReader(item.otherBookInfo.articleUrlTag, item.otherBookInfo.title, item.otherBookInfo.cover, item.siteName);
                                            }}>
                            {item.otherBookInfo.title===""||item.otherBookInfo.title===null
                                ?
                                <View/>
                                :
                                <View>
                                    <View style={styles.itemContent}>
                                        <Image source={{uri: item.otherBookInfo.cover}}
                                               style={styles.bookImage}/>
                                        <View style={styles.itemText}>
                                            <Text style={styles.bookTitle}>{getChineseText(item.otherBookInfo.title)}</Text>
                                            <View style={styles.bookAuthor}>
                                                <MaterialIcons name="account-circle" size={16}
                                                               style={styles.itemIcon}/>
                                                <Text>{getChineseText(item.otherBookInfo.author)}</Text>
                                            </View>
                                            <View>
                                                <Text
                                                    numberOfLines={2}>{this.formatText(item.otherBookInfo.shortIntro)}</Text>
                                            </View>
                                            <Text>{getChineseText('来源')} <Text
                                                style={{color: 'cornflowerblue'}}>{getChineseText(item.siteName)}</Text></Text>
                                        </View>
                                    </View>
                                </View>
                            }

                        </TouchableHighlight>
                    )
                })}
                {
                    this.searchBookName
                        ?
                        <View style={{margin: 10}}>
                            <Button
                                title="资源不够？请尝试重新搜索"
                                color={appTheme.darkColor}
                                onPress={() => {
                                    this._searchBook()
                                }}
                            />
                        </View>
                        : null
                }
            </View>
        )
    };

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
        borderColor: '#ccc',

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
    otherSearchItem: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    itemHeaderText: {
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
        color: '#bbb'
    },
    itemContent: {
        flexDirection: 'row',
        padding: 20,
    },
    itemText: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 12
    },
    itemIcon: {
        color: '#ddd',
        marginRight: 5
    }
});

function mapStateToProps(state) {
    const {otherSearchResult, baseOtherSearchUrl, siteName} = state.otherSearch;
    return {otherSearchResult, baseOtherSearchUrl, siteName}
}

export default connect(mapStateToProps)(Search)
