/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const _dropRight = require('lodash/dropRight');

class StarScore extends React.Component {

    /*shouldComponentUpdate(nextProps) {
        return !this.props.score===nextProps.score
    }*/

    componentWillMount() {
        this.score = Math.floor(this.props.score / 2);
        this.halfCount = this.props.score % 2;
        this.star = [];
        this.starBorder = [];
        for (let i = 0; i < 5; i++) {
            if (i < this.score) {
                this.star.push(i)
            } else {
                this.starBorder.push(i);
            }
        }
        if (this.halfCount > 0) {
            this.starBorder = _dropRight(this.starBorder)
        }
    }

    render() {
        return (
            this.score ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {this.star.map((s) => {
                    return (
                        <MaterialIcons key={s} name="star" size={24} style={styles.bookStar}/>
                    )
                })}
                {
                    this.halfCount > 0 ? <MaterialIcons name="star-half" size={24} style={styles.bookStar}/> : null
                }
                {this.starBorder.map((s) => {
                    return (
                        <MaterialIcons key={s} name="star-border" size={24} style={styles.bookStar}/>
                    )
                })}
                <Text style={{marginLeft: 5}}>{this.props.score.toFixed(2)}分</Text>
            </View> : null
        )
    }
}

const styles = StyleSheet.create({
    bookStar: {
        color: '#f0ad4e',
        marginRight: 1
    }
});
export default StarScore