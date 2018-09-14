/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, View} from "react-native";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import {connect} from "react-redux";
import Carousel from "./carousel/Carousel";
import {IMG_MARGIN, WIDTH} from "../utils/DimensionsUtil";
import BookItem from "./BookItem";
import I18n from "../i18n/i18n";

const _chunk = require('lodash/chunk');

class EditorRecommend extends React.Component {

    constructor() {
        super();
        this.books = [];
        this.data = [];
        this.state = {
            index: 0
        }
    }

    nextPage = () => {
        if (this.state.index > this.data.length - 3) {
            this.setState({
                index: 0
            })
        } else {
            this.setState((prevState) => ({
                index: prevState.index + 1
            }))
        }
    };

    render() {
        if (this.props.editorRecData) {
            this.data = _chunk(this.props.editorRecData.ranking.books, 5);
            this.books = this.data[this.state.index];
            // console.log('EditorRecommend', this.data)
        }
        const appTheme = this.props.appTheme;
        return (
            this.props.editorRecData ?
                <View style={styles.container}>
                    <CardHeader tagColor={appTheme.primaryColor} title={I18n.t('editorRec')}/>
                    <Carousel renderItem={this._renderItem} data={this.books} showPagination={true}
                              selectedDotColor={appTheme.primaryColor}
                              unSelectedDotColor='#ddd'/>
                    <CardFooter onPress={() => {
                        this.nextPage()
                    }}/>
                </View> : null
        )
    }

    _renderItem = ({item}) => {
        return (
            <BookItem navToDetail={this.props.navToDetail} book={item}/>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    cardContent: {
        width: WIDTH,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee',
        flexDirection: 'row',
        padding: IMG_MARGIN
    }
});

function mapStateToProps(state) {
    const {editorRecData} = state.editorRec;
    return {editorRecData}
}

export default connect(mapStateToProps)(EditorRecommend)