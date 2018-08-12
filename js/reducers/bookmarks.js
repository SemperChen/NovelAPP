/**
 * @author Semper
 */

import {RECEIVE_BOOKMARKS, REQUEST_BOOKMARKS} from "../constants/ActionTypes";

const initialState = {
    isRefreshing: false
};

export default function bookmarks(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BOOKMARKS:
            return {
                ...state,
                isRefreshing: true
            };
        case RECEIVE_BOOKMARKS:
            return {
                ...state,
                url: action.url,
                items: action.bookmarks,
                isRefreshing: false
            };
        default:
            return state;
    }
}
