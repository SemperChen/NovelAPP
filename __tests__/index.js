import 'react-native';
import React from 'react';
import Root from '../js/index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
jest.mock('react-native-i18n', () => {
    const i18njs = require('i18n-js');
    const zh = require('../js/i18n/locales/zh-CN');
    i18njs.fallbacks = true;

    i18njs.translations = {zh}; // Optional ('en' is the default)
    const getLanguages = (): Promise<string[]> => Promise.resolve(['zh-CN']);
    return {
        t: jest.fn((k, o) => i18njs.t(k, o)),
        getLanguages
    };
});
jest.mock('react-native-orientation', () => {
    const lockToPortrait = (): Promise<string[]> => Promise.resolve([]);
    return {
        lockToPortrait
    };
});
it('renders correctly', () => {
    const tree = renderer.create(
        <Root/>
    );
});