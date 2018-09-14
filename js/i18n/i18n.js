import I18n from 'react-native-i18n';
import zhCN from './locales/zh-CN';
import zhTW from './locales/zh-TW';

I18n.fallbacks = true;
I18n.defaultLocale = 'zh-TW';
I18n.translations = {
    'zh-CN': zhCN,
    'zh-TW': zhTW,

    'zh-Hans-US': zhCN,
    'zh-Hant-US': zhTW,

    'zh-Hans-CN': zhCN,
    'zh-Hans': zhCN,
    'zh-hans': zhCN,

};

export default I18n;