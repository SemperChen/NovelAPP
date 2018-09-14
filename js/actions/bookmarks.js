/**
 * @author Semper
 */
import {RECEIVE_BOOKMARKS, REQUEST_BOOKMARKS} from "../constants/ActionTypes";

export function requestBookmarks(url) {
    return {
        type: REQUEST_BOOKMARKS,
        url
    };
}

export function receiveBookmarks(url, bookmarks) {
    return {
        type: RECEIVE_BOOKMARKS,
        url,
        bookmarks
    };
}
