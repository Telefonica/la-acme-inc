import React from 'react';
import { screenReady } from '@telefonica/la-web-sdk';
import { HomeScreenData } from '../../../../../dialogs/src/models';

const HomeScreen: React.FC<HomeScreenData> = (data: HomeScreenData) => {
    return <div className="HomeScreen">{data.title}</div>;
};

export default screenReady(HomeScreen);
