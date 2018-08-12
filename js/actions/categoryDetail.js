/**
 * @author Semper
 */
import {CLEAR_BOOK_CACHE, RECEIVE_CATEGORY_DETAIL, REQUEST_CATEGORY_DETAIL} from "../constants/ActionTypes";

export function requestCategoryDetail(categoryDetailUrl) {
    return {
        type: REQUEST_CATEGORY_DETAIL,
        categoryDetailUrl
    };
}

export function receiveCategoryDetail(categoryDetailData) {
    return {
        type: RECEIVE_CATEGORY_DETAIL,
        categoryDetailData,
    };
}

export function clearBookCache() {
    return {
        type: CLEAR_BOOK_CACHE,
    };
}
