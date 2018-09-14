/**
 * @author Semper
 */
import React from "react";
import {Slider, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {WIDTH} from "../utils/DimensionsUtil";
import {READ_BG_COLOR} from "../constants/constants";
import {saveAppConfig} from "../utils/ConfigUtil";
import I18n from "../i18n/i18n";

class ReaderMenuSet extends React.Component {

    constructor() {
        super();
        this.readProgressBottom = 55;
        this.readerFontSize = 16;
        this.minFontSize = 16;
        this.maxFontSize = 32;
        this.brown = '#c4b395';
        this.blue = '#cad9e8';
        this.green = '#d1edd1';
        this.pink = '#e6e6e6';
        this.state = this.initializeData()
    }

    initializeData = () => {
        let state = {
            showBrownSkin: false,
            showBlueSkin: false,
            showGreenSkin: false,
            showPinkSkin: false,
            readerFontSize: NovelAppConfig.readConfig.fontSize,
            sampleFontSize: NovelAppConfig.readConfig.fontSize,
            isTraditional: NovelAppConfig.isTraditional
        };

        switch (NovelAppConfig.readConfig.bgColor) {
            case READ_BG_COLOR.DEFAULT:
                state.showBrownSkin = true;
                break;
            case READ_BG_COLOR.BLUE:
                state.showBlueSkin = true;
                break;
            case READ_BG_COLOR.GREEN:
                state.showGreenSkin = true;
                break;
            case READ_BG_COLOR.PINK:
                state.showPinkSkin = true;
                break;
        }
        return state
    };

    open() {
        this.readerSet.setNativeProps({
            style: {
                bottom: this.readProgressBottom,
                left: 0
            }
        });
    }

    close() {
        this.readerSet.setNativeProps({
            style: {
                bottom: this.readProgressBottom,
                left: WIDTH,
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.showPinkSkin !== nextState.showPinkSkin ||
            this.state.showGreenSkin !== nextState.showGreenSkin ||
            this.state.showBlueSkin !== nextState.showBlueSkin ||
            this.state.showBrownSkin !== nextState.showBrownSkin ||
            this.state.readerFontSize !== nextState.readerFontSize ||
            this.state.sampleFontSize !== nextState.sampleFontSize ||
            this.state.isTraditional !== nextState.isTraditional

    }

    setBgColor = (color) => {
        switch (color) {
            case READ_BG_COLOR.DEFAULT:
                this.setState({
                    showBrownSkin: true,
                    showBlueSkin: false,
                    showGreenSkin: false,
                    showPinkSkin: false
                });
                break;
            case READ_BG_COLOR.BLUE:
                this.setState({
                    showBrownSkin: false,
                    showBlueSkin: true,
                    showGreenSkin: false,
                    showPinkSkin: false
                });
                break;
            case READ_BG_COLOR.GREEN:
                this.setState({
                    showBrownSkin: false,
                    showBlueSkin: false,
                    showGreenSkin: true,
                    showPinkSkin: false
                });
                break;
            case READ_BG_COLOR.PINK:
                this.setState({
                    showBrownSkin: false,
                    showBlueSkin: false,
                    showGreenSkin: false,
                    showPinkSkin: true
                });
                break;
        }
        this.props.changeSkin(color);
        NovelAppConfig.readConfig.isNightMode = false;
        NovelAppConfig.readConfig.bgColor = color;
        saveAppConfig(NovelAppConfig)
    };

    render() {
        // console.log('ReaderMenuSet render',this.state.readerFontSize);
        const {styles} = this.props;
        return (
            <View ref={(ref) => {
                this.readerSet = ref
            }} style={{
                left: WIDTH,
                bottom: this.readProgressBottom,
                position: 'absolute',
            }}>
                <View style={styles.readerSet}>
                    <View style={[styles.readerSetItem,
                        {paddingRight: WIDTH / 15, paddingLeft: WIDTH / 15, justifyContent: 'center'}]}>
                        <Text
                            allowFontScaling={false}
                            style={{color: '#fff', fontSize: this.state.sampleFontSize}}>{I18n.t('readFontSize')}</Text>
                    </View>
                    <View style={[styles.readerSetItem]}>
                        <TouchableHighlight onPress={() => {
                            if (this.state.readerFontSize > this.minFontSize) {
                                this.props.changeFontSize(this.state.readerFontSize - 1);
                                this.setState((preState) => ({
                                    readerFontSize: preState.readerFontSize - 1,
                                    sampleFontSize: preState.readerFontSize - 1
                                }))
                            }
                        }} style={{height: 55, width: 55, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#fff'}}>A—</Text>
                        </TouchableHighlight>
                        <Slider
                            onValueChange={(value) => {
                                this.setState({
                                    sampleFontSize: value
                                });
                            }}
                            onSlidingComplete={(value) => {
                                this.setState({
                                    readerFontSize: value
                                });
                                this.props.changeFontSize(value)
                            }}
                            value={this.state.readerFontSize}
                            minimumValue={this.minFontSize}
                            step={1}
                            maximumValue={this.maxFontSize}
                            style={styles.slider}
                            maximumTrackTintColor="gainsboro"
                            minimumTrackTintColor="deeppink"
                            thumbTintColor="deeppink"/>
                        <TouchableHighlight onPress={() => {
                            if (this.state.readerFontSize < this.maxFontSize) {
                                this.props.changeFontSize(this.state.readerFontSize + 1);
                                this.setState((preState) => ({
                                    readerFontSize: preState.readerFontSize + 1,
                                    sampleFontSize: preState.readerFontSize + 1
                                }))
                            }
                        }} style={{height: 55, width: 55, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#fff'}}>A+</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.readerSetItem, {paddingRight: WIDTH / 15, paddingLeft: WIDTH / 15}]}>
                        <TouchableHighlight underlayColor={this.brown} onPress={() => {
                            this.setBgColor(READ_BG_COLOR.DEFAULT);
                        }} style={[menuSetStyles.readerSkinButton, {backgroundColor: this.brown},
                            this.state.showBrownSkin ? menuSetStyles.selectedBorderColor : menuSetStyles.unSelectBorder]}>
                            <MaterialIcons name="check" size={this.state.showBrownSkin ? this.bottomMenuIconSize : 0}
                                           style={[menuSetStyles.skinIcon]}/>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={this.blue} onPress={() => {
                            this.setBgColor(READ_BG_COLOR.BLUE);
                        }} style={[menuSetStyles.readerSkinButton, {backgroundColor: this.blue},
                            this.state.showBlueSkin ? menuSetStyles.selectedBorderColor : menuSetStyles.unSelectBorder]}>
                            <MaterialIcons name="check" size={this.state.showBlueSkin ? this.bottomMenuIconSize : 0}
                                           style={[menuSetStyles.skinIcon]}/>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={this.green} onPress={() => {
                            this.setBgColor(READ_BG_COLOR.GREEN);
                        }} style={[menuSetStyles.readerSkinButton, {backgroundColor: this.green},
                            this.state.showGreenSkin ? menuSetStyles.selectedBorderColor : menuSetStyles.unSelectBorder]}>
                            <MaterialIcons name="check" size={this.state.showGreenSkin ? this.bottomMenuIconSize : 0}
                                           style={[menuSetStyles.skinIcon]}/>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={this.pink} onPress={() => {
                            this.setBgColor(READ_BG_COLOR.PINK);
                        }} style={[menuSetStyles.readerSkinButton, {backgroundColor: this.pink},
                            this.state.showPinkSkin ? menuSetStyles.selectedBorderColor : menuSetStyles.unSelectBorder]}>
                            <MaterialIcons name="check" size={this.state.showPinkSkin ? this.bottomMenuIconSize : 0}
                                           style={[menuSetStyles.skinIcon]}/>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.readerSetItem,
                        {paddingRight: WIDTH / 15, paddingLeft: WIDTH / 15}]}>
                        <TouchableHighlight
                            style={menuSetStyles.readerModeButton}
                            onPress={() => {
                                this.setState((preState) => ({
                                    isTraditional: !preState.isTraditional,
                                }));
                                NovelAppConfig.isTraditional = !NovelAppConfig.isTraditional;
                                saveAppConfig(NovelAppConfig);
                                this.props.changeFontSize()
                            }}
                        >
                            {
                                this.state.isTraditional
                                    ?
                                    <Text style={{color: '#fff'}}>简体</Text>
                                    :
                                    <Text style={{color: '#fff'}}>繁体</Text>
                            }
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={menuSetStyles.readerModeButton}
                            onPress={() => {
                                this.props.navToWebReadPage()
                            }}
                        >
                            <Text style={{color: '#fff'}}>{I18n.t('webRead')}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}

const menuSetStyles = StyleSheet.create({

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
    unSelectBorder: {
        borderWidth: 0,
    },
    selectedBorderColor: {
        borderColor: 'deeppink',
    },
    skinIcon: {
        color: 'deeppink'
    },
    checkOpacity: {
        opacity: 0
    }
});


export default ReaderMenuSet