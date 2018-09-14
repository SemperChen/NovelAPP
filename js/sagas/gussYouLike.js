import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveGuessYouLike} from "../actions/guessYouLike";

export function* fetchGuessYouLike(params) {
    try {
        const {guessYouLikeUrl} = params;
        let guessYouLikeData = yield call(fetchJSON, guessYouLikeUrl);
        yield put(receiveGuessYouLike(guessYouLikeData))
    } catch (e) {
        console.log('fetchGuessYouLike:' + e.message)
    }

}