import { SET_CAROUSEL_HEIGHT, CarouselAction } from '../types';

type CarouselState = {
    carouselHeight: number;
};

const initialState: CarouselState = {
    carouselHeight: 0,
};

export const carouselReducer = (state = initialState, action: CarouselAction): CarouselState => {
    const states = {
        [SET_CAROUSEL_HEIGHT]: { carouselHeight: action.height },
    };

    return states[action.type] || state;
};
