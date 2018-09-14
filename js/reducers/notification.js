/**
 * @author Semper
 */

import {RECEIVE_NOTIFICATION, REQUEST_NOTIFICATION} from "../constants/ActionTypes";

const initialState = {
    // isFetchingRankings: false
};
export default function notification(state = initialState, action) {
    switch (action.type) {
        case REQUEST_NOTIFICATION:
            return {
                ...state,
            };
        case RECEIVE_NOTIFICATION:
            return {
                ...state,
                notificationData:action.notificationData,
            };
        default:
            return state;
    }
}
