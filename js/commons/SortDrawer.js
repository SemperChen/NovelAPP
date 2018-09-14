/**
 * @author Semper
 */
import PropTypes from 'prop-types';
import React from "react";
import {Animated, InteractionManager, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {cateItemHeight, cateItemMargin, cateItemWidth, filterWidth, HEIGHT} from "../utils/DimensionsUtil";
import {createAnimation} from "../utils/AnimatedUtil";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";

class SortDrawer extends React.Component {

    constructor() {
        super();
        this.animatedValue = new Animated.Value(-filterWidth);
        this.isOpen = false;
        this.state = {
            currentCateIndex: 0,
            currentOtherIndex: 0
        }
    }

    openFilterDrawer() {
        createAnimation(this.animatedValue, 0, 200).start();
    }

    closeFilterDrawer() {
        createAnimation(this.animatedValue, -filterWidth, 200).start();
    }

    _selectCategory = (index) => {
        this.setState({
            currentCateIndex: index
        })
    };

    _selectOtherType = (index) => {
        this.setState({
            currentOtherIndex: index
        })
    };

    shouldComponentUpdate(nextProps,nextState) {
        return this.props.category !== nextProps.category||
            this.props.otherTypes !== nextProps.otherTypes||
            this.props.appTheme !== nextProps.appTheme||
            this.state.currentCateIndex !== nextState.currentCateIndex||
            this.state.currentOtherIndex !== nextState.currentOtherIndex

    }

    render() {
        const appTheme = this.props.appTheme;
        return (
            <Animated.View style={{
                width: filterWidth,
                height: HEIGHT,
                backgroundColor: '#ffffff',
                position: 'absolute',
                right: this.animatedValue,
                elevation: 5,
                // marginLeft:10
            }}>
                <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#eee'}}>
                    <Text style={{
                        marginTop: cateItemMargin * 2,
                        marginLeft: cateItemMargin * 2
                    }}>{I18n.t('categoryLV2')}</Text>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: cateItemMargin}}>
                        {this.props.category && this.props.category.map((m, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        this._selectCategory(index);
                                        this.cat = m
                                    }}
                                    style={[styles.cateItem,
                                        this.state.currentCateIndex === index
                                            ?
                                            {borderColor: appTheme.primaryColor}
                                            :
                                            styles.unSelectedItem]}>
                                    <Text
                                        style={[styles.unSelectedText,
                                            this.state.currentCateIndex === index
                                                ?
                                                [styles.selectedText, appTheme.styles.primaryColor]
                                                :
                                                styles.unSelectedText]}>{getChineseText(m)}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
                <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#eee'}}>
                    <Text style={{
                        marginTop: cateItemMargin * 2,
                        marginLeft: cateItemMargin * 2
                    }}>{getChineseText('其他')}</Text>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: cateItemMargin}}>
                        {this.props.otherTypes && this.props.otherTypes.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        this._selectOtherType(index);
                                        this.type = item.type;
                                    }}
                                    style={[styles.cateItem, this.state.currentOtherIndex === index
                                        ?
                                        {borderColor: appTheme.primaryColor}
                                        :
                                        styles.unSelectedItem]}>
                                    <Text
                                        style={[styles.unSelectedText,
                                            this.state.currentOtherIndex === index
                                                ?
                                                [styles.selectedText, appTheme.styles.primaryColor]
                                                :
                                                styles.unSelectedText]}>{getChineseText(item.title)}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.confirmContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.toggleFilter();
                            InteractionManager.runAfterInteractions(() => {
                                this.props.clearBookData();
                                this.props.setTypeAndCat(this.type, this.cat);
                                this.props.fetchCategoryDetail(this.type, this.cat);
                            });
                        }}
                        style={[styles.confirm, appTheme.styles.primaryBgColor]}>
                        <Text style={{color: '#fff'}}>{I18n.t('confirm')}</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    cateItem: {
        width: cateItemWidth,
        height: cateItemHeight,
        margin: cateItemMargin,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    unSelectedItem: {
        // borderWidth:StyleSheet.hairlineWidth,
        borderColor: '#FFFFFF',
    },
    selectedItem: {
        // borderWidth:StyleSheet.hairlineWidth,
        borderColor: '#ec407a',
    },
    selectedText: {
        fontWeight: 'bold',
        color: '#ec407a'
    },
    unSelectedText: {
        fontSize: 10
    },
    confirm: {
        width: filterWidth - 10,
        borderRadius: 3,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ec407a'
    },
    confirmContainer: {
        width: filterWidth,
        alignItems: 'center',
        marginTop: 20
    }
});

SortDrawer.propTypes = {
    toggleFilter: PropTypes.func,
    fetchCategoryDetail: PropTypes.func,
    clearBookData: PropTypes.func,
    category: PropTypes.array,
    otherTypes: PropTypes.array,
    appTheme: PropTypes.object,
};

export default SortDrawer