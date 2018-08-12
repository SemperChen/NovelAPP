/**
 * @author Semper
 */
import {RECEIVE_HOT_SIMILAR, REQUEST_HOT_SIMILAR} from "../constants/ActionTypes";

const initialState = {
    isFetching: false
};
export default function hotSimilar(state = initialState, action) {
    switch (action.type) {
        case REQUEST_HOT_SIMILAR:
            return {
                ...state,
                isFetching:true
            };
        case RECEIVE_HOT_SIMILAR:
            return {
                ...state,
                hotSimilarData:action.hotSimilarData,
                isFetching:false
            };
        default:
            return state;
    }
}
