import React from 'react';
import { screenReady } from '@telefonica/la-web-sdk';
import { HomeScreenMessage } from '../../../../../dialogs/src/models';

const HomeScreen: React.FC<HomeScreenMessage> = (data: HomeScreenMessage) => {
    const { categories, title } = data;

    return (
        <div className="HomeScreen">
            <h1>HOME</h1>
            <p>{title}</p>
            {console.log(categories)}
            <ul>
            {categories.map((category: any) => (
                <li key={category.id}>{category.name}</li>
            ))}
            </ul>
        </div>
    );
};

export default screenReady(HomeScreen);
