import { NavigableButton, screenReady } from '@telefonica/la-web-sdk';
import { HomeScreenData } from '../../../../../dialogs/src/models';
import React from 'react';

const HomeScreen: React.FC<HomeScreenData> = (data: HomeScreenData) => {
    const { categories, title } = data;

    return (
        <div className="HomeScreen">
            <h1>{title}</h1>
            {console.log(categories)}
            {categories.map((category: any) => (
                <NavigableButton
                    onClick={(e: any) => (console.log(e.target))}
                    key={category.id}
                    defaultClass=""
                    focusedClass=""
                    id="categories-button"
                >
                    Go to {category.name} Games
                </NavigableButton>
            ))}
        </div>
    );
};

export default screenReady(HomeScreen);
