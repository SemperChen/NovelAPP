/**
 * @author Semper
 */
import {HEIGHT, WIDTH} from "./DimensionsUtil";
import {Platform} from 'react-native';

export const contentFormat = (arr, fontSize) => {
    let fontCount = parseInt(WIDTH / (fontSize + 1)) - 1;
    let lines;
    if (Platform.OS === 'ios') {
        lines = parseInt(HEIGHT / fontSize / 1.4) - 6;
        if(fontSize>24){
            lines++
        }else if(fontSize>32){
            lines=lines+2
        }
    } else {
        lines = parseInt(HEIGHT / fontSize / 1.9) - 3;
        if(fontSize<28){
            lines--
        }
    }
    let array = [];
    let str = '';
    let count = 0;
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        let content = '\u3000\u3000' + arr[i];
        let length = content.length;
        let start = 0, end = 0;
        while (start < length) {
            if (count > lines) {
                array[index] = str;
                str = '';
                count = 0;
                index++
            }
            let c = optimizeText(content.substring(start, content.length - 1), fontCount);
            end = start + c;
            str = str + content.substring(start, end) + '\n';
            start = end;
            count++;
        }
        if (i + 1 === arr.length) {
            array[index] = str;
        }
    }
    // console.log('array',array);
    return array
};

const o = '`1234567890-=~!@#$%^&*()_+qwertyuiopasdfghjklzxcvbnmERTYUIPASFHJKLZXCVBN[]{}|;,./<>?"“”‘’';

export function optimizeText(text, fontCount) {
    let count = fontCount;
    let index = 0;
    let sum = 0;
    for (; index < count; index++) {
        let c = text.charAt(index);
        if (o.indexOf(c) !== -1) {
            sum++
        }
        if (sum === 2) {
            sum = 0;
            count++
        }
    }

    return count
}

/*
export const contentFormat = (content, fontSize = 18) => {
    let fontCount = parseInt(WIDTH / (fontSize + 1));
    let lines = parseInt(HEIGHT / fontSize / 9 * 6);
    const length = content.length;
    let array = [];
    let start = 0, end = 0, index = 0;
    while (start < length) {
        let _array = [];
        for (let i = 0; i <= lines; i++) {
            end = start + fontCount;
            _array[i] = content.substring(start, end);
            start = end
        }
        array[index] = _array;
        index++
    }
    return array
};*/
