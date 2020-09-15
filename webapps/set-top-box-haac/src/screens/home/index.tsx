import { NavigableButton, screenReady } from '@telefonica/la-web-sdk';
import { HomeScreenData } from '../../../../../dialogs/src/models';
import { Preloadable, useAura } from '@telefonica/la-web-sdk';
import React, { useEffect } from 'react';
import { Intent } from '../../../../../dialogs/src/models';

const HomeScreen: React.FC<HomeScreenData> = (data: HomeScreenData) => {
    const { categories, title } = data;

    const { sendCommand } = useAura();

    const goToCategorie = (genre: string) => {
        switch (genre) {
            case 'adventure':
                sendCommand({ intent: Intent.ADVENTURE, entities: [] });
                break;
            case 'action':
                sendCommand({ intent: Intent.ACTION, entities: [] });
                break;
            default:
                break;
        }
    };
    return (
        <div className="HomeScreen">
            <h1>{title}</h1>
            {categories.map((category: any) => (
                <NavigableButton
                    onClick={(e: any) => goToCategorie(category.genre)}
                    key={category.catId}
                    defaultClass=""
                    focusedClass=""
                    id="categories-button"
                >
                    Go to {category.genre}
                </NavigableButton>
            ))}
        </div>
    );
};

export default screenReady(HomeScreen);
