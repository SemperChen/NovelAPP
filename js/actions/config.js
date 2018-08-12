/**
 * @author Semper
 */
import {RECEIVE_APP_CONFIG, REQUEST_APP_CONFIG} from "../constants/ActionTypes";

export function requestConfig() {
    return {
        type: REQUEST_APP_CONFIG
    };
}

export function receiveConfig(configData) {
    return {
        type: RECEIVE_APP_CONFIG,
        configData
    };
}
