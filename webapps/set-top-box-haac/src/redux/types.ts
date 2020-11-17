export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const NAVIGATION_SAGA = 'NAVIGATION_SAGA';
export const FUNCTION_DONE = 'FUNCTION_DONE';

export interface NavigationAction {
    type: typeof TOGGLE_NAVIGATION;
}

export interface NavigationActionSaga {
    type: typeof NAVIGATION_SAGA;
    payload: any;
}

export type NavigationActionTypes = NavigationAction;
