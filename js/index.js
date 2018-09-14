import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import AppWithNavigationState from './AppWithNavigationState';
import rootSaga from "./sagas/index";
import Orientation from "react-native-orientation";

//应用配置
import './commons/NovelAppConfig'
const store = configureStore();
store.runSaga(rootSaga);
global.globalBookNameParam = undefined;

export default class Root extends Component {
    componentWillMount() {
        Orientation.lockToPortrait()
    }
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
};
