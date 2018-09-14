/**
 * @author Semper
 */
import {RECEIVE_BEST_END, REQUEST_BEST_END} from "../constants/ActionTypes";

export function requestBestEnd(bestEndUrl) {
    return {
        type: REQUEST_BEST_END,
        bestEndUrl
    };
}

export function receiveBestEnd(bestEndData) {
    return {
        type: RECEIVE_BEST_END,
        bestEndData,
    };
}
