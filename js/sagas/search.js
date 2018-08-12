/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveSearch} from "../actions/search";
import {ZSSQ_SEARCH} from "../constants/api";

export const fetchSearchResult = function* fetchSearchResult(params) {
    try {
        const {searchUrl} = params;
        const searchResult = yield call(fetchJSON, searchUrl);

        yield put(receiveSearch(searchResult, ZSSQ_SEARCH))
    } catch (error) {
        console.log('fetchSearchResult:', error.message);
        // yield put(receiveSearch(null))
    }
}