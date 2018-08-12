import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveHotRec} from "../actions/hotRec";

export function* fetchHotRec(params) {
    try {
        const {hotRecUrl} = params;
        let hotRecData = yield call(fetchJSON, hotRecUrl);
        yield put(receiveHotRec(hotRecData))
    } catch (e) {
        console.log('fetchHotRec:' + e.message)
    }

}