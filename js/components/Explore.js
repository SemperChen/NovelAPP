/**
 * @author Semper
 */
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TAB_ICON_SIZE} from "../constants/constants";
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";

class Explore extends React.Component {

    static navigationOptions = ({screenProps}) => {
        return {
            tabBarLabel: ({focused}) => (
                <Text style={[{
                    color: screenProps.appTheme.darkColor,
                    fontSize: 12,
                    marginBottom: 5
                }, focused ?
                    {color: screenProps.appTheme.darkColor} :
                    {color: screenProps.appTheme.lightColor}]}>{I18n.t('explore')}</Text>
            ),
            tabBarIcon: ({focused}) => (
                <MaterialIcons name="explore" size={TAB_ICON_SIZE}
                               style={focused ?
                                   {color: screenProps.appTheme.darkColor} :
                                   {color: screenProps.appTheme.lightColor}}/>
            ),
            headerStyle: {backgroundColor: screenProps.appTheme.primaryColor},
        }
    };

    render() {
        const appTheme = this.props.screenProps.appTheme;
        return (
            <View style={{flex: 1, backgroundColor: '#fafafa'}}>
                <StatusBar
                    animated={true}
                    backgroundColor={appTheme.darkColor}
                    barStyle="light-content"
                />

                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={() => {
                        this.props.navigation.navigate('Notification')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Icon
                                name='ios-notifications'
                                size={20}
                                color={appTheme.primaryColor}
                            />
                            <Text style={styles.itemLeftText}>{getChineseText('公告')}</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={() => {
                        this.props.navigation.navigate('Rankings')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Icon
                                name='ios-stats'
                                size={20}
                                color={appTheme.primaryColor}
                                // onPress={this._search.bind(this)}
                            />
                            <Text style={styles.itemLeftText}>{I18n.t('rankings')}</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Category')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Icon
                                name='md-funnel'
                                size={20}
                                color={appTheme.primaryColor}
                                // onPress={this._search.bind(this)}
                            />
                            <Text style={styles.itemLeftText}>{I18n.t('category')}</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                            // onPress={this._search.bind(this)}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={() => {
                        this.props.navigation.navigate('Setting')
                    }}>
                    <View style={styles.item}>
                        <View style={styles.itemLeft}>
                            <Icon
                                name='ios-settings'
                                size={20}
                                color={appTheme.primaryColor}
                            />
                            <Text style={styles.itemLeftText}>{I18n.t('setting')}</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={20}
                            color='#ddd'
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemLeftText: {
        paddingLeft: 10,
        fontSize: 16
    }
});

export default Explore