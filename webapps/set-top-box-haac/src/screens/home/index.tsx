import './home.scss';

import { NavigableWrapper, screenReady, useBackground, useAura } from '@telefonica/la-web-sdk';
import { HomeScreenData, Category } from '../../../../../dialogs/src/models';
import React, { useEffect, useState } from 'react';
import { Intent } from '../../../../../dialogs/src/models';

interface Test {
    screenData: HomeScreenData;
}

const HomeScreen: React.FC<Test> = (data: Test) => {
    console.log(data);
    const { categories, title } = data.screenData;

    const { clearBackground, setBackground } = useBackground();
    const { sendCommand } = useAura();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => clearBackground, [clearBackground]);

    useEffect(() => {
        setBackground(categories[currentIndex].image_background);
    }, [currentIndex, setBackground, categories]);

    const goToCategory = (genre: string) => {
        sendCommand({ intent: Intent[genre.toUpperCase() as keyof typeof Intent], entities: [] });
    };

    return (
        <div className="home-screen">
            <h1 className="title">{title}</h1>
            {categories.map((category: Category, index: number) => (
                <NavigableWrapper
                    key={`navigatable-button-${index}`}
                    onClick={() => {
                        setCurrentIndex(index);
                        goToCategory(category.name);
                    }}
                    focusedClass="focus"
                    defaultFocused={index === 0}
                    id={category.id}
                >
                    <div className={`navigable-card navigable-card__${category.name}`}>
                        <p>{category.name}</p>
                    </div>
                </NavigableWrapper>
            ))}
        </div>
    );
};

export default screenReady(HomeScreen);
