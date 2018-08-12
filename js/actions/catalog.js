/**
 * @author Semper
 */
import {CLEAR_CATALOG, RECEIVE_CATALOG, REQUEST_CATALOG} from "../constants/ActionTypes";

export function requestCatalog(url, receiveType) {
    return {
        type: REQUEST_CATALOG,
        url,
        receiveType
    };
}

export function receiveCatalog(url, catalogData) {
    return {
        type: RECEIVE_CATALOG,
        url,
        catalogData
    };
}

export function clearCatalog() {
    return {
        type: CLEAR_CATALOG
    };
}