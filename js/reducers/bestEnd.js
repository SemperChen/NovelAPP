/**
 * @author Semper
 */
import {RECEIVE_BEST_END, REQUEST_BEST_END} from "../constants/ActionTypes";

const initialState = {
    // isFetchingRankings: false
};
export default function bestEnd(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BEST_END:
            return {
                ...state,
            };
        case RECEIVE_BEST_END:
            return {
                ...state,
                bestEndData: action.bestEndData,
            };
        default:
            return state;
    }
}
