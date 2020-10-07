import './genre.scss';

import React, { useRef } from 'react';
import { screenReady, NavigableButton, Footer } from '@telefonica/la-web-sdk';
import { Intent, Game, GameScreenData } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';

const GameScreen: React.FC<GameScreenData> = (gameData: GameScreenData) => {
    const { sendCommand } = useAura();

    const gameList = gameData.games;

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    return (
        <div className="genre-screen">
            <h1 className="title">GAMES - CATEGORY {gameData.title.toUpperCase()} </h1>
            <div className="games">
                {gameList.map((game: Game) => (
                    <div className="game" key={game.id}>
                        <div className="upper-container">
                            <img src={game.background_image} alt={game.name} />
                            <div className="right-container">
                                <b>Name: {game.name}</b>
                            </div>
                        </div>
                        <div className="lower-container">
                            <p>PlayTime: {game.playtime}</p>
                            <p>Released: {game.released}</p>
                            <p>Metacritic: {game.metacritic}</p>
                            <p>PlatForm: {game.platforms[0]['platform'].name}</p>
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
