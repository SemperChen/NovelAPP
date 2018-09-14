/*import AppNavigator from '../navigators/AppNavigator';

const nav = (state, action) => {
    let nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};*/
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import AppNavigator from '../navigators/AppNavigator';

const nav = createNavigationReducer(AppNavigator);

export default nav;