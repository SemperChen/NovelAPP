import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveCategory} from "../actions/category";

export function* fetchCategory(params) {
    try {
        const {categoryUrl} = params;
        let categoryData = yield call(fetchJSON, categoryUrl);
        yield put(receiveCategory(categoryData))
    } catch (e) {
        console.log('fetchCategory:' + e.message)
    }

}
