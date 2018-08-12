/**
 * @author Semper
 */
import {RECEIVE_SPREAD, REQUEST_SPREAD} from "../constants/ActionTypes";

export function requestSpread(spreadUrl) {
    return {
        type: REQUEST_SPREAD,
        spreadUrl
    };
}

export function receiveSpread(spreadData) {
    return {
        type: RECEIVE_SPREAD,
        spreadData
    };
}