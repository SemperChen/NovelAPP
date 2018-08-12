/**
 * @author Semper
 */
import React from "react";
import {Animated, Text, TouchableOpacity, View} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createAnimation} from "../utils/AnimatedUtil";
import I18n from "../i18n/i18n";

class ReaderMenuHeader extends React.Component {

    constructor() {
        super();
        this.animatedValue = new Animated.Value(-55);
    }

    openMenuHeader() {
        createAnimation(this.animatedValue, 0).start();
    }

    closeMenuHeader() {
        createAnimation(this.animatedValue, -55).start();
    }

    shouldComponentUpdate(nextProps) {
        // console.log('ReaderMenuHeader shouldComponentUpdate');
        return this.props.saveBookmark !== nextProps.saveBookmark
    }

    render() {
        return (
            <Animated.View style={{top: this.animatedValue, position: 'absolute'}}>
                <View
                    style={[...this.props.style, {justifyContent: 'space-between', paddingRight: 20, paddingLeft: 10}]}>
                    <View>
                        <MaterialIcons name="navigate-before" size={32} style={{color: '#fff'}} onPress={() => {
                            this.props.showIsSaveBookcase()
                        }}/>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navToSearch()
                        }}
                    >
                        <Text style={{color: '#fff'}}>{I18n.t('changeBookOrigin')}</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}

export default ReaderMenuHeader