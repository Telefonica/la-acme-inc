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
    const [focusedIndexThird, setFocusedIndexThird] = useState(0);
    const [focusedIndexFourth, setFocusedIndexFourth] = useState(0);
    const [focusedIndexVertical, setFocusedIndexVertical] = useState(0);
    const horizontalValue = 417;
    const verticalValue = 360;

    return (
        <div className="genre-screen">
            <div style={{ transform: `translateY(-${focusedIndexVertical * verticalValue}px)` }}>
                <div>
                    <h1 className="genre-screen__title">CATEGORY 1</h1>
                    <div
                        className="genre-screen__wrapper"
                        style={{ transform: `translate(-${focusedIndex * horizontalValue}px)` }}
                    >
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={() => {}}
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

                <div>
                    <h1 className="genre-screen__title">CATEGORY 2</h1>
                    <div
                        className="genre-screen__wrapper"
                        style={{ transform: `translate(-${focusedIndexSecond * horizontalValue}px)` }}
                    >
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={() => {}}
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

                <div>
                    <h1 className="genre-screen__title">CATEGORY 3</h1>
                    <div
                        className="genre-screen__wrapper"
                        style={{ transform: `translate(-${focusedIndexThird * horizontalValue}px)` }}
                    >
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={() => {}}
                                onFocus={() => {
                                    setFocusedIndexThird(() => index);
                                    setFocusedIndexVertical(2);
                                }}
                                game={game}
                                key={`game-card-2-${index}`}
                                focused={false}
                                navigableId={`2-${index}`}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="genre-screen__title">CATEGORY 4</h1>
                    <div
                        className="genre-screen__wrapper"
                        style={{ transform: `translate(-${focusedIndexFourth * horizontalValue}px)` }}
                    >
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={() => {}}
                                onFocus={() => {
                                    setFocusedIndexFourth(() => index);
                                    setFocusedIndexVertical(3);
                                }}
                                game={game}
                                key={`game-card-3-${index}`}
                                focused={false}
                                navigableId={`3-${index}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default screenReady(GameScreen);
