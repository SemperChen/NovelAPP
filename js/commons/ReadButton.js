/**
 * @author Semper
 */
import PropTypes from 'prop-types';
import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {WIDTH} from "../utils/DimensionsUtil";

class ReadButton extends React.Component {
    render() {
        let width = WIDTH / 14 * 4;
        let height = width / 3.5;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={[
                    {
                        backgroundColor: this.props.backgroundColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: width,
                        height: height,
                        borderColor: this.props.borderColor || '#ccc'
                    },
                    this.props.style
                ]}
                onPress={this.props.onPress}>
                <Text style={{color: this.props.color}}>{this.props.title || 'Button'}</Text>
            </TouchableOpacity>
        )
    }
}

ReadButton.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string

};
export default ReadButton