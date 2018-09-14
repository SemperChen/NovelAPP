/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableHighlight} from "react-native";
import I18n from "../i18n/i18n";

class CardFooter extends React.Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor="#fff"
                onPress={this.props.onPress}
                style={{
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderColor: '#eee'
                }}>
                <Text>{I18n.t('nextPage')}</Text>
            </TouchableHighlight>
        )
    }
}

export default CardFooter