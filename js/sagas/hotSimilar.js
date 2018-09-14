import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveHotSimilar} from "../actions/hotSimilar";

export function* fetchHotSimilar(params) {
    try {
        const {hotSimilarUrl} = params;
        let hotSimilarData = yield call(fetchJSON, hotSimilarUrl);
        yield put(receiveHotSimilar(hotSimilarData))
    } catch (e) {
        console.log('fetchHotSimilar:' + e.message)
    }

}