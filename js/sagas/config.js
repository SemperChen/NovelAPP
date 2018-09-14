/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {loadAppConfig} from "../utils/ConfigUtil";
import {receiveConfig} from "../actions/config";

export function* fetchConfig() {
    try {
        const config = yield call(loadAppConfig);
        yield put(receiveConfig(config))
    } catch (e) {
        console.log('fetchConfig:' + e.message)
    }
}