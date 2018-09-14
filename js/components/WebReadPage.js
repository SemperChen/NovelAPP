/**
 * @author Semper
 */

import React from "react";
import {BackHandler, Platform, StatusBar, WebView} from "react-native";
import Loading from "../commons/Loading";
import {getChineseText} from "../utils/LanguageUtil";
import ToastUtil from "../utils/ToastUtil";

class WebReadPage extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            headerTitle: getChineseText(navigation.state.params.siteName),
            headerStyle: {elevation: 0, backgroundColor: screenProps.appTheme.primaryColor},
            headerTintColor: '#fff'
        }
    };

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('WebReadBackPress', this.onBackAndroid);
        }
        const {params} = this.props.navigation.state;
        if (params) {
            this.siteName = params.siteName;
            this.url = params.url.replace('www', 'm')
        }
    }

    componentDidMount(){
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        /*if(this.siteName === '笔趣阁'){
            ToastUtil.showShort(getChineseText('获取资源失败'))
        }*/

    }

    onBackAndroid = () => {
        this.props.navigation.goBack(null);
        return true
    };

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('WebReadBackPress', this.onBackAndroid);
        }
    }

    render() {
        return (
            <WebView
                startInLoadingState={true}
                renderLoading={() => {
                    return (
                        <Loading
                            animating={true}
                        />

                    )
                }}
                source={{uri: this.url}}
            />
        )
    }
}

export default WebReadPage