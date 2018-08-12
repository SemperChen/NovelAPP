/**
 * @author Semper
 */
import {RECEIVE_CATEGORY, REQUEST_CATEGORY} from "../constants/ActionTypes";

const initialState = {
    // isFetchingRankings: false
};
export default function category(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CATEGORY:
            return {
                ...state,
            };
        case RECEIVE_CATEGORY:
            return {
                ...state,
                categoryData:action.categoryData,
            };
        default:
            return state;
    }
}
