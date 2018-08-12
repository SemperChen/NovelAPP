import {call, put} from "redux-saga/effects";
import {fetchHtml} from "../utils/HttpUtil";
import {receiveNotification} from "../actions/notification";

export function* fetchNotification(params) {
    const {notificationUrl} = params;
    try {
        let notificationData = yield call(fetchHtml, notificationUrl);
        yield put(receiveNotification(notificationData))

        // console.log('---fetchNotification notificationData',notificationData)
    } catch (e) {
        console.log('fetchNotification func error:' + e.message)
    }

}
