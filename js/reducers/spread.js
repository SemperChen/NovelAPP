/**
 * @author Semper
 */
import {RECEIVE_SPREAD, REQUEST_SPREAD} from "../constants/ActionTypes";

const initialState = {
    // isFetching: false
};

export default function spread(state=initialState, action) {
    switch (action.type) {
        case REQUEST_SPREAD:
        // return state;
        case RECEIVE_SPREAD:
            return {
                ...state,
                spreadData: action.spreadData
            };
        default:
            return state;
    }
}
