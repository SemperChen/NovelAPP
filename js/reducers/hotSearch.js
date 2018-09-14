/**
 * @author Semper
 */
import {RECEIVE_HOT_SEARCH, REQUEST_HOT_SEARCH} from "../constants/ActionTypes";

const initialState = {
    // isFetchingRankings: false
};
export default function hotSearch(state = initialState, action) {
    switch (action.type) {
        case REQUEST_HOT_SEARCH:
            return {
                ...state,
            };
        case RECEIVE_HOT_SEARCH:
            return {
                ...state,
                hotSearchData:action.hotSearchData,
            };
        default:
            return state;
    }
}
