/**
 * @author Semper
 */
import {ThemeColors} from "./ThemeFactory";
import {READ_BG_COLOR, READER_SEX, THEME_COLORS} from "../constants/constants";

global.NovelAppConfig = {
    themeColorName: THEME_COLORS.DARK,
    appThemeColor: ThemeColors.pinkColors,
    isFirstOpen: true,
    readerSex: READER_SEX.FEMALE,
    notificationTime: null,
    isTraditional: false,
    readConfig: {
        bgColor: READ_BG_COLOR.DEFAULT,
        fontSize: 24,
        fontColor: '#000',
        isNightMode: false,
        darkFontColor: '#999999',
        darkBgColor: '#000'
    }
};