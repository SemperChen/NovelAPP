/**
 * @author Semper
 */
import {CLEAR_RANKING_DETAIL, RECEIVE_RANKING_DETAIL, REQUEST_RANKING_DETAIL} from "../constants/ActionTypes";

export function requestRankingDetail(rankingDetailUrl, rankingType) {
    return {
        type: REQUEST_RANKING_DETAIL,
        rankingDetailUrl,
        rankingType
    };
}

export function receiveRankingDetail(rankingDetailData,rankingType) {
    return {
        type: RECEIVE_RANKING_DETAIL,
        rankingDetailData,
        rankingType
    };
}

export function clearRankingDetailCache() {
    return {
        type: CLEAR_RANKING_DETAIL,
    };
}

