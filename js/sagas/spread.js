/**
 * @author Semper
 */
import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveSpread} from "../actions/spread";

export function* fetchSpread(params) {
    try {
        const {spreadUrl} = params;
        const spreadData = yield call(fetchJSON, spreadUrl);
        yield put(receiveSpread(spreadData))
    } catch (e) {
        console.log('detail fetchSpread:', e.message);

    }

}