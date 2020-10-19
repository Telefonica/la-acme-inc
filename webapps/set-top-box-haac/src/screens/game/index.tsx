import './game.scss';

import React from 'react';
import { screenReady, NavigableButton, Footer } from '@telefonica/la-web-sdk';
import { Intent, GameScreenData } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';

const GameScreen: React.FC<GameScreenData> = (data: GameScreenData) => {
    const { sendCommand } = useAura();

    const { title, game } = data;

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    return (
        <div className="genre-screen">
            <h1 className="title">{title.toUpperCase()} </h1>
            <div className="games">
                <div className="game" key={game.id}>
                    <div className="upper-container">
                        <img src={game.background_image} alt={game.name} />
                        <div className="right-container">
                            <b>Name: {game.name}</b>
                        </div>
                    </div>
                    <div className="lower-container">
                        <p>Metacritic: {game.metacritic}</p>
                    </div>
                </div>
            </div>
            <Footer>
                <NavigableButton onClick={() => goToHome()} defaultClass="" focusedClass="" id="categories-button">
                    BACK
                </NavigableButton>
            </Footer>
        </div>
    );
};

export default screenReady(GameScreen);
