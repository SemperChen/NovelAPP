import React from "react";
import {Button, Linking, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {getNotification} from "../utils/ParseHtmlUtil";
import {getChineseText} from "../utils/LanguageUtil";
import {requestNotification} from "../actions/notification";
import {notificationUrl} from "../constants/api";
import {WIDTH} from "../utils/DimensionsUtil";

class NotificationPage extends React.Component {

    static navigationOptions = ({screenProps}) => {
        return {
            headerTitle: getChineseText('公告'),
            headerStyle: {elevation: 0, backgroundColor: screenProps.appTheme.primaryColor},
            headerTintColor: '#fff'
        }
    };

    componentDidMount() {
        this.props.dispatch(requestNotification(notificationUrl))
    }

    render() {
        const {appTheme} = this.props.screenProps;

        if (this.props.notificationData) {
            this.notification = getNotification(this.props.notificationData);
            try {
                this.title = this.notification.title;
                this.time = this.notification.time;
                this.content = this.notification.content;
                this.button = this.notification.button;
                this.url = this.notification.url
            } catch (e) {
                console.log('Notification render func', e.message)
            }
        }
        return (
            <View style={styles.container}>
                {
                    this.props.notificationData
                        ?
                        <View style={styles.item}>
                            <View style={styles.itemContent}>
                                <View style={[styles.itemHeader, {backgroundColor: appTheme.lightColor}]}>
                                    <Text style={styles.itemTitle}>{getChineseText(this.title)}</Text>
                                    <Text style={styles.itemTime}>{getChineseText(this.time)}</Text>
                                </View>
                                <View style={styles.itemMainContent}>
                                    <Text style={{marginBottom: 150}}>{getChineseText(this.content)}</Text>
                                    {this.url !== '' && this.url !== null && this.url !== undefined
                                        ?
                                        <Button
                                            title={getChineseText(this.button || '前往')}
                                            color={appTheme.lightColor}
                                            onPress={() => {
                                                try {
                                                    Linking.openURL(this.notification.url)
                                                        .catch(err => console.error('An error occurred', err));
                                                } catch (e) {
                                                    console.log('NotificationPage render func', e.message)
                                                }
                                            }}
                                        />
                                        :
                                        null
                                    }
                                </View>
                            </View>
                        </View>
                        : null
                }

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginTop: 20
    },
    itemContent: {
        width: WIDTH - 40
    },
    itemHeader: {
        width: WIDTH - 40,
        justifyContent: 'center',
        paddingLeft: 10
    },
    itemTitle: {
        color: '#fff',
        marginTop: 15,
        fontSize: 18
    },
    itemTime: {
        color: '#eee',
        marginBottom: 15,
        marginTop: 20
    },
    itemMainContent: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#EEE',
        padding: 20,
        justifyContent: 'space-between',
    }

});

function mapStateToProps(state) {
    const {notificationData} = state.notification;
    return {notificationData}
}

export default connect(mapStateToProps)(NotificationPage)