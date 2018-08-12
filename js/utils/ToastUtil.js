import {Alert, Platform, ToastAndroid} from 'react-native';

const showShort = (content, isAlert) => {
    if (!content) {
        return;
    }
    if (isAlert || Platform.OS === 'ios') {
        Alert.alert('提示', content.toString());
    } else {
        ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
    }
};

const showLong = (content, isAlert) => {
    if (isAlert || Platform.OS === 'ios') {
        Alert.alert('提示', content.toString());
    } else {
        ToastAndroid.show(content.toString(), ToastAndroid.LONG);
    }
};

export default {
    showShort,
    showLong
};
