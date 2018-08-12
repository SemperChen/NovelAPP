/**
 * @author Semper
 */
import {RECEIVE_EDITOR_REC, REQUEST_EDITOR_REC} from "../constants/ActionTypes";

const initialState = {
    // isFetchingRankings: false
};
export default function editorRec(state = initialState, action) {
    switch (action.type) {
        case REQUEST_EDITOR_REC:
            return {
                ...state,
            };
        case RECEIVE_EDITOR_REC:
            return {
                ...state,
                editorRecData:action.editorRecData,
            };
        default:
            return state;
    }
}
