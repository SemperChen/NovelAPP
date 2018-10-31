/**
 * @author Semper
 */
import React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Carousel from "./carousel/Carousel";
import {WIDTH} from "../utils/DimensionsUtil";
import {connect} from "react-redux";
import {SpreadData} from "../model/SpreadData";
import {Spread} from "../model/Spread";

class ImageCarousel extends React.Component {
    spreadData: SpreadData;

    constructor() {
        super();
        this.data = [];
    }

    render() {
        if (this.props.spreadData) {
            this.spreadData = this.props.spreadData;
            this.data = this.spreadData.data;
            // console.log('ImageCarousel spreadData', this.spreadData)
        }
        return (
            this.props.spreadData ?
                <View style={styles.container}>
                    <Carousel renderItem={this._renderItem} data={this.data} showPagination={true}
                              selectedDotColor={this.props.appTheme.primaryColor}
                              unSelectedDotColor='#ddd'/>
                </View> : <Text style={{alignSelf: 'center'}}>下拉刷新</Text>
        )
    }

    _renderItem = (info: {
        item: Spread,
        index: number
    }) => {
        return (
            <TouchableHighlight
                onPress={() => {
                    this.props.navToDetail(info.item.link)
                }}
                style={styles.item}
                underlayColor='#fff'
            >
                <Image resizeMode='cover' source={{uri: info.item.img}}
                       style={{width: WIDTH, height: WIDTH / 3}}/>
            </TouchableHighlight>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: -2
    },
    cardContent: {
        // margin: IMG_MARGIN,
    },
    item: {
        marginTop: -2,
        alignItems: 'center',
        justifyContent: 'center',
        width: WIDTH
    }
});

function mapStateToProps(state) {
    const {spreadData} = state.spread;
    return {spreadData}
}

export default connect(mapStateToProps)(ImageCarousel)