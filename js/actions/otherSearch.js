/**
 * @author Semper
 */
import {RECEIVE_OTHER_SEARCH, REQUEST_OTHER_SEARCH} from "../constants/ActionTypes";

export function requestOtherSearch(bookName) {
    return {
        type: REQUEST_OTHER_SEARCH,
        bookName
    };
}

export function receiveOtherSearch(otherSearchResult, baseOtherSearchUrl, siteName) {
    return {
        type: RECEIVE_OTHER_SEARCH,
        otherSearchResult,
        baseOtherSearchUrl,
        siteName
    };
}