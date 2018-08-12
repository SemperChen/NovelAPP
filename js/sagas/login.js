/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {receiveLogin} from "../actions/login";
import {fetchJSON} from "../utils/HttpUtil";
import {REQUEST_NET_FAILED} from "../constants/constants";

export function* login(params) {
    try {
        const {loginUrl} = params;
        const login = yield call(fetchJSON, loginUrl);
        yield put(receiveLogin(login))
    } catch (e) {
        yield put(receiveLogin(REQUEST_NET_FAILED));
        console.log('login:' + e.message)
    }
}