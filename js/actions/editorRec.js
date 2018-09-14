/**
 * @author Semper
 */
import {RECEIVE_EDITOR_REC, REQUEST_EDITOR_REC} from "../constants/ActionTypes";

export function requestEditorRec(editorRecUrl) {
    return {
        type: REQUEST_EDITOR_REC,
        editorRecUrl
    };
}

export function receiveEditorRec(editorRecData) {
    return {
        type: RECEIVE_EDITOR_REC,
        editorRecData,
    };
}
