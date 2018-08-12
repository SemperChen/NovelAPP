/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {loadBookmarks} from "../utils/BookmarkUtil";
import {receiveBookmarks} from "../actions/bookmarks";

export const fetchBookmarks = function* fetchBookmarks(params) {
    try {
        const {url} = params;
        const bookmarks = yield call(loadBookmarks, url);
        yield put(receiveBookmarks(url, bookmarks))
    } catch (e) {
        console.log('fetchBookmarks:' + e.message)
    }

}