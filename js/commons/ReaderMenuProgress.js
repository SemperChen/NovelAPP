/**
 * @author Semper
 */
import React from "react";
import {Slider, Text, View} from "react-native";
import {WIDTH} from "../utils/DimensionsUtil";

class ReaderMenuProgress extends React.Component {

    constructor() {
        super();
        this.readProgressBottom = 55;
        this.state = {
            chapterName: '',
            currentChapterNum: 0
        }
    }

    open() {
        this.readerProgress.setNativeProps({
            style: {
                bottom: this.readProgressBottom,
                left: 0
            }
        });
    }

    close() {
        this.readerProgress.setNativeProps({
            style: {
                bottom: this.readProgressBottom,
                left: WIDTH
            }
        });
    }

    _setCurrentArticle = (article) => {
        try {
            this.setState({chapterName: article.chapterName, currentChapterNum: article.currentChapterNum})
        } catch (e) {
            console.warn('ReaderMenuProgress _setCurrentArticle')
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.styles !== nextProps.styles ||
            this.props.catalogDataLength !== nextProps.catalogDataLength ||
            this.state.chapterName !== nextState.chapterName ||
            this.state.currentChapterNum !== nextState.currentChapterNum
    }

    render() {
        const {styles} = this.props;
        return (
            <View ref={(ref) => {
                this.readerProgress = ref
            }} style={{
                left: WIDTH,
                bottom: this.readProgressBottom,
                position: 'absolute',
            }}>
                <View style={styles.readerSet}>
                    <View style={[styles.readerSetItem, {paddingRight: 12, paddingLeft: 12, justifyContent: 'center'}]}>
                        {/*<MaterialIcons name="chevron-left" size={24}
                                       style={styles.menuIcon}/>*/}
                        {this.state.chapterName ?
                            <Text style={{color: '#fff'}}>{this.state.chapterName}</Text> : null
                        }
                        {/*<MaterialIcons name="chevron-right" size={24}
                                       style={styles.menuIcon}/>*/}

                    </View>
                    <View style={[styles.readerSetItem, {paddingRight: 12, paddingLeft: 12}]}>
                        <Slider
                            onValueChange={() => {
                            }}
                            onSlidingComplete={(value) => {
                                this.props.fetchArticleByCatalog(value)
                            }}
                            value={this.state.currentChapterNum}
                            minimumValue={0}
                            step={1}
                            maximumValue={this.props.catalogDataLength - 1}
                            style={styles.slider}
                            maximumTrackTintColor="gainsboro"
                            minimumTrackTintColor="deeppink"
                            thumbTintColor="deeppink"/>
                    </View>

                </View>
            </View>
        )
    }
}

export default ReaderMenuProgress