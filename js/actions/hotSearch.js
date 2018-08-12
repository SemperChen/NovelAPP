/**
 * @author Semper
 */
import {RECEIVE_HOT_SEARCH, REQUEST_HOT_SEARCH} from "../constants/ActionTypes";

export function requestHotSearch(hotSearchUrl) {
    return {
        type: REQUEST_HOT_SEARCH,
        hotSearchUrl
    };
}

export function receiveHotSearch(hotSearchData) {
    return {
        type: RECEIVE_HOT_SEARCH,
        hotSearchData,
    };
}
