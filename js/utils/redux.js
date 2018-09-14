import {
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {createNavigationPropConstructor} from 'react-navigation-redux-helpers/src/middleware';

const reactNavigationReduxMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);
const navigationPropConstructor = createNavigationPropConstructor('root');

export { reactNavigationReduxMiddleware, navigationPropConstructor };