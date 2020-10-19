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

    const movementStyle = { transform: `translateY(-${focusedIndexVertical * 417}px)` };

    return (
        <div className="genre-screen">
            <div>
                <div>
                    <h1 className="genre-screen__title" style={movementStyle}>
                        CATEGORY 1
                    </h1>
                    <div className="genre-screen__wrapper">
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={() => {}}
                                onFocus={() => {
                                    setFocusedIndex(() => index);
                                    setFocusedIndexVertical(() => 0);
                                }}
                                game={game}
                                key={`game-card-0-${index}`}
                                focused={index === 0}
                                isFocused={index === focusedIndex && focusedIndexVertical === 0}
                                navigableId={`0-${index}`}
                                indexX={focusedIndex}
                                indexY={focusedIndexVertical}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="genre-screen__title" style={movementStyle}>
                        CATEGORY 2
                    </h1>
                    <div className="genre-screen__wrapper">
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={() => {}}
                                onFocus={() => {
                                    setFocusedIndexSecond(() => index);
                                    setFocusedIndexVertical(() => 1);
                                }}
                                game={game}
                                key={`game-card-1-${index}`}
                                focused={false}
                                isFocused={index === focusedIndexSecond && focusedIndexVertical === 1}
                                navigableId={`1-${index}`}
                                indexX={focusedIndexSecond}
                                indexY={focusedIndexVertical}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="genre-screen__title" style={movementStyle}>
                        CATEGORY 3
                    </h1>
                    <div className="genre-screen__wrapper">
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={() => {}}
                                onFocus={() => {
                                    setFocusedIndexThird(() => index);
                                    setFocusedIndexVertical(() => 2);
                                }}
                                game={game}
                                key={`game-card-2-${index}`}
                                focused={false}
                                isFocused={index === focusedIndexThird && focusedIndexVertical === 2}
                                navigableId={`2-${index}`}
                                indexX={focusedIndexThird}
                                indexY={focusedIndexVertical}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="genre-screen__title" style={movementStyle}>
                        CATEGORY 4
                    </h1>
                    <div className="genre-screen__wrapper">
                        {games.map((game: Game, index: number) => (
                            <GameCard
                                onClick={() => {}}
                                onFocus={() => {
                                    setFocusedIndexFourth(() => index);
                                    setFocusedIndexVertical(() => 3);
                                }}
                                game={game}
                                key={`game-card-3-${index}`}
                                focused={false}
                                isFocused={index === focusedIndexFourth && focusedIndexVertical === 3}
                                navigableId={`3-${index}`}
                                indexX={focusedIndexFourth}
                                indexY={focusedIndexVertical}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default screenReady(GameScreen);
