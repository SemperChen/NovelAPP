import {fetchBestEnd} from '../js/sagas/bestEnd';
import {fetchJSON} from '../js/utils/HttpUtil';
import {call, put} from 'redux-saga/effects';
import {receiveBestEnd} from '../js/actions/bestEnd';
import {fetchBookContent} from '../js/sagas/read';
import {RECEIVE_TYPE} from '../js/constants/constants';
import {receiveArticle} from '../js/actions/read';

describe('Saga test', () => {

    it('bestEnd Saga test', () => {
        let bestEndUrl = 'https://github.com/';
        const generator = fetchBestEnd({bestEndUrl});
        let bestEndData = call(fetchJSON, bestEndUrl);
        expect(generator.next().value).toEqual(bestEndData);
        expect(generator.next(bestEndData).value).toEqual(put(receiveBestEnd(bestEndData)))
    })

    it('read Saga test', () => {
        let articleUrl = 'https://github.com/';
        let receiveType = RECEIVE_TYPE.JSON;
        const generator = fetchBookContent({articleUrl,receiveType});
        let article = call(fetchJSON, articleUrl);
        expect(generator.next().value).toEqual(article);
        expect(generator.next(article,articleUrl).value).toEqual(put(receiveArticle(article,articleUrl)))
    })
})
