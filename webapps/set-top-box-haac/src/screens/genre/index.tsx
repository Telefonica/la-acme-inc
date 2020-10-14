import './genre.scss';

import React from 'react';
import { screenReady } from '@telefonica/la-web-sdk';
import { Game, GameScreenData } from '../../../../../dialogs/src/models';
import GameCard from '../../components/GameCard';

interface Test {
    screenData: GameScreenData;
}

const GameScreen: React.FC<Test> = (data: Test) => {
    const { games, title } = data.screenData;

    return (
        <div className="genre-screen">
            <h1 className="genre-screen__title">CATEGORY {title.toUpperCase()} </h1>
            {games.map((game: Game, index: number) => (
                <GameCard
                    onClick={() => console.log('test')}
                    onFocus={() => console.log('test')}
                    game={game}
                    key={`game-card-${index}`}
                    focused={index === 0}
                />
            ))}
        </div>
    );
};

export default screenReady(GameScreen);
