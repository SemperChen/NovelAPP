/**
 * @author Semper
 */
import React from "react";
import I18n from "../i18n/i18n";
import {HEIGHT, WIDTH} from "../utils/DimensionsUtil";
import {ActivityIndicator, Button, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {clearLogin, requestLogin} from "../actions/login";
import {loginUrl, registerUrl, saveUrl} from "../constants/api";
import ToastUtil from "../utils/ToastUtil";
import {saveAppConfig} from "../utils/ConfigUtil";
import {saveBookmark} from "../utils/BookmarkUtil";
import {requestBookmarks} from "../actions/bookmarks";
import Icon from "react-native-vector-icons/Ionicons";
import {getChineseText} from "../utils/LanguageUtil";
import {REQUEST_NET_FAILED} from "../constants/constants";

class UserPage extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            headerTitle: I18n.t('person'),
            headerStyle: {elevation: 0, backgroundColor: screenProps.appTheme.primaryColor},
            headerTintColor: '#fff'
        }
    };
    _reReadBookmark = () => {
        this.props.dispatch(requestBookmarks())
    };

    constructor() {
        super();
        this.isClickRegister = false;
        this.state = {
            login: I18n.t('login'),
            register: I18n.t('register')
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.loginData !== nextProps.loginData ||
            this.props.isFetching !== nextProps.isFetching ||
            this.state.login !== nextState.login ||
            this.state.register !== nextState.register
    }

    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
    }

    componentWillUnmount() {
        this.props.dispatch(clearLogin());
    }

    login = () => {
        if (this.username && this.password) {
            let url = this.isClickRegister ? registerUrl : loginUrl;
            let body = {username: this.username, password: this.password};
            this.props.dispatch(requestLogin(url, body))
        } else {
            ToastUtil.showShort(getChineseText('请输入用户名和密码'))
        }
    };

    render() {
        const appTheme = this.props.screenProps.appTheme;
        if (this.props.loginData === REQUEST_NET_FAILED) {
            ToastUtil.showShort(getChineseText('连接服务器失败'))
        }
        let isSavedBookmark = null;
        try {
            isSavedBookmark = this.props.loginData.isSavedBookmark
        } catch (e) {
            console.warn('Login Page render err2', e.message)
        }
        if (isSavedBookmark) {
            ToastUtil.showShort(this.props.loginData.msc);
            if (this.props.loginData.isLogin) {
                NovelAppConfig.isLogin = true;
                NovelAppConfig.user = this.props.loginData.user;
                saveAppConfig(NovelAppConfig)
            }
        }
        if (NovelAppConfig.isLogin && NovelAppConfig.user) {
            try {
                console.log('NovelAppConfig.user', NovelAppConfig.user);
                this.username = NovelAppConfig.user.username;
                this.password = NovelAppConfig.user.password
            } catch (e) {
                console.warn('Login Page render err1', e.message)
            }
        } else {
            if (this.props.loginData) {

                try {
                    if (this.props.loginData.isLogin) {
                        NovelAppConfig.isLogin = true;
                        NovelAppConfig.user = this.props.loginData.user;
                        saveAppConfig(NovelAppConfig)
                    } else {
                        ToastUtil.showShort(this.props.loginData.msc)
                    }
                } catch (e) {
                    console.warn('Login Page render err3', e.message)
                }
                try {
                    if (!this.props.loginData.isRegisterSuccess) {
                        ToastUtil.showShort(this.props.loginData.msc)
                    }
                } catch (e) {
                    console.warn('Login Page render err4', e.message)
                }

            }
        }
        console.log('loginData', this.props.loginData);
        return (
            <View>
                {
                    NovelAppConfig.isLogin
                        ?
                        <View>
                            <View
                                style={styles.loginSuc}>
                                <View style={[styles.imgContent, {backgroundColor: appTheme.lightColor}]}>
                                    <Icon
                                        name='md-person'
                                        size={40}
                                        color={'#fff'}
                                    />
                                </View>
                                <Text>Hi,{this.username}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    if (this.username && this.password) {
                                        let body = {
                                            username: this.username,
                                            password: this.password,
                                            bookmark: JSON.stringify(this.props.bookmarks)
                                        };
                                        this.props.dispatch(requestLogin(saveUrl, body));
                                    } else {
                                        ToastUtil.showShort(getChineseText('用户名和密码错误'))
                                    }
                                }}
                            >
                                <View style={styles.updateBookmark}>
                                    <Text>{getChineseText('上传书签进度  ')}</Text>
                                    {
                                        this.props.isFetching
                                            ?
                                            <ActivityIndicator
                                                animating={true}
                                                color={appTheme.primaryColor}
                                                size="small"
                                            />
                                            : null

                                    }
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    try {
                                        let bookmarks = JSON.parse(NovelAppConfig.user.bookmark);
                                        for (let i = 0; i < bookmarks.length; i++) {
                                            saveBookmark(bookmarks[i])
                                        }
                                    } catch (e) {
                                        console.warn('Login Page render err5', e.message)
                                    }
                                    this._reReadBookmark();
                                    ToastUtil.showShort(getChineseText('下载进度成功'))
                                }}
                            >
                                <Text>{getChineseText('下载书签进度')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    NovelAppConfig.isLogin = false;
                                    NovelAppConfig.user = null;
                                    saveAppConfig(NovelAppConfig);
                                    this.username = null;
                                    this.password = null;
                                    console.log('clearLogin');
                                    if (this.props.loginData) {
                                        this.props.dispatch(clearLogin());
                                    } else {
                                        this.forceUpdate()
                                    }
                                }}
                            >
                                <Text>{getChineseText('退出登录')}</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.login}>
                            <TextInput
                                // autoFocus={true}
                                style={{width: WIDTH * 0.8}}
                                placeholder={I18n.t('username')}
                                placeholderTextColor="#ddd"
                                clearTextOnFocus={true}
                                clearButtonMode="while-editing"
                                underlineColorAndroid={appTheme.primaryColor}
                                returnKeyType='next'
                                onSubmitEditing={() => {

                                }}
                                onChangeText={(username) => this.username = username}
                            />
                            <TextInput
                                // autoFocus={true}
                                style={{width: WIDTH * 0.8}}
                                placeholder={I18n.t('password')}
                                placeholderTextColor="#ddd"
                                clearTextOnFocus={true}
                                clearButtonMode="while-editing"
                                underlineColorAndroid={appTheme.primaryColor}
                                returnKeyType='done'
                                onSubmitEditing={() => {

                                }}
                                onChangeText={(password) => this.password = password}
                            />
                            <View style={styles.loginBtnContainer}>
                                <TouchableOpacity
                                    style={[{backgroundColor: appTheme.primaryColor}, styles.btn]}
                                    onPress={() => {
                                        this.login()
                                    }}
                                >
                                    {
                                        this.props.isFetching
                                            ?
                                            <ActivityIndicator
                                                animating={true}
                                                color='#fff'
                                                size="small"
                                            />
                                            :
                                            <Text style={{color: '#fff'}}>{this.state.login}</Text>

                                    }
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity
                                style={{padding: 20}}
                                onPress={() => {
                                    this.isClickRegister = !this.isClickRegister;
                                    if (this.isClickRegister) {
                                        this.setState({
                                            register: I18n.t('login'),
                                            login: I18n.t('register')
                                        })
                                    } else {
                                        this.setState({
                                            login: I18n.t('login'),
                                            register: I18n.t('register')
                                        })
                                    }
                                }}
                            >
                                <Text>{this.state.register}</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    loginSuc: {
        height: HEIGHT / 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee',
        backgroundColor: '#fffffe'
    },
    login: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: WIDTH / 10
    },
    loginBtnContainer: {
        width: WIDTH * 0.8,
        marginTop: WIDTH / 10
    },
    mainContent: {
        flexDirection: 'row'
    },
    item: {
        padding: 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#EEE'
    },
    imgContent: {
        width: WIDTH / 5,
        height: WIDTH / 5,
        borderRadius: WIDTH / 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    btn: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    updateBookmark: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

function mapStateToProps(state) {
    const {items: bookmarks} = state.bookmarks || {items: []};
    const {loginData, isFetching} = state.login;
    return {loginData, bookmarks, isFetching}
}

export default connect(mapStateToProps)(UserPage)