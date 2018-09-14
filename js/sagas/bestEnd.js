import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveBestEnd} from "../actions/bestEnd";

export function* fetchBestEnd(params) {
    try {
        const {bestEndUrl} = params;
        let bestEndData = yield call(fetchJSON, bestEndUrl);
        yield put(receiveBestEnd(bestEndData))

    } catch (e) {
        console.log('fetchBestEnd:' + e.message)
    }

}
