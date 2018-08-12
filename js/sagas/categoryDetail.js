import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveCategoryDetail} from "../actions/categoryDetail";

export function* fetchCategoryDetail(params) {
    try {
        const {categoryDetailUrl} = params;
        let categoryDetailData = yield call(fetchJSON, categoryDetailUrl);
        yield put(receiveCategoryDetail(categoryDetailData))
    } catch (e) {
        console.log('fetchCategoryDetail:' + e.message)
    }

}