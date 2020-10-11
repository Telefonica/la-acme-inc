import './home.scss';

import { KeyCode, KeyEvent, NavigableButton, screenReady, useBackground, useInput } from '@telefonica/la-web-sdk';
import { HomeScreenData, Category } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';
import React, { useEffect, useCallback, useState } from 'react';
import { Intent } from '../../../../../dialogs/src/models';

const HomeScreen: React.FC<HomeScreenData> = (data: any) => {
    const {title, categories} = data.screenData;
    const background = useBackground();
    const { sendCommand } = useAura();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        background.clearBackground();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onKeyPressed = useCallback(
        (e: KeyEvent) => {
            switch (e.data.keyCode) {
                case KeyCode.KEY_LEFT:
                    if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1);
                    }
                    break;
                case KeyCode.KEY_RIGHT:
                    if (currentIndex < categories.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                    }
                    break;
                default:
                    break;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentIndex],
    );
    useInput(onKeyPressed);

    useEffect(() => {
        background.setBackground(categories[currentIndex].image_background);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const goToCategory = (genre: string) => {
        switch (genre.toLowerCase()) {
            case 'adventure':
                sendCommand({ intent: Intent.ADVENTURE, entities: [] });
                break;
            case 'action':
                sendCommand({ intent: Intent.ACTION, entities: [] });
                break;
            case 'indie':
                sendCommand({ intent: Intent.INDIE, entities: [] });
                break;
            case 'rpg':
                sendCommand({ intent: Intent.RPG, entities: [] });
                break;
            default:
                break;
        }
    };

    return (
        <div className="home-screen">
            <h1 className="title">{title}</h1>
            {categories.map((category: Category, index: number) => (
                <div className="home-section" key={category.id}>
                    <NavigableButton
                        onClick={() => {
                            setCurrentIndex(index);
                            goToCategory(category.name);
                        }}
                        defaultClass="button"
                        focusedClass="focus"
                        defaultFocused={index === 0}
                        id={category.id}
                    >
                        Go to {category.name}
                    </NavigableButton>
                </div>
            ))}
        </div>
    );
};

export default screenReady(HomeScreen);
