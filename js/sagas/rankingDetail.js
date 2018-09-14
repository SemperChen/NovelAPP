import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveRankingDetail} from "../actions/rankingDetail";

export function* fetchRankingDetail(params) {
    try {
        const {rankingDetailUrl, rankingType} = params;
        let rankingDetailData = yield call(fetchJSON, rankingDetailUrl);
        yield put(receiveRankingDetail(rankingDetailData, rankingType))
    } catch (e) {
        console.log('fetchRankingDetail:' + e.message)
    }

}
