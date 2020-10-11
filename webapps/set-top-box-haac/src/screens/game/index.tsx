import './game.scss';

import React from 'react';
import { screenReady, NavigableButton, Footer } from '@telefonica/la-web-sdk';
import { Intent, Game, GameScreenData } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';

const GameScreen: React.FC<GameScreenData> = (data: any) => {
    const { sendCommand } = useAura();

    const {title, games} = data.screenData;

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    return (
        <div className="genre-screen">
            <h1 className="title">CATEGORY {title.toUpperCase()} </h1>
            <div className="games">
                {games.map((game: Game) => (
                    <div className="game" key={game.id}>
                        <div className="upper-container">
                            <img src={game.background_image} alt={game.name} />
                            <div className="right-container">
                                <b>Name: {game.name}</b>
                            </div>
                        </div>
                        <div className="lower-container">
                            <p>Metacritic: {game.metacritic}</p>
                            <p>PlayTime: {game.playtime}</p>
                            <p>Released: {game.released}</p>
                        </div>
                    </div>
                ))}
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
