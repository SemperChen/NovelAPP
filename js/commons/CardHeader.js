/**
 * @author Semper
 */
import React from "react";
import {IMG_MARGIN} from "../utils/DimensionsUtil";
import {Text, View} from "react-native";

class CardHeader extends React.Component {
    render() {
        return (
            <View style={{margin: IMG_MARGIN * 2, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{height: 12, width: 3, backgroundColor: this.props.tagColor, marginRight: 4}}/>
                <Text>{this.props.title}</Text>
            </View>
        )
    }
}

export default CardHeader