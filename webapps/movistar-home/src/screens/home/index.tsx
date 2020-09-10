import React from 'react';
import { screenReady } from '@telefonica/la-web-sdk';
import { HomeScreenMessage } from '../../../../../dialogs/src/models';

const HomeScreen: React.FC<HomeScreenMessage> = (data: HomeScreenMessage) => {
    return <div className="HomeScreen">{data.title}</div>;
};

export default screenReady(HomeScreen);
