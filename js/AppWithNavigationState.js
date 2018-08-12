import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import AppNavigator from './navigators/AppNavigator';
import {THEME_COLORS} from "./constants/constants";
import ThemeFactory, {ThemeColors} from "./commons/ThemeFactory";
import {Alert, BackHandler, Linking, Platform, ToastAndroid} from "react-native";
import {requestNotification} from "./actions/notification";
import {notificationUrl} from "./constants/api";
import {getChineseText} from "./utils/LanguageUtil";
import {getNotification} from "./utils/ParseHtmlUtil";
import {saveAppConfig} from "./utils/ConfigUtil";
import {addListener} from './utils/redux';
import {NavigationActions} from 'react-navigation';
import RNExitApp from 'react-native-exit-app';

class AppWithNavigationState extends Component {

    constructor() {
        super();
        this.state = this.initializeData()
    }

    /**
     * 初始化数据
     * @returns {{appTheme: {primaryColor, darkColor, lightColor, styles}|*}}
     */
    initializeData = () => {
        if (NovelAppConfig.themeColorName === THEME_COLORS.DARK) {
            return {
                appTheme: ThemeFactory.createTheme(ThemeColors.darkColors)
            }
        } else {
            return {
                appTheme: ThemeFactory.createTheme(ThemeColors.pinkColors)
            }
        }
    };

    /**
     * 设置主体
     * @param colorName
     */
    setTheme = (colorName) => {
        switch (colorName) {
            case THEME_COLORS.DARK:
                this.setState({
                    appTheme: ThemeFactory.createTheme(ThemeColors.darkColors)
                });
                break;
            case THEME_COLORS.PINK:
                this.setState({
                    appTheme: ThemeFactory.createTheme(ThemeColors.pinkColors)
                });
                break;
            default:
                break
        }
    };

    componentDidMount() {
        this.props.dispatch(requestNotification(notificationUrl))
    }

    shouldComponentUpdate(nextProps) {
        if (!this.props.notificationData && nextProps.notificationData) {
            this.notification = getNotification(nextProps.notificationData);
            this.showNotification();
            return false
        }
        return true
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    /**
     * 展示信息
     */
    showNotification = () => {

        try {
            if (this.notification && this.notification.time !== NovelAppConfig.notificationTime) {

                if (this.notification.url !== '' && this.notification.url !== null && this.notification.url !== undefined) {
                    Alert.alert(
                        getChineseText(this.notification.title),
                        getChineseText(this.notification.content),
                        [
                            {text: getChineseText('关闭'), style: 'cancel'},
                            {
                                text: getChineseText(this.notification.button),
                                onPress: () => {
                                    Linking.openURL(this.notification.url)
                                        .catch(err => console.error('An error occurred', err));
                                }
                            },
                        ],
                        {cancelable: false}
                    )
                } else {
                    Alert.alert(
                        getChineseText(this.notification.title),
                        getChineseText(this.notification.content),
                        [
                            {
                                text: getChineseText('确定'), onPress: () => {
                                }
                            },
                        ],
                        {cancelable: false}
                    )
                }
                NovelAppConfig.notificationTime = this.notification.time;
                saveAppConfig(NovelAppConfig)
            }
        } catch (e) {
            console.log('AppWithNavigationState showNotification func error', e.message)
        }

    };

    onBackAndroid = () => {
        try{
            if (this.currentRouteName === 'App') {
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    RNExitApp.exitApp();
                    // AppRegistry.unmountApplicationComponentAtRootTag(1);
                    return false;
                }
                this.lastBackPressed = Date.now();
                ToastAndroid.show(getChineseText('再按一次退出应用'), ToastAndroid.SHORT);
                return true;
            }
            this.props.dispatch(NavigationActions.back());
            return true
        }catch(e){
            console.log('AppWithNavigationState onBackAndroid', e.message)
        }
    };

    render() {
        const {dispatch, nav} = this.props;
        this.index = nav.index;
        this.currentRouteName = nav.routes[this.index].routeName;
        const navigation = addNavigationHelpers({
            dispatch: dispatch,
            state: nav,
            addListener,
        });
        return (
            <AppNavigator
                screenProps={{setTheme: this.setTheme, appTheme: this.state.appTheme}}
                navigation={navigation}
            />
        );
    }
}

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    notificationData: PropTypes.string
};

function mapStateToProps(state) {
    const {nav} = state;
    const {notificationData} = state.notification;
    return {nav, notificationData}
}

export default connect(mapStateToProps)(AppWithNavigationState);