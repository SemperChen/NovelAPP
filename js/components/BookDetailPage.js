/**
 * @author Semper
 */
import React from "react";
import {ScrollView, StatusBar, View} from "react-native";
import {ZSSQ_IMG_URL, ZSSQ_NAME} from "../constants/api";
import HotSimilar from "../commons/HotSimilar";
import I18n from "../i18n/i18n";
import MainDetail from "../commons/MainDetail";
import {NavigationActions, StackActions} from "react-navigation";

class BookDetailPage extends React.Component {

    static navigationOptions = ({screenProps}) => {
        return {
            headerTitle: I18n.t('detail'),
            headerStyle: {elevation: 0, backgroundColor: screenProps.appTheme.primaryColor},
            headerTintColor: '#fff'
        }
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.params = this.props.navigation.state.params;
    }

    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.screenProps.appTheme.darkColor);
    }

    componentWillUpdate() {
    }

    _navToSearch = () => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'App'}),
                NavigationActions.navigate({routeName: 'Search'})
            ]
        }))

    };

    _navToReader = (bookmark, bookDetail) => {
        if (bookmark) {
            this.props.navigation.navigate('Read', {bookmark: bookmark})
        } else {
            this.props.navigation.navigate('Read', {
                siteName: ZSSQ_NAME,
                bookId: bookDetail._id,
                bookName: bookDetail.title,
                image: ZSSQ_IMG_URL + bookDetail.cover
            })
        }

    };

    scrollToTop = () => {
        this.scrollView.scrollTo({x: 0, y: 0, animated: true})
    };

    render() {
        const appTheme = this.props.screenProps.appTheme;
        return (
            <ScrollView
                ref={(ref) => {
                    this.scrollView = ref
                }}
                showsVerticalScrollIndicator={false}>
                <View>
                    <MainDetail
                        appTheme={appTheme}
                        params={this.params}
                        navToReader={this._navToReader}
                        navToSearch={this._navToSearch}
                    />
                    <HotSimilar
                        scrollToTop={this.scrollToTop}
                        appTheme={appTheme}
                    />
                </View>

            </ScrollView>
        )
    }

}

export default BookDetailPage
