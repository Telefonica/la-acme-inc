import React from 'react';
import { screenReady } from '@telefonica/la-web-sdk';
import { HomeScreenData } from '../../../../../dialogs/src/models';

const GamesScreen: any = (data: HomeScreenData) => {
    const { categories } = data;

    return (
        <div className="GamesScreen">
            <h1>GAMES - CATEGORIE ACTION</h1>
            {
            // filtras por id y muestras sus items
            categories.map((category: any) => (
                <li>{category.items}</li>
            ))}
        </div>
    );
};

export default screenReady(GamesScreen);
