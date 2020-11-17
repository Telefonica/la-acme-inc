import { NavigationActionSaga, NavigationAction, TOGGLE_NAVIGATION, NAVIGATION_SAGA } from '../types';

export const toggleNavigation = (): NavigationAction => ({ type: TOGGLE_NAVIGATION });
export const navigationSaga = (payload: Function): NavigationActionSaga => ({ type: NAVIGATION_SAGA, payload });
