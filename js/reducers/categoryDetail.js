/**
 * @author Semper
 */
import {CLEAR_BOOK_CACHE, RECEIVE_CATEGORY_DETAIL, REQUEST_CATEGORY_DETAIL} from "../constants/ActionTypes";

const initialState = {
    isFetching: false
};
export default function categoryDetail(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CATEGORY_DETAIL:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_CATEGORY_DETAIL:
            return {
                ...state,
                categoryDetailData:action.categoryDetailData,
                isFetching: false
            };
        case CLEAR_BOOK_CACHE:
            return {
                ...state,
                categoryDetailData:null,
                isFetching: false
            };
        default:
            return state;
    }
}
