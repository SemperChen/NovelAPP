/**
 * @author Semper
 */
import {RECEIVE_RANKINGS, REQUEST_RANKINGS} from "../constants/ActionTypes";

export function requestRankings(rankingsUrl) {
    return {
        type: REQUEST_RANKINGS,
        rankingsUrl
    };
}

export function receiveRankings(rankingsData) {
    return {
        type: RECEIVE_RANKINGS,
        rankingsData,
    };
}
