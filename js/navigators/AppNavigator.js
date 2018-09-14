import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Bookcase from "../components/Bookcase";
import Bookstore from "../components/Bookstore";
import Search from "../components/Search";
import ReadPage from "../components/ReadPage";
// import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import {Animated, Easing, TouchableOpacity} from "react-native";
import BookDetailPage from "../components/BookDetailPage";
import CatalogPage from "../components/CatalogPage";
import Explore from "../components/Explore";
import RankingsPage from "../components/RankingsPage";
import CategoryPage from "../components/CategoryPage";
import CategoryDetailPage from "../components/CategoryDetailPage";
import SettingPage from "../components/SettingPage";
import WelcomePage from "../components/WelcomePage";
import SelectSexPage from "../components/SelectSexPage";
import RankingDetailPage from "../components/RankingDetailPage";
import CommonRankingDetail from "../components/CommonRankingDetail";
import I18n from '../i18n/i18n';
import NotificationPage from "../components/NotificationPage";
import WebReadPage from "../components/WebReadPage";
import UserPage from "../components/UserPage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TabContainer = createBottomTabNavigator(
    {
        Bookcase: {screen: Bookcase},
        Bookstore: {screen: Bookstore},
        Explore: {screen: Explore}

    },
    {
        animationEnabled: false,
        swipeEnabled: false,
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            /*activeTintColor: 'deeppink',
            inactiveTintColor: 'violet',*/
            showIcon: true,
            showLabel: true,
            labelStyle: {
                marginTop: 0,
                fontSize: 12,
            },
            style: {
                backgroundColor: '#fff',
            },
            indicatorStyle: {
                opacity: 0,
            },
            iconStyle: {},
            tabStyle: {
                height: 48,
                margin: 0,
                padding: 0,
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
    }
);

/**
 * 路由配置中心
 */
const AppNavigator = createStackNavigator({
    Welcome: {screen: WelcomePage},
    User: {screen: UserPage},
    SelectSex: {screen: SelectSexPage},
    App: {screen: TabContainer, navigationOptions: ({navigation, screenProps}) => ({
            headerRight: (
                <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() => {
                        navigation.navigate('Search')
                    }}>
                    <MaterialIcons name="search" size={28} style={{color: '#fff'}}/>
                </TouchableOpacity>),
            headerLeft: (
                <TouchableOpacity
                    style={{padding: 5,marginLeft:5}}
                    onPress={() => {
                        navigation.navigate('User')
                    }}>
                    <MaterialIcons name="person" size={28} style={{color: '#fff'}}/>
                </TouchableOpacity>
            ),
            headerStyle: {backgroundColor: screenProps.appTheme.primaryColor},
            headerTitle: I18n.t('magicalBookstore'),
            headerTintColor: '#fff'
        })},
    Search: {screen: Search},
    Read: {screen: ReadPage},
    WebRead: {screen: WebReadPage},
    BookDetail: {screen: BookDetailPage, navigationOptions: {headerTitle: I18n.t('detail')}},
    Catalog: {screen: CatalogPage},
    Rankings: {screen: RankingsPage},
    Ranking: {screen: RankingDetailPage},
    WeekRankingPage: {screen: CommonRankingDetail},
    Category: {screen: CategoryPage, navigationOptions: {headerTitle: I18n.t('category')}},
    CategoryDetail: {screen: CategoryDetailPage},
    Setting: {screen: SettingPage},
    Notification: {screen: NotificationPage}
}, {
    cardStyle: {
        // backgroundColor: '#F5FCFF',
        backgroundColor: '#fafafa',
    },
    /*transitionConfig: () => ({
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        transitionSpec: {
            duration: 360,
            easing: Easing.inOut(Easing.ease),
            timing: Animated.timing,
        },
    }),*/
    /*transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const height = layout.initHeight;
            const translateY = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [height, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });

            return { opacity, transform: [{ translateY }] };
        },
    }),*/
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });

            return { opacity, transform: [{ translateX }] };
        },
    }),
});

export default AppNavigator;





