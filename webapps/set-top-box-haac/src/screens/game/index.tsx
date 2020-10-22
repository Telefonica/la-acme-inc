import './game.scss';

import React from 'react';
import { screenReady, NavigableButton, Footer } from '@telefonica/la-web-sdk';
import { Intent, GameScreenData } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';

const GameScreen: React.FC<GameScreenData> = (data: GameScreenData) => {
    console.log('Game data ', data)
    const { sendCommand } = useAura();

    const { title, game } = data;

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    return (
        <div className="genre-screen">
            <h1 className="title">{title.toUpperCase()} </h1>           
            <Footer>
                <NavigableButton onClick={() => goToHome()} defaultClass="" focusedClass="" id="categories-button">
                    BACK
                </NavigableButton>
            </Footer>
        </div>
    );
};

export default screenReady(GameScreen);
