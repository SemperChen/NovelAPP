/**
 * @author Semper
 */
import React from "react";
import {Image, Text, View,StyleSheet,StatusBar} from "react-native";
import {connect} from "react-redux";
import {requestConfig} from "../actions/config";
import {NavigationActions, StackActions} from "react-navigation";
import I18n from "../i18n/i18n";
import {getLanguages} from 'react-native-i18n'
import {CHINESE_TYPE} from "../constants/constants";
import {saveAppConfig} from "../utils/ConfigUtil";
import {HEIGHT} from '../utils/DimensionsUtil';

class WelcomePage extends React.Component {

    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        StatusBar.setHidden(true);
        getLanguages().then(languages => {
            if (languages[0] === 'zh-CN' || languages[0] === 'zh-Hans-US' || languages[0] === 'zh-Hans-CN') {
                global.globalChineseType = CHINESE_TYPE.CN;
            } else {
                global.globalChineseType = CHINESE_TYPE.TW;
                NovelAppConfig.isTraditional = true;
                saveAppConfig(NovelAppConfig)

            }
            console.log('languages', languages) // ['en-US', 'en']
        })
    }

    componentDidMount() {
        this.props.dispatch(requestConfig());

    }

    shouldComponentUpdate(nextProps) {
        if (this.props.configData === nextProps.configData) {
            return false
        } else {
            if (nextProps.configData.length !== 0) {
                global.NovelAppConfig = nextProps.configData
            }
            this.props.screenProps.setTheme(NovelAppConfig.themeColorName);
            if (NovelAppConfig.isFirstOpen) {
                NovelAppConfig.isFirstOpen = false;
                // saveAppConfig(NovelAppConfig);
                this.timer = setTimeout(() => {
                    this.props.navigation.navigate('SelectSex')
                }, 1500);
            } else {
                // saveAppConfig(NovelAppConfig);
                this.timer = setTimeout(() => {
                    this._navToMain();
                }, 1500);
            }
            return !nextProps.configData;
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _navToMain = () => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'App'})
            ]
        }))
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../data/img/splash.png')}/>
                <Text style={styles.appName}>{I18n.t('magicalBookstore')}</Text>
                <Text style={styles.version}>Version1.0.1</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    appName:{
        fontWeight: 'bold',
        fontSize: 28 ,
        position:'absolute',
        top:HEIGHT / 3,
        backgroundColor:'transparent'
    },
    version:{
        fontSize: 14,
        position:'absolute',
        bottom:50,
        backgroundColor:'transparent'
    }
});
function mapStateToProps(state) {
    const {configData} = state.config;
    return {configData}
}

export default connect(mapStateToProps)(WelcomePage)