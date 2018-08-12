import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import AppReducer from '../reducers/index';
import {reactNavigationReduxMiddleware} from '../utils/redux';

const middlewares = [];
// const {logger} = require('redux-logger');

// configuring saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
middlewares.push(reactNavigationReduxMiddleware);

/* global __DEV__  */
if (__DEV__) {
    // middlewares.push(logger);
}else {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        debug: () => {},
        error: () => {},
    };
}

export default function configureStore() {

    return {
        ...createStore(AppReducer, applyMiddleware(...middlewares)),
        runSaga: sagaMiddleware.run
    };
}
