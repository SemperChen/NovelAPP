/**
 * @author Semper
 */
import React from "react";
import {InteractionManager, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {requestCategory} from "../actions/category";
import {CATEGORY_LV2_URL} from "../constants/api";
import {WIDTH} from "../utils/DimensionsUtil";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";

const categoryItemWidth = WIDTH / 4;
const categoryItemHeight = categoryItemWidth / 2;
const categoryItemMargin = categoryItemWidth / 8;

class CategoryPage extends React.Component {

    static navigationOptions = ({screenProps}) => ({
        headerTitle: I18n.t('category'),
        headerStyle: {backgroundColor: screenProps.appTheme.primaryColor},
        headerTintColor: '#fff'
    });

    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(requestCategory(CATEGORY_LV2_URL));
        });
    }

    navToCategoryDetail = (item, gender) => {
        this.props.navigation.navigate('CategoryDetail', {item: item, gender: gender})
    };

    render() {
        if (this.props.categoryData) {
            this.male = this.props.categoryData.male;
            this.female = this.props.categoryData.female;
        }
        const appTheme = this.props.screenProps.appTheme;
        return (
            this.props.categoryData ?
                <ScrollView style={{backgroundColor: '#fff'}}>
                    <StatusBar
                        animated={true}
                        backgroundColor={appTheme.darkColor}
                        barStyle="light-content"
                    />
                    <Text style={styles.rankTag}>{I18n.t('femaleCat')}</Text>
                    <View style={styles.categoryContent}>
                        {this.female.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.navToCategoryDetail(item, 'female')
                                    }}
                                    key={index}
                                    style={styles.catItem}>
                                    <Text>{getChineseText(item.major)}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <Text style={styles.rankTag}>{I18n.t('maleCat')}</Text>
                    <View style={styles.categoryContent}>
                        {this.male.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.navToCategoryDetail(item, 'male')
                                    }}
                                    key={index}
                                    style={[styles.catItem, {backgroundColor: '#F5FCFF'}]}>
                                    <Text>{getChineseText(item.major)}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView> : null
        )
    }

    _renderItem = ({item}) => {
        return (
            <View style={{
                width: categoryItemWidth,
                height: categoryItemHeight,
                margin: categoryItemMargin,
                backgroundColor: '#eee'
            }}>
                <Text>{getChineseText(item.name)}</Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    rankTag: {
        color: '#999',
        // backgroundColor: '#F8F8F8',
        padding: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee'
    },
    categoryContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: categoryItemMargin
    },
    catItem: {
        width: categoryItemWidth,
        height: categoryItemHeight,
        margin: categoryItemMargin,
        backgroundColor: '#ffeeff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    }
});

function mapStateToProps(state) {
    const {categoryData} = state.category;
    return {categoryData}
}

export default connect(mapStateToProps)(CategoryPage)