/**
 * @author Semper
 */
import {Dimensions} from "react-native";

export const W = Dimensions.get('window').width;
export const H = Dimensions.get('window').height;
export const WIDTH = getOrientationWidth();
export const HEIGHT = getOrientationHeight();
export const BOOKMARK_WIDTH = WIDTH / 9 * 2;
export const BOOKMARK_HEIGHT = BOOKMARK_WIDTH / 3 * 4;

export const IMG_WIDTH = WIDTH / 16 * 3;
export const IMG_HEIGHT = IMG_WIDTH / 3 * 4;
export const IMG_MARGIN = WIDTH / 40;

export const filterWidth = WIDTH / 3 * 2;
export const cateItemWidth = filterWidth / 4;
export const cateItemHeight = cateItemWidth / 2;
export const cateItemMargin = cateItemWidth / 8;

export function getOrientationWidth() {
    if (W > H) {
        return H
    } else {
        return W
    }
}

export function getOrientationHeight() {
    if (W > H) {
        return W
    } else {
        return H
    }
}