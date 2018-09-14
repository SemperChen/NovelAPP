/**
 * @author Semper
 */
import {RECEIVE_GUESS_YOU_LIKE, REQUEST_GUESS_YOU_LIKE} from "../constants/ActionTypes";

const initialState = {
    // isFetchingRankings: false
};
export default function gussYouLike(state = initialState, action) {
    switch (action.type) {
        case REQUEST_GUESS_YOU_LIKE:
            return {
                ...state,
            };
        case RECEIVE_GUESS_YOU_LIKE:
            return {
                ...state,
                guessYouLikeData:action.guessYouLikeData,
            };
        default:
            return state;
    }
}
