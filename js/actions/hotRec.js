/**
 * @author Semper
 */
import {RECEIVE_HOT_REC, REQUEST_HOT_REC} from "../constants/ActionTypes";

export function requestHotRec(hotRecUrl) {
    return {
        type: REQUEST_HOT_REC,
        hotRecUrl
    };
}

export function receiveHotRec(hotRecData) {
    return {
        type: RECEIVE_HOT_REC,
        hotRecData,
    };
}
