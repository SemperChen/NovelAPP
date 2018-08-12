/**
 * @author Semper
 */
import {storage} from "./StorageUtil";
import {BOOKMARKS} from "../constants/constants";

export function saveBookmark(bookmark) {
    if (bookmark !== null && bookmark !== undefined) {

        storage.save({
            key: BOOKMARKS,
            id: bookmark.tag.replace('_', ''),
            data: bookmark
        })
    }
}

export function removeBookmark(key, id) {
    storage.remove({
        key: key,
        id: id.replace('_', '')
    });
}

export function loadBookmarks() {
    return storage.getAllDataForKey(BOOKMARKS).then(bookmarks => {
        // 如果找到数据，则在then方法中返回
        console.log('loadBookmarks', bookmarks);
        return bookmarks;
    }).catch(err => {
        // 如果没有找到数据且没有sync方法，
        // 或者有其他异常，则在catch中返回
        console.warn('读取数据失败', err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    })
}

/***********************************************************************************************************************
 *书签排序
 */
export const sortBy = function (name) {
    return function (o, p) {
        let a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a > b ? -1 : 1;
            }
            return typeof a > typeof b ? -1 : 1;
        }
        else {
            throw ("BookmarkUtil sortBy error");
        }
    }
};