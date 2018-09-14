/**
 * @author Semper
 */
import {CLEAR_ARTICLE, RECEIVE_ARTICLE, REQUEST_ARTICLE} from "../constants/ActionTypes";

const initialState = {
    isFetching: false
};
export default function read(state = {}, action) {
    switch (action.type) {
        case REQUEST_ARTICLE:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_ARTICLE:
            return {
                ...state,
                article: action.article,
                articleUrl: action.articleUrl,
                isFetching: false
            };
        case CLEAR_ARTICLE:
            return {
                ...state,
                article: undefined,
                bookUrl: undefined,
                isFetching: false
            };
        default:
            return state;
    }
}
