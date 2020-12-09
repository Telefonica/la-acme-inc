import { combineReducers } from 'redux';

import { navigationReducer } from './navigationReducer';
import { carouselReducer } from './carouselReducer';

const reducers = combineReducers({
    navigation: navigationReducer,
    carousel: carouselReducer,
});

export default reducers;
