import React from 'react';
import { screenReady } from '@telefonica/la-web-sdk';
import { HomeScreenMessage } from '../../../../../dialogs/src/models';

const HomeScreen: React.FC<HomeScreenMessage> = (data: HomeScreenMessage) => {
    return (
        <div className="HomeScreen">
            <h1>HOME</h1>
            <p>{data.title}</p>
        </div>
    );
};

export default screenReady(HomeScreen);
