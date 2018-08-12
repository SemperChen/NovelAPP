/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveDetail} from "../actions/detail";

export function* fetchBookDetail(params) {
    try {
        const {bookDetailUrl} = params;
        const bookDetail = yield call(fetchJSON, bookDetailUrl);
        yield put(receiveDetail(bookDetail, bookDetailUrl))
    } catch (e) {
        console.log('detail fetchBookDetail:', e.message);

    }

};
