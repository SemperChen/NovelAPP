/**
 * @author Semper
 */
import React from "react";
import {ActivityIndicator, View} from "react-native";

class Loading extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                <ActivityIndicator
                    animating={!!this.props.animating}
                    color="#aa3300"
                    style={[{height: 80}]}
                    size={this.props.size||'large'}
                />
            </View>

        )
    }
}

export default Loading;