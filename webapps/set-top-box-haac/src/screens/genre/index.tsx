import './genre.scss';

import React, { useState } from 'react';
import { screenReady } from '@telefonica/la-web-sdk';
import { Game, GameScreenData } from '../../../../../dialogs/src/models';
import GameCard from '../../components/GameCard';
interface Test {
    screenData: GameScreenData;
}

const GameScreen: React.FC<Test> = (data: Test) => {
    const { games, title } = data.screenData;

    const [focusedIndex, setFocusedIndex] = useState(0);
    const [focusedIndexSecond, setFocusedIndexSecond] = useState(0);
    const [focusedIndexVertical, setFocusedIndexVertical] = useState(0);

    return (
        <div className="genre-screen">
            <div className="vertical-focusable" style={{ transform: `translateY(-${focusedIndexVertical * 640}px)` }}>
                <div className="genre-screen__wrapper-out">
                    <h1 className="genre-screen__title">CATEGORY {title.toUpperCase()} </h1>
                    <div className="genre-screen__wrapper" style={{ transform: `translate(-${focusedIndex * 580}px)` }}>
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={(e: any) => console.log(e.target.parentNode)}
                                onFocus={() => {
                                    setFocusedIndex(() => index);
                                    setFocusedIndexVertical(0);
                                }}
                                game={game}
                                key={`game-card-0-${index}`}
                                focused={index === 0}
                                navigableId={`0-${index}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="genre-screen__wrapper-out">
                    <h1 className="genre-screen__title">CATEGORY {title.toUpperCase()} </h1>
                    <div
                        className="genre-screen__wrapper"
                        style={{ transform: `translate(-${focusedIndexSecond * 580}px)` }}
                    >
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={() => console.log('test')}
                                onFocus={() => {
                                    setFocusedIndexSecond(() => index);
                                    setFocusedIndexVertical(1);
                                }}
                                game={game}
                                key={`game-card-1-${index}`}
                                focused={false}
                                navigableId={`1-${index}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default screenReady(GameScreen);
