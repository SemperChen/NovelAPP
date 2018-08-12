/**
 * @author Semper
 */
import React from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import ShadowImage from "./ShadowImage";
import {ZSSQ_IMG_URL} from "../constants/api";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {IMG_MARGIN, WIDTH} from "../utils/DimensionsUtil";
import I18n from "../i18n/i18n";
import {getChineseText} from "../utils/LanguageUtil";

class BookItem extends React.Component {
    render() {
        let {book} = this.props;
        return (
            <TouchableHighlight underlayColor="#fff" onPress={() => {
                this.props.navToDetail(book._id)
            }}>
                <View style={styles.cardContent}>
                    <ShadowImage source={{uri: ZSSQ_IMG_URL + book.cover}}/>
                    <View style={styles.textInfo}>
                        <Text style={styles.title}>{getChineseText(book.title)}</Text>
                        <Text style={styles.info}
                              numberOfLines={2}>{getChineseText(book.shortIntro)}</Text>
                        <View style={styles.authorContent}>
                            <MaterialIcons name="account-circle" size={16}
                                           style={styles.authorIcon}/>
                            <Text style={styles.author}>{getChineseText(book.author)}</Text>
                        </View>
                        <Text style={styles.latelyFollower}>{book.latelyFollower}{I18n.t('latelyFollower')}</Text>
                    </View>
                </View>

            </TouchableHighlight>
        )
    }
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
        padding: IMG_MARGIN,
        alignItems: 'center'
    },
    textInfo: {
        flex: 1,
        justifyContent: 'space-around',
        padding: IMG_MARGIN,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2
    },
    info: {
        color: '#99979c',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 2
    },
    authorContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorIcon: {
        color: '#ddd',
        marginRight: 3
    },
    author: {
        color: '#99979c',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 2
    },
    latelyFollower: {
        color: '#99979c',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 2
    }
});
export default BookItem