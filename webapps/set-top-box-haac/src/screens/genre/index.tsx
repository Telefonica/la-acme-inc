import './genre.scss';

import React from 'react';
import { screenReady, NavigableButton, Footer } from '@telefonica/la-web-sdk';
import { Intent, Game, GameScreenData } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';

interface Test {
    screenData: GameScreenData;
}

const GameScreen: React.FC<Test> = (data: Test) => {
    const { sendCommand } = useAura();

    const { games, title } = data.screenData;

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
                                <p>PlayTime: {game.playtime}</p>
                                <p>Released: {game.released}</p>
                                <p>Metacritic: {game.metacritic}</p>
                            </div>
                        </div>
                        <div className="lower-container">
                            <p>{game.description.replace('<p>', '').substr(0, 120) + ' ...'}</p>
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
