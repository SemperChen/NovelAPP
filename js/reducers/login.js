/**
 * @author Semper
 */
import {CLEAR_LOGIN, RECEIVE_LOGIN, REQUEST_LOGIN} from "../constants/ActionTypes";

const initialState = {
    isFetching: false
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_LOGIN:
            return {
                ...state,
                loginData: action.loginData,
                isFetching: false
            };
        case CLEAR_LOGIN:
            return {
                ...state,
                loginData: undefined,
                isFetching: false
            };
        default:
            return state;
    }
}
