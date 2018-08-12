/**
 * @author Semper
 */
import {RECEIVE_APP_CONFIG, REQUEST_APP_CONFIG} from "../constants/ActionTypes";

const initialState = {
    isRefreshing: false
};

export default function config(state = initialState, action) {
    switch (action.type) {
        case REQUEST_APP_CONFIG:
            return {
                ...state
            };
        case RECEIVE_APP_CONFIG:
            return {
                ...state,
                configData: action.configData
            };
        default:
            return state;
    }
}
