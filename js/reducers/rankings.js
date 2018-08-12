/**
 * @author Semper
 */
import {REQUEST_RANKINGS} from "../constants/ActionTypes";
import {RECEIVE_RANKINGS} from "../constants/ActionTypes";

const initialState = {
    isFetchingRankings: false
};
export default function rankings(state = initialState, action) {
    switch (action.type) {
        case REQUEST_RANKINGS:
            return {
                ...state,
                isFetchingRankings: true
            };
        case RECEIVE_RANKINGS:
            return {
                ...state,
                rankingsData:action.rankingsData,
                isFetchingRankings: false
            };
        default:
            return state;
    }
}
