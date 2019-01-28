/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, View} from "react-native";
import {IMG_MARGIN} from "../utils/DimensionsUtil";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import {connect} from "react-redux";
import BookItem from "./BookItem";
import I18n from "../i18n/i18n";

const _chunk = require('lodash/chunk');

class BestEndBooks extends React.Component {

    constructor() {
        super();
        this.books = [];
        this.data = [];
        this.state = {
            index: 0
        }
    }

    /**
     * 换一批
     */
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

    shouldComponentUpdate(nextProps,nextState){
        if (nextProps.bestEndData) {
            try{
                this.data = _chunk(nextProps.bestEndData.ranking.books, 4);
                if(this.data.length > 1 ){
                    if (nextState.index > this.data.length - 2) {
                        this.books = this.data[0];
                        this.setState({
                            index: 0
                        });
                    } else {
                        this.books = this.data[nextState.index];
                    }
                }

            }catch (e) {
                console.warn('BestEndBooks shouldComponentUpdate',e.message)
            }

        }
        return this.props.bestEndData !== nextProps.bestEndData||this.state.index !== nextState.index
    }

    render() {
        return (
            this.books&&this.books.length>0 ?
                <View style={styles.container}>
                    <CardHeader tagColor={this.props.appTheme.primaryColor} title={I18n.t('bestEnd')}/>
                    <View style={styles.cardContent}>
                        {this.books.map((item, index) => {
                            return (
                                <BookItem key={index} navToDetail={this.props.navToDetail} book={item}/>
                            )
                        })}
                    </View>
                    <CardFooter onPress={() => {
                        this.nextPage()
                    }}/>
                </View> : null
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    cardContent: {
        marginRight: IMG_MARGIN,
    },
});

function mapStateToProps(state) {
    const {bestEndData} = state.bestEnd;
    return {bestEndData}
}

export default connect(mapStateToProps)(BestEndBooks)