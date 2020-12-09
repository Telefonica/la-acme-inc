import { CarouselAction, SET_CAROUSEL_HEIGHT } from '../types';

export const setLastCarouselHeight = (height: number): CarouselAction => ({ type: SET_CAROUSEL_HEIGHT, height });
