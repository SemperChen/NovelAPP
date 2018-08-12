import nav from './navReducers';
import {combineReducers} from "redux";
import bookmarks from "./bookmarks";
import search from "./search";
import read from "./read";
import catalog from "./catalog";
import detail from "./detail";
import spread from "./spread";
import rankings from "./rankings";
import hotRec from "./hotRec";
import bestEnd from "./bestEnd";
import editorRec from "./editorRec";
import rankingDetail from "./rankingDetail";
import category from "./category";
import categoryDetail from "./categoryDetail";
import config from "./config";
import guessYouLike from "./guessYouLike";
import hotSearch from "./hotSearch";
import otherSearch from "./otherSearch";
import hotSimilar from "./hotSimilar";
import notification from "./notification";
import login from "./login";

const AppReducer = combineReducers({
    nav,
    bookmarks,
    search,
    read,
    catalog,
    detail,
    rankings,
    spread,
    hotRec,
    bestEnd,
    editorRec,
    rankingDetail,
    category,
    categoryDetail,
    config,
    guessYouLike,
    hotSearch,
    otherSearch,
    hotSimilar,
    notification,
    login
});
export default AppReducer