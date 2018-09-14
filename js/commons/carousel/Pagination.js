/**
 * @author Semper
 */
import PropTypes from 'prop-types';
import React from "react";
import {Animated, StyleSheet, TouchableHighlight, View} from "react-native";
import {WIDTH} from "../../utils/DimensionsUtil";
import {createAnimation} from "../../utils/AnimatedUtil";

class Pagination extends React.Component {

    constructor() {
        super();
        this.animatedValue = new Animated.Value(5);
        this.state = {
            index: 0
        }
    }

    selectStatusAnimation = () => {
        createAnimation(this.animatedValue, 8, 200).start();
    };

    unSelectStatusAnimation = () => {
        createAnimation(this.animatedValue, 5, 200).start();
    };

    activeDot = (index) => {
        this.animatedValue = new Animated.Value(5);
        this.selectStatusAnimation();
        this.setState({
            index: index
        });
    };

    render() {
        const {data,clickDot,selectedDotColor,unSelectedDotColor} = this.props;
        return (
            <View style={styles.container}>
                {data.map((a, index) => {
                    return (
                        <TouchableHighlight
                            onPress={() => {
                                clickDot(index)
                            }}
                            underlayColor='#fff'
                            key={index}
                            style={styles.button}>
                            <Animated.View
                                style={this.state.index === index
                                    ?
                                    [styles.selected, {
                                        width: this.animatedValue,
                                        height: this.animatedValue
                                    }, selectedDotColor ? {backgroundColor: selectedDotColor} : null]
                                    :
                                    [styles.unSelected, unSelectedDotColor ? {backgroundColor: unSelectedDotColor} : null]}/>
                        </TouchableHighlight>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: WIDTH / 5 * 2
    },
    selected: {
        borderRadius: 5,
        backgroundColor: '#262626',
    },
    unSelected: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#ddd',
    },
    button: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

Pagination.propTypes = {
    clickDot: PropTypes.func,
    data: PropTypes.array.isRequired,
    selectedDotColor: PropTypes.string,
    unSelectedDotColor: PropTypes.string
};

export default Pagination