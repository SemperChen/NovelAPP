/**
 * @author Semper
 */
import React from "react";
import {Animated, Text, TouchableHighlight, View} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createAnimation} from "../utils/AnimatedUtil";
import {saveAppConfig} from "../utils/ConfigUtil";
import I18n from "../i18n/i18n";

class ReaderMenuFooter extends React.Component {

    constructor() {
        super();
        this.animatedValue = new Animated.Value(-55);
        this.isOpenReaderSet = false;
        this.isOpenReaderProgress = false;
        this.bottomMenuIconSize = 16;
        this.state = {
            isNightMode: NovelAppConfig.readConfig.isNightMode
        }
    }

    openMenuFooter() {
        createAnimation(this.animatedValue, 0).start();
    }

    closeMenuFooter() {
        createAnimation(this.animatedValue, -55).start();
    }

    /**
     * 打开阅读设置
     */
    openMenuSet = () => {
        if (this.isOpenReaderProgress) {
            this.closeMenuProgress();
            this.isOpenReaderProgress = false
        }
        this.props.openMenuSet();
    };

    closeMenuSet = () => {
        this.props.closeMenuSet();
    };

    /**
     * 打开进度条
     */
    openMenuProgress = () => {
        if (this.isOpenReaderSet) {
            this.closeMenuSet();
            this.isOpenReaderSet = false
        }
        this.props.openMenuProgress();
    };

    closeMenuProgress = () => {
        this.props.closeMenuProgress();
    };

    getIsOpenReaderSet = () => {
        return this.isOpenReaderSet
    };

    setIsOpenReaderSet = (isOpenReaderSet) => {
        this.isOpenReaderSet = isOpenReaderSet;
    };

    getIsOpenMenuProgress = () => {
        return this.isOpenReaderProgress
    };

    setIsOpenMenuProgress = (isOpenReaderProgress) => {
        this.isOpenReaderProgress = isOpenReaderProgress;
    };

    /**
     * 白天夜间切换开关
     */
    toggleLightAndDarkMode = () => {

        if (NovelAppConfig.readConfig.isNightMode) {
            this.props.changeSkin(NovelAppConfig.readConfig.bgColor);
        } else {
            this.props.changeSkin(NovelAppConfig.readConfig.darkBgColor);
            // this.props.toggleLightAndDark();
            this.props.setNightModeFontColor();
        }
        NovelAppConfig.readConfig.isNightMode = !NovelAppConfig.readConfig.isNightMode;
        saveAppConfig(NovelAppConfig)
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.openMenuSet !== nextProps.openMenuSet ||
            this.state.isNightMode !== nextState.isNightMode
    }

    render() {
        const {styles} = this.props;
        return (
            <Animated.View style={{bottom: this.animatedValue, position: 'absolute'}}>
                <View>
                    <View style={styles.menu}>
                        <TouchableHighlight onPress={() => {
                            this.props.openBookCatalog()
                        }}>
                            <View style={styles.menuItem}>
                                <MaterialIcons name="view-list" size={this.bottomMenuIconSize}
                                               style={styles.menuIcon}/>
                                <Text style={{color: '#fff', fontSize: 10}}>{I18n.t('catalog')}</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => {
                            // ToastUtil.showShort('设置');
                            /* this.setState((preState) => ({
                                 isOpenReaderSet: !preState.isOpenReaderSet
                             }))*/
                            if (this.isOpenReaderProgress) {
                                this.isOpenReaderProgress = false;
                                this.closeMenuProgress();
                            } else {
                                this.isOpenReaderProgress = true;
                                this.openMenuProgress();

                            }
                        }}>
                            <View style={styles.menuItem}>
                                <MaterialIcons name="linear-scale" size={this.bottomMenuIconSize}
                                               style={styles.menuIcon}/>
                                <Text style={{color: '#fff', fontSize: 10}}>{I18n.t('schedule')}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                            // ToastUtil.showShort('设置');
                            /* this.setState((preState) => ({
                                 isOpenReaderSet: !preState.isOpenReaderSet
                             }))*/
                            if (this.isOpenReaderSet) {
                                this.isOpenReaderSet = false;
                                this.closeMenuSet();
                            } else {
                                this.isOpenReaderSet = true;
                                this.openMenuSet();

                            }
                        }}>
                            <View style={styles.menuItem}>
                                <MaterialIcons name="format-color-text" size={this.bottomMenuIconSize}
                                               style={styles.menuIcon}/>
                                <Text style={{color: '#fff', fontSize: 10}}>{I18n.t('setting')}</Text>
                            </View>

                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                            this.props.navigateToBookcase()
                        }}>
                            <View style={styles.menuItem}>
                                <MaterialIcons name="book" size={this.bottomMenuIconSize}
                                               style={styles.menuIcon}/>
                                <Text style={{color: '#fff', fontSize: 10}}>{I18n.t('bookcase')}</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => {
                            this.setState((preState) => ({
                                isNightMode: !preState.isNightMode,
                            }));
                            this.toggleLightAndDarkMode()
                        }}>
                            {
                                this.state.isNightMode ?
                                    <View style={styles.menuItem}>
                                        <MaterialIcons name="brightness-1" size={this.bottomMenuIconSize}
                                                       style={styles.menuIcon}/>
                                        <Text style={{color: '#fff', fontSize: 10}}>{I18n.t('dayMode')}</Text>
                                    </View>
                                    :
                                    <View style={styles.menuItem}>
                                        <MaterialIcons name="brightness-3" size={this.bottomMenuIconSize}
                                                       style={styles.menuIcon}/>
                                        <Text style={{color: '#fff', fontSize: 10}}>{I18n.t('nightMode')}</Text>
                                    </View>
                            }
                        </TouchableHighlight>


                    </View>

                </View>
            </Animated.View>
        )
    }
}

export default ReaderMenuFooter