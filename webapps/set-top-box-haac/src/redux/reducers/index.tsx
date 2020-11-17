import { combineReducers } from 'redux';

import { navigationReducer } from './navigationReducer';

const reducers = combineReducers({
    navigation: navigationReducer,
});

export default reducers;
