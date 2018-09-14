import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Bookcase from "../components/Bookcase";
import Bookstore from "../components/Bookstore";
import Search from "../components/Search";
import ReadPage from "../components/ReadPage";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {Animated, Easing} from "react-native";
import BookDetailPage from "../components/BookDetailPage";
import CatalogPage from "../components/CatalogPage";
import Explore from "../components/Explore";
import RankingsPage from "../components/RankingsPage";
import WeekRanking from "../components/WeekRanking";
import MonthRanking from "../components/MonthRanking";
import TotalRanking from "../components/TotalRanking";
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

const TabContainer = TabNavigator(
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

const RankingTab = TabNavigator(
    {
        WeekRanking: {screen: WeekRanking},
        MonthRanking: {screen: MonthRanking},
        TotalRanking: {screen: TotalRanking}
    },
    {
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
        tabBarPosition: 'top',
        tabBarOptions: {
            /*activeTintColor: '#ec407a',
            inactiveTintColor: '#ff77a9',*/
            showLabel: true,
            labelStyle: {
                margin: 0,
                fontSize: 12,
            },
            style: {
                backgroundColor: '#fff',
            },
            indicatorStyle: {},
            iconStyle: {},
            tabStyle: {
                height: 32,
                margin: 0,
                padding: 0
            }
        }
    }
);
/**
 * 路由配置中心
 */
const AppNavigator = StackNavigator({
    Welcome: {screen: WelcomePage},
    User: {screen: UserPage},
    SelectSex: {screen: SelectSexPage},
    App: {screen: TabContainer, navigationOptions: {headerTitle: I18n.t('magicalBookstore'), headerTintColor: '#fff'}},
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
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        transitionSpec: {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            timing: Animated.timing,
        },
    })
});

export default AppNavigator;





