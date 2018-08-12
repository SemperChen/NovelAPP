/**
 * @author Semper
 */
import {RECEIVE_CATEGORY, REQUEST_CATEGORY} from "../constants/ActionTypes";

export function requestCategory(categoryUrl) {
    return {
        type: REQUEST_CATEGORY,
        categoryUrl
    };
}

export function receiveCategory(categoryData) {
    return {
        type: RECEIVE_CATEGORY,
        categoryData,
    };
}
