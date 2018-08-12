import {receiveRankings} from "../actions/rankings";
import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";

export const fetchRankings = function* fetchRankings(params) {
    try {
        const {rankingsUrl} = params;
        let rankingsData = yield call(fetchJSON, rankingsUrl);
        yield put(receiveRankings(rankingsData))
    } catch (e) {
        console.log('fetchRankings:' + e.message)
    }

};