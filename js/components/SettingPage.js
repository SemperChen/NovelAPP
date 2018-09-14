/**
 * @author Semper
 */
import React from "react";
import {DeviceEventEmitter, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {READER_SEX, THEME_COLORS} from "../constants/constants";
import {saveAppConfig} from "../utils/ConfigUtil";
import {WIDTH} from "../utils/DimensionsUtil";
import I18n from "../i18n/i18n";
import {NavigationActions, StackActions} from 'react-navigation';

class SettingPage extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        return {
            headerTitle: I18n.t('setting'),
            headerStyle: {elevation: 0, backgroundColor: screenProps.appTheme.primaryColor},
            headerTintColor: '#fff'
        }
    };

    constructor() {
        super();
        this.state = {
            skinModalVisible: false,
            readerSexModalVisible: false
        };
    }

    componentDidMount() {
    }

    selectTheme = (colorName) => {
        this.props.screenProps.setTheme(colorName);
        NovelAppConfig.themeColorName = colorName;
        saveAppConfig(NovelAppConfig)
    };

    reFetchBookStoreData = () => {
        DeviceEventEmitter.emit('ChangeReaderSex', '');
    };

    setSkinModalVisible(visible) {
        this.setState({skinModalVisible: visible})
    }

    setReaderSexModalVisible(visible) {
        this.setState({readerSexModalVisible: visible});
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={() => {
                        this.setReaderSexModalVisible(true)
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>{I18n.t('readerSex')}</Text>
                            <Text style={styles.itemValue}>{NovelAppConfig.readerSex}</Text>
                        </View>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={() => {
                        this.setSkinModalVisible(true)
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Text style={styles.itemLeftText}>{I18n.t('skin')}</Text>
                            <Text style={styles.itemValue}>{NovelAppConfig.themeColorName}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
                {this._changeSkinModal()}
                {this._changeReaderSexModal()}
            </View>
        )
    }

    _changeSkinModal = () => {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.skinModalVisible}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.skinModalContainer}>
                        <View style={[styles.skinModalContent, {position: 'absolute'}]}
                            /* onStartShouldSetResponder={() => {
                                 return true
                             }}
                             onMoveShouldSetResponder={() => {
                                 return true
                             }}
                             onResponderRelease={()=>{
                                 this.setSkinModalVisible(false)
                             }}*/
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    this.selectTheme(THEME_COLORS.DARK);
                                    NovelAppConfig.themeColorName = THEME_COLORS.DARK;
                                    this.setSkinModalVisible(false);
                                }}>
                                <View style={styles.item}>
                                    <Text style={styles.itemLeftText}>{THEME_COLORS.DARK}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    this.selectTheme(THEME_COLORS.PINK);
                                    NovelAppConfig.themeColorName = THEME_COLORS.PINK;
                                    this.setSkinModalVisible(false);
                                }}>
                                <View style={styles.item}>
                                    <Text style={styles.itemLeftText}>{THEME_COLORS.PINK}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    };
    _changeReaderSexModal = () => {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.readerSexModalVisible}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.skinModalContainer}>
                        <View style={styles.skinModalContent}>
                            <TouchableOpacity
                                onPress={() => {
                                    NovelAppConfig.readerSex = READER_SEX.MALE;
                                    this.reFetchBookStoreData();
                                    this.setReaderSexModalVisible(false)
                                }}>
                                <View style={styles.item}>
                                    <Text style={styles.itemLeftText}>{I18n.t('male')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    NovelAppConfig.readerSex = READER_SEX.FEMALE;
                                    this.reFetchBookStoreData();
                                    this.setReaderSexModalVisible(false)
                                }}>
                                <View style={styles.item}>
                                    <Text style={styles.itemLeftText}>{I18n.t('female')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>

            </View>
        )
    };
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18
    },
    skinModalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.4)',
        flex: 1
    },
    itemLeftText: {
        fontSize: 16
    },
    skinModalContent: {
        width: WIDTH / 4 * 3,
        backgroundColor: '#fff'
    },
    itemValue: {
        fontSize: 12,
        color: '#999999',
        paddingTop: 10
    }

});
export default SettingPage