/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {fetchBookContentGBKText, fetchHtml, fetchJSON} from "../utils/HttpUtil";
import {receiveArticle} from "../actions/read";
import {RECEIVE_TYPE, REQUEST_ARTICLE_FAILED} from "../constants/constants";

export function* fetchBookContent(params) {
    const {articleUrl, receiveType} = params;
    try {
        let article;
        switch (receiveType) {
            case RECEIVE_TYPE.JSON:
                article = yield call(fetchJSON, articleUrl);
                break;
            case RECEIVE_TYPE.TEXT:
                article = yield call(fetchHtml, articleUrl);
                break;
            case RECEIVE_TYPE.GBKTEXT:
                article = yield call(fetchBookContentGBKText, articleUrl);
                break
        }
        yield put(receiveArticle(article, articleUrl))
    } catch (e) {
        yield put(receiveArticle(REQUEST_ARTICLE_FAILED, articleUrl));
        console.log('fetchBookContent:', e.message)
    }

}
