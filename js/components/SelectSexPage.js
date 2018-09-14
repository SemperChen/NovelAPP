/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {WIDTH} from "../utils/DimensionsUtil";
import {READER_SEX, THEME_COLORS} from "../constants/constants";
import {NavigationActions, StackActions} from "react-navigation";
import {saveAppConfig} from "../utils/ConfigUtil";
import I18n from "../i18n/i18n";

class SelectSexPage extends React.Component {
    static navigationOptions = {
        header: null
    };

    _setReaderSex = (sex) => {
        NovelAppConfig.readerSex = sex;
        this.props.screenProps.setTheme(NovelAppConfig.themeColorName);
        saveAppConfig(NovelAppConfig);
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'App'}),
            ]
        }))
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{I18n.t('selectSex')}</Text>
                <View style={styles.mainContent}>
                    <TouchableOpacity
                        onPress={() => {
                            NovelAppConfig.themeColorName = THEME_COLORS.DARK;
                            this._setReaderSex(READER_SEX.MALE)
                        }}
                        style={styles.item}>
                        <View style={styles.imgContent}>
                            <Icon
                                name='md-male'
                                size={30}
                                color='#4ed'
                            />
                        </View>
                        <Text style={styles.maleText}>{I18n.t('male')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            NovelAppConfig.themeColorName = THEME_COLORS.PINK;
                            this._setReaderSex(READER_SEX.FEMALE)
                        }}
                        style={styles.item}>
                        <View style={styles.imgContent}>
                            <Icon
                                name='md-female'
                                size={30}
                                color='#e4e'
                            />
                        </View>
                        <Text style={styles.femaleText}>{I18n.t('female')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    mainContent: {
        flexDirection: 'row'
    },
    item: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center'
    },
    imgContent: {
        width: WIDTH / 4,
        height: WIDTH / 4,
        borderRadius: WIDTH / 8,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    maleText: {
        color: '#4ed'
    },
    femaleText: {
        color: '#e4e'
    }
});
export default SelectSexPage