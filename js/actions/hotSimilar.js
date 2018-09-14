/**
 * @author Semper
 */
import {RECEIVE_HOT_SIMILAR, REQUEST_HOT_SIMILAR} from "../constants/ActionTypes";

export function requestHotSimilar(hotSimilarUrl) {
    return {
        type: REQUEST_HOT_SIMILAR,
        hotSimilarUrl
    };
}

export function receiveHotSimilar(hotSimilarData) {
    return {
        type: RECEIVE_HOT_SIMILAR,
        hotSimilarData,
    };
}
