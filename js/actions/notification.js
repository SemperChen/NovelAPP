/**
 * @author Semper
 */
import {RECEIVE_NOTIFICATION, REQUEST_NOTIFICATION} from "../constants/ActionTypes";

export function requestNotification(notificationUrl) {
    return {
        type: REQUEST_NOTIFICATION,
        notificationUrl
    };
}

export function receiveNotification(notificationData) {
    return {
        type: RECEIVE_NOTIFICATION,
        notificationData,
    };
}
