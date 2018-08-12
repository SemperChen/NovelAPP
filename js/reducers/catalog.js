/**
 * @author Semper
 */

import {CLEAR_CATALOG, RECEIVE_CATALOG, REQUEST_CATALOG} from "../constants/ActionTypes";

const initialState = {
    isCatalogFetching: false
};
export default function catalog(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CATALOG:
            return {
                ...state,
                isCatalogFetching: true
            };
        case RECEIVE_CATALOG:
            return {
                ...state,
                url: action.url,
                catalogData: action.catalogData,
                isCatalogFetching: false
            };
        case CLEAR_CATALOG:
            return {
                ...state,
                url: undefined,
                catalogData: undefined,
                isCatalogFetching: false
            };
        default:
            return state;
    }
}
