import {fetchBookmarks} from "./bookmarks";
import {fetchSearchResult} from "./search";
import {fetchCatalog} from "./catalog";
import {fetchBookDetail} from "./detail";
import {fetchSpread} from "./spread";
import {fetchRankings} from "./rankings";
import {fetchHotRec} from "./hotRec";
import {fetchBestEnd} from "./bestEnd";
import {fetchEditorRec} from "./editorRec";
import {fetchRankingDetail} from "./rankingDetail";
import {fetchCategory} from "./category";
import {fetchBookContent} from "./read";
import {fetchCategoryDetail} from "./categoryDetail";
import {fetchConfig} from "./config";
import {fetchGuessYouLike} from "./gussYouLike";
import {fetchHotSearch} from "./hotSearch";
import {watchEverySearch} from "./otherSearch";
import {fetchHotSimilar} from "./hotSimilar";
import {fetchNotification} from "./notification";
import {login} from "./login";
import {
    REQUEST_APP_CONFIG,
    REQUEST_ARTICLE,
    REQUEST_BEST_END,
    REQUEST_BOOKMARKS,
    REQUEST_CATALOG,
    REQUEST_CATEGORY,
    REQUEST_CATEGORY_DETAIL,
    REQUEST_DETAIL,
    REQUEST_EDITOR_REC,
    REQUEST_GUESS_YOU_LIKE,
    REQUEST_HOT_REC,
    REQUEST_HOT_SEARCH,
    REQUEST_HOT_SIMILAR,
    REQUEST_LOGIN,
    REQUEST_NOTIFICATION,
    REQUEST_OTHER_SEARCH,
    REQUEST_RANKING_DETAIL,
    REQUEST_RANKINGS,
    REQUEST_SEARCH,
    REQUEST_SPREAD
} from '../constants/ActionTypes';
import {takeLatestFetch} from '../utils/takeLatestFetch';
import {all} from "redux-saga/effects";

const rootSaga = function* root() {
    yield all([
        takeLatestFetch(REQUEST_BOOKMARKS,fetchBookmarks),
        takeLatestFetch(REQUEST_SEARCH,fetchSearchResult),
        takeLatestFetch(REQUEST_ARTICLE,fetchBookContent),
        takeLatestFetch(REQUEST_CATALOG,fetchCatalog),
        takeLatestFetch(REQUEST_DETAIL,fetchBookDetail),
        takeLatestFetch(REQUEST_RANKINGS,fetchRankings),
        takeLatestFetch(REQUEST_SPREAD,fetchSpread),
        takeLatestFetch(REQUEST_HOT_REC,fetchHotRec),
        takeLatestFetch(REQUEST_BEST_END,fetchBestEnd),
        takeLatestFetch(REQUEST_EDITOR_REC,fetchEditorRec),
        takeLatestFetch(REQUEST_RANKING_DETAIL,fetchRankingDetail),
        takeLatestFetch(REQUEST_CATEGORY,fetchCategory),
        takeLatestFetch(REQUEST_CATEGORY_DETAIL,fetchCategoryDetail),
        takeLatestFetch(REQUEST_APP_CONFIG,fetchConfig),
        takeLatestFetch(REQUEST_GUESS_YOU_LIKE,fetchGuessYouLike),
        takeLatestFetch(REQUEST_HOT_SEARCH,fetchHotSearch),
        takeLatestFetch(REQUEST_OTHER_SEARCH,watchEverySearch),
        takeLatestFetch(REQUEST_HOT_SIMILAR,fetchHotSimilar),
        takeLatestFetch(REQUEST_NOTIFICATION,fetchNotification),
        takeLatestFetch(REQUEST_LOGIN,login),
    ])
};
export default rootSaga;