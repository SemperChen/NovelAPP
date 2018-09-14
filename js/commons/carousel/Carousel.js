/**
 * @author Semper
 */
import PropTypes from 'prop-types';
import React from "react";
import {FlatList, InteractionManager, StyleSheet, View} from "react-native";
import {WIDTH} from "../../utils/DimensionsUtil";
import Pagination from "./Pagination";

const VIEWABILITY_CONFIG = {
    viewAreaCoveragePercentThreshold: 80,//item80%部分可见才视为可见
};

class Carousel extends React.Component {

    constructor() {
        super();
        this.index = 1;
        this.isRendered = false;
        this.interval = 3000
    }

    startTimer = () => {
        this.clearTimer();
        this.timer = setInterval(() => {
            try {
                if (this.index === 0) {
                    this._listRef.scrollToIndex({animated: false, index: this.index});
                } else {
                    this._listRef.scrollToIndex({animated: true, index: this.index});
                }
            }catch (e){
                console.warn('Carousel startTimer func error',e.message)
            }

        }, this.interval)
    };

    clearTimer = () => {
        this.timer && clearInterval(this.timer);
    };

    render() {
        const {data,renderItem,showPagination,selectedDotColor,unSelectedDotColor} =this.props;
        return (
            <View style={styles.container}>

                <FlatList
                    ref={(ref) => {
                        this._listRef = ref
                    }}
                    data={data}
                    horizontal={true}
                    pagingEnabled={true}
                    getItemLayout={(data, index) => {
                        return {length: WIDTH, offset: WIDTH * index, index}
                    }}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => {
                        return index + ''
                    }}
                    onViewableItemsChanged={this._onViewableItemsChanged}
                    viewabilityConfig={VIEWABILITY_CONFIG}
                    showsHorizontalScrollIndicator={false}
                />
                {showPagination
                    ?
                    <Pagination
                        ref={(ref) => {
                            this.pagination = ref
                        }}
                        selectedDotColor={selectedDotColor}
                        unSelectedDotColor={unSelectedDotColor}
                        clickDot={this.clickDot}
                        data={data} index={this.index}/>
                    : null
                }

            </View>
        )
    }

    clickDot = (index) => {
        this.startTimer();
        this.pagination && this.pagination.unSelectStatusAnimation();
        this.index = index;
        try {
            this._listRef.scrollToIndex({animated: true, index: index});
        }catch (e){
            console.warn('Carousel clickDot func error',e.message)
        }
        InteractionManager.runAfterInteractions(() => {
            this.pagination && this.pagination.activeDot(this.index);
        });
    };

    _onViewableItemsChanged = (info) => {
        let items = info.viewableItems;
        let itemsLength = items.length;
        if (itemsLength === 1) {
            this.pagination && this.pagination.unSelectStatusAnimation();
            InteractionManager.runAfterInteractions(() => {
                this.index = items[0].index + 1;
                this.pagination && this.pagination.activeDot(this.index - 1);
                if (this.index === this.props.data.length) {
                    this.index = 0;
                }
                // this.startTimer();
                if (!this.isRendered) {
                    this.isRendered = true;
                    this.startTimer()
                }
            });

        }
    };

    componentWillUnmount() {
        this.clearTimer()
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

Carousel.propTypes = {
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    showPagination: PropTypes.bool,
    selectedDotColor: PropTypes.string,
    unSelectedDotColor: PropTypes.string
};

export default Carousel