/**
 * @author Semper
 */
import {QUIT_SEARCH_PAGE, RECEIVE_SEARCH, REQUEST_SEARCH} from "../constants/ActionTypes";

const initialState = {
    // isSearching: false
};

export default function search(state = initialState, action) {
    switch (action.type) {
        case REQUEST_SEARCH:
        /*return { ...state,
            isSearching:true
        };*/
        case RECEIVE_SEARCH:
            return {
                ...state,
                searchResult: action.searchResult,
                baseSearchUrl: action.baseSearchUrl
            };
        default:
            return state;
    }
}
