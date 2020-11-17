import { put, call, take, fork } from 'redux-saga/effects';
import { toggleNavigation } from '../actions/navigationActions';

import { NAVIGATION_SAGA, FUNCTION_DONE, NavigationActionSaga } from '../types';

function* takeFirst(pattern: string, saga: any, ...args: any[]) {
    const task = yield fork(function* () {
        while (true) {
            const action = yield take(pattern);
            yield call(saga, ...args.concat(action));
        }
    });
    return task;
}

function* handleNavigation(action: NavigationActionSaga) {
    yield put(toggleNavigation());
    yield call(action.payload);
    console.log('WAITING FOR DONE:');
    yield take(FUNCTION_DONE);
    console.log('IS DONE!');
    yield put(toggleNavigation());
}

export const handleNavigationSaga = [takeFirst(NAVIGATION_SAGA, handleNavigation)];
