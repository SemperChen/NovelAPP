/**
 * @author Semper
 */
import {CLEAR_DETAIL, RECEIVE_DETAIL, REQUEST_DETAIL} from "../constants/ActionTypes";

export function requestDetail(bookDetailUrl) {
    return {
        type: REQUEST_DETAIL,
        bookDetailUrl
    };
}

export function receiveDetail(bookDetail) {
    return {
        type: RECEIVE_DETAIL,
        bookDetail
    };
}

export function clearDetail() {
    return {
        type: CLEAR_DETAIL
    };
}