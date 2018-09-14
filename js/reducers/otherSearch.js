/**
 * @author Semper
 */
import {RECEIVE_OTHER_SEARCH, REQUEST_OTHER_SEARCH} from "../constants/ActionTypes";

const initialState = {
    // isSearching: false
};

export default function otherSearch(state = initialState, action) {
    switch (action.type) {

        case RECEIVE_OTHER_SEARCH:
            return {
                ...state,
                otherSearchResult: action.otherSearchResult,
                baseOtherSearchUrl:action.baseOtherSearchUrl,
                siteName:action.siteName
            };
        default:
            return state;
    }
}
