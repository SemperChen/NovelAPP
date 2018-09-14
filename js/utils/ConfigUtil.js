/**
 * @author Semper
 */
import {storage} from "./StorageUtil";

const CONFIG = 'config';

export function saveAppConfig(appConfig) {
    if (appConfig !== null && appConfig !== undefined) {
        storage.save({
            key: CONFIG,
            data: appConfig
        })
    }
}

export function loadAppConfig() {
    return storage.load({
        key: CONFIG
    }).then(config => {
        // 如果找到数据，则在then方法中返回
        return config;
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
        return []
    })
}