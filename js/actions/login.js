/**
 * @author Semper
 */
import {CLEAR_LOGIN, RECEIVE_LOGIN, REQUEST_LOGIN} from "../constants/ActionTypes";

export function requestLogin(loginUrl, body) {
    return {
        type: REQUEST_LOGIN,
        loginUrl:loginUrl,
        body:body
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
