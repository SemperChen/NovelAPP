/**
 * @author Semper
 */
import {CLEAR_LOGIN, RECEIVE_LOGIN, REQUEST_LOGIN} from "../constants/ActionTypes";

export function requestLogin(loginUrl) {
    return {
        type: REQUEST_LOGIN,
        loginUrl:loginUrl
    };
}

export function receiveLogin(loginData) {
    return {
        type: RECEIVE_LOGIN,
        loginData
    };
}

export function clearLogin() {
    return {
        type: CLEAR_LOGIN
    };
}
