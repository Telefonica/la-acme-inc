import { all } from 'redux-saga/effects';

import { handleNavigationSaga } from './handleNavigationSaga';

function* sagas() {
    yield all([...handleNavigationSaga]);
}

export default sagas;
