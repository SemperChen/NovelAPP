import {call, put} from "redux-saga/effects";
import {fetchJSON} from "../utils/HttpUtil";
import {receiveEditorRec} from "../actions/editorRec";

export function* fetchEditorRec(params) {
    try {
        const {editorRecUrl} = params;
        let editorRecData = yield call(fetchJSON, editorRecUrl);
        yield put(receiveEditorRec(editorRecData))
    } catch (e) {
        console.log('fetchEditorRec:' + e.message)
    }

}