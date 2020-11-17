import { TOGGLE_NAVIGATION, NavigationActionTypes } from '../types';

type NavigationState = {
    isActive: boolean;
};

const initialState: NavigationState = {
    isActive: true,
};

export const navigationReducer = (state = initialState, action: NavigationActionTypes): NavigationState => {
    const states = {
        [TOGGLE_NAVIGATION]: { isActive: !state.isActive },
    };

    return states[action.type] || state;
};
