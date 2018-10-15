import {Platform} from "react-native";
import GBKHttp from '../utils/http/GBKHttp';

/**
 * @author Semper
 */

export function fetchBookmark(url, params) {

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
            .then((response) => {
                return response.json()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchBookmark:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'Mozilla/5.0 (Linux; X11)',
            }
        })
            .then((response) => {
                return response.json()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchJSON:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('fetchHtml:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}

export function fetchOtherSearch(unicodeName, url) {
    if (Platform.OS === 'android' && unicodeName === 'GBK') {
        return fetchHtmlGBK(url)
    } else {
        return fetchJSON(url)
    }

}

export function fetchHtmlGBK(url) {
    return new Promise((resolve, reject) => {
        GBKHttp.fetchGBKData(url,
            (error) => {
                reject(new Error(error));
            },
            (res) => {
                resolve(res)
            });
    })
}

export function fetchCatalogGBKText(url) {
    if (Platform.OS === 'android') {
        return fetchHtmlGBK(url)
    } else {
        return fetchHtml(url)
    }

}

export function fetchBookContentGBKText(url) {
    if (Platform.OS === 'android') {
        return fetchHtmlGBK(url)
    } else {
        return fetchHtml(url)
    }

}

export function searchBook(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('searchBook:responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}