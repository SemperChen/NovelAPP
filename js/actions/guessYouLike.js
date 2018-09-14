/**
 * @author Semper
 */
import {RECEIVE_GUESS_YOU_LIKE, REQUEST_GUESS_YOU_LIKE} from "../constants/ActionTypes";

export function requestGuessYouLike(guessYouLikeUrl) {
    return {
        type: REQUEST_GUESS_YOU_LIKE,
        guessYouLikeUrl
    };
}

export function receiveGuessYouLike(guessYouLikeData) {
    return {
        type: RECEIVE_GUESS_YOU_LIKE,
        guessYouLikeData,
    };
}
