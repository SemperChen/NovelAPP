/**
 * @author Semper
 */
import {call, fork, put} from "redux-saga/effects";
import {searchBook} from "../utils/HttpUtil";
import {OTHER_SEARCH_URLS} from "../constants/api";
import {receiveOtherSearch} from "../actions/otherSearch";

function* fetchOtherSearchResult(searchData, bookName) {
    try {
        const otherSearchResult = yield call(searchBook, searchData.searchUrl + bookName);
        yield put(receiveOtherSearch(otherSearchResult, searchData.searchUrl, searchData.siteName))
    } catch (error) {
        console.log('fetchSearchResult:', error.message);
        // yield put(receiveSearch(null))
    }
};

export function* watchEverySearch(params) {
    for (let i = 0; i < OTHER_SEARCH_URLS.length; i++) {

        yield fork(fetchOtherSearchResult, OTHER_SEARCH_URLS[i], params.bookName)
    }
}
