/**
 * @author Semper
 */
import {RECEIVE_HOT_REC, REQUEST_HOT_REC} from "../constants/ActionTypes";

const initialState = {
    // isFetchingRankings: false
};
export default function hotRec(state = initialState, action) {
    switch (action.type) {
        case REQUEST_HOT_REC:
            return {
                ...state,
            };
        case RECEIVE_HOT_REC:
            return {
                ...state,
                hotRecData:action.hotRecData,
            };
        default:
            return state;
    }
}
