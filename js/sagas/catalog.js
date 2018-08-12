/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {fetchBookContentGBKText, fetchHtml, fetchJSON} from "../utils/HttpUtil";
import {receiveCatalog} from "../actions/catalog";
import {RECEIVE_TYPE, REQUEST_CATALOG_FAILED} from "../constants/constants";

export function* fetchCatalog(params) {
    const {url, receiveType} = params;
    try {
        let catalogData;
        switch (receiveType) {
            case RECEIVE_TYPE.JSON:
                catalogData = yield call(fetchJSON, url);
                break;
            case RECEIVE_TYPE.TEXT:
                catalogData = yield call(fetchHtml, url);
                break;
            case RECEIVE_TYPE.GBKTEXT:
                catalogData = yield call(fetchBookContentGBKText, url);
                break
        }
        yield put(receiveCatalog(url, catalogData))
    } catch (e) {
        yield put(receiveCatalog(url, REQUEST_CATALOG_FAILED));
        console.log('fetchCatalog func:' + e.message)
    }

}
