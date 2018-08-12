import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveHotSearch} from "../actions/hotSearch";

export function* fetchHotSearch(params) {
    try {
        const {hotSearchUrl} = params;
        let hotSearchData = yield call(fetchJSON, hotSearchUrl);
        yield put(receiveHotSearch(hotSearchData))
    } catch (e) {
        console.log('fetchHotSearch:' + e.message)
    }

}