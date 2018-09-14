import AppNavigator from '../navigators/AppNavigator';

const nav = (state, action) => {
    let nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

export default nav;