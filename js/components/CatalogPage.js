/**
 * @author Semper
 */
import React from "react";
import {connect} from "react-redux";
import {
    BackHandler,
    FlatList,
    InteractionManager,
    Platform, StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {BQG2_NAME, BQG_NAME, BQT_NAME, DZZ_NAME, PBDZS_NAME, WLZW_NAME, ZSSQ_NAME} from "../constants/api";
import {getCatalogBQT, getCatalogDZZ, getCatalogPBDZS, getCatalogWLZW} from "../utils/ParseHtmlUtil";
import Loading from "../commons/Loading";
import {getChineseText} from "../utils/LanguageUtil";

class CatalogPage extends React.Component {

    static navigationOptions = {
        header: null
        // headerStyle:{elevation: 0}
    };

    constructor() {
        super();
        this.itemHeight = 52;
    }

    componentWillMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('CatalogBackPress', this.onBackAndroid);
        }
        let params = this.props.navigation.state.params;
        this.fetchArticleByCatalog = params.fetchArticleByCatalog;
        this.currentChapterNum = params.currentChapterNum;
        this.siteName = params.siteName;
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('CatalogBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true
    };

    shouldComponentUpdate(nextProps) {
        return !this.props.catalogData === nextProps.catalogData
    }

    render() {
        if (this.props.catalogData) {
            try {
                switch (this.siteName) {
                    case ZSSQ_NAME:
                        try {
                            this.catalog = this.props.catalogData.mixToc.chapters;
                        } catch (e) {
                            console.warn('CatalogPage render ZSSQ_NAME', e.message)
                        }
                        break;
                    case DZZ_NAME:
                        this.catalog = getCatalogDZZ(this.props.catalogData);
                        break;
                    case PBDZS_NAME:
                        this.catalog = getCatalogPBDZS(this.props.catalogData);
                        break;
                    case BQG_NAME:
                        this.catalog = getCatalogPBDZS(this.props.catalogData);
                        break;
                    case WLZW_NAME:
                        this.catalog = getCatalogWLZW(this.props.catalogData);
                        break;
                    case BQT_NAME:
                        this.catalog = getCatalogBQT(this.props.catalogData);
                        break;
                    case BQG2_NAME:
                        this.catalog = getCatalogPBDZS(this.props.catalogData);
                        break
                }
            } catch (e) {
                console.warn('CatalogPage render func error', e.message)
            }

        }
        const appTheme = this.props.screenProps.appTheme;
        return (
            <View style={styles.catalogContainer}>
                <StatusBar
                    animated={true}
                    backgroundColor={appTheme.darkColor}
                    barStyle="light-content"
                />
                {this.props.catalogData
                    ?
                    <FlatList
                        ref={this._captureRef}
                        data={this.catalog}
                        renderItem={this._renderItem}
                        onViewableItemsChanged={this._onViewableItemsChanged}
                        getItemLayout={this._getItemLayout}
                        keyExtractor={this._keyExtractor}
                    />
                    :
                    <Loading animating={true}/>}

                <TouchableOpacity
                    onPress={() => {
                        InteractionManager.runAfterInteractions(() => {
                            this.props.navigation.goBack(null)
                        })

                    }}
                    style={{
                        position: 'absolute',
                        right: 0,
                        height: 70,
                        width: 35,
                        backgroundColor: '#e3e3e3',
                        borderBottomLeftRadius: 35,
                        borderTopLeftRadius: 35,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <MaterialIcons name="navigate-before" size={28} style={{color: '#fff'}}/>
                </TouchableOpacity>
            </View>
        )
    }

    _captureRef = (ref) => {
        this._flatRef = ref;
    };
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.fetchArticleByCatalog(index);
                    this.props.navigation.goBack(null)
                }}
                style={{
                    height: this.itemHeight,
                    width: WIDTH,
                    justifyContent: 'center',
                    borderTopWidth: 1,
                    borderColor: 'rgb(200, 199, 204)',
                    paddingLeft: 10
                }}>
                <Text style={
                    this.currentChapterNum - 2 === index
                        ?
                        {
                            fontWeight: 'bold',
                            color: '#000'
                        }
                        :
                        {
                            fontWeight: 'normal'
                        }
                }>{getChineseText(item.title)}</Text>
            </TouchableOpacity>
        )
    };
    _onViewableItemsChanged = () => {
        
        if (this.currentChapterNum && this.catalog.length > 0 && !this.isFetched) {
            this.isFetched = true;
            try {
                this._flatRef.scrollToIndex({
                    animated: false,
                    viewPosition: 0.5,
                    index: this.currentChapterNum - 2
                });
            } catch (e) {
                console.warn('CatalogPage scrollToIndex err:', e.message)
            }

        }
    };
    _getItemLayout = (data, index) => {
        return {length: this.itemHeight, offset: this.itemHeight * index, index}
    };
    _keyExtractor = (item, index) => {
        return index
    }

}

const styles = StyleSheet.create({
    catalogContainer: {
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

function mapStateToProps(state) {
    const {catalogData, isCatalogFetching} = state.catalog;
    return {catalogData, isCatalogFetching}
}

export default connect(mapStateToProps)(CatalogPage)
