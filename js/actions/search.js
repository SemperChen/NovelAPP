/**
 * @author Semper
 */
import {QUIT_SEARCH_PAGE, RECEIVE_SEARCH, REQUEST_SEARCH} from "../constants/ActionTypes";

export function requestSearch(searchUrl) {
    return {
        type: REQUEST_SEARCH,
        searchUrl
    };
}

export function receiveSearch(searchResult, baseSearchUrl) {
    return {
        type: RECEIVE_SEARCH,
        searchResult,
        baseSearchUrl
    };
}