import './genre.scss';

import React, { useRef } from 'react';
import { screenReady, NavigableButton, Footer } from '@telefonica/la-web-sdk';
import { Intent, Game, GameScreenData } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';

const GameScreen: React.FC<GameScreenData> = (gameData: GameScreenData) => {
    const { sendCommand } = useAura();
    const gameList = useRef(gameData.games);

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    const getImage = (filename: string | undefined): string => {
        if (filename) {
            return `${process.env.PUBLIC_URL}/assets/imgs/${filename}`;
        }

        return `${process.env.PUBLIC_URL}/assets/imgs/notfound.png`;
    };

    return (
        <div className="genre-screen">
            <h1 className="title">GAMES - CATEGORY {gameData.title.toUpperCase()} </h1>
            <div className="games">
                {gameList.current.map((game: Game) => (
                    <div className="game" key={game.id}>
                        <div className="upper-container">
                            <img src={getImage(game.img)} alt={game.title} />
                            <div className="right-container">
                                <b>Name: {game.title}</b>
                                <p>Platform: {game.platform}</p>
                                <p>Year: {game.year}</p>
                            </div>
                        </div>
                        <div className="lower-container">
                            <p>Description: {game.description}</p>
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
