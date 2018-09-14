/**
 * @author Semper
 */
import {CLEAR_DETAIL, RECEIVE_DETAIL, REQUEST_DETAIL} from "../constants/ActionTypes";

const initialState = {
    isFetchingDetail: false
};

export default function detail(state = initialState, action) {
    switch (action.type) {
        case REQUEST_DETAIL:
        return {
            ...state,
            isFetchingDetail:true
        };
        case RECEIVE_DETAIL:
            return {
                ...state,
                bookDetail: action.bookDetail,
                isFetchingDetail:false
            };
        case CLEAR_DETAIL:
            return {
                ...state,
                bookDetail: undefined,
                isFetchingDetail:false
            };
        default:
            return state;
    }
}
