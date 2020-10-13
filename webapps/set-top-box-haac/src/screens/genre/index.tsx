import './genre.scss';

import React from 'react';
import { screenReady, NavigableButton, Footer } from '@telefonica/la-web-sdk';
import { Intent, Game, GameScreenData } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';
import Metacritic from '../../components/metacritic/intex';

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
            <h1 className="genre-screen__title">CATEGORY {title.toUpperCase()} </h1>
            {games.map((game: Game) => (
                <div className="genre-screen__game" key={game.id}>
                    <img className="genre-screen__game__image" src={game.background_image} alt={game.name} />
                    <div className="genre-screen__game__info">
                        <p className="genre-screen__game__info__title">{game.name}</p>
                        <p className="genre-screen__game__info__release">Released: {game.released}</p>
                        <span className="genre-screen__game__info__metacritic">
                            <p>Metacritic: </p>
                            <Metacritic score={game.metacritic} />
                        </span>
                    </div>
                </div>
            ))}
            <Footer>
                <NavigableButton
                    onClick={() => goToHome()}
                    defaultClass=""
                    focusedClass=""
                    defaultFocused
                    id="categories-button"
                >
                    BACK
                </NavigableButton>
            </Footer>
        </div>
    );
};

export default screenReady(GameScreen);
