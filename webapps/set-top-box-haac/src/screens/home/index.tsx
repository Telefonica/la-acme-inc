import './home.scss';

import React, { useState } from 'react';
import { screenReady, NavigableWrapper, useAura } from '@telefonica/la-web-sdk';
import { Game, GameScreenData, Intent } from '../../../../../dialogs/src/models';
import GameCard from '../../components/GameCard';
import MusicCard from '../../components/MusicCard';
interface Test {
    screenData: GameScreenData;
}

const HomeScreen: React.FC<Test> = (data: Test) => {
    const { games } = data.screenData;
    const { sendCommand } = useAura();

    const [focusedIndex, setFocusedIndex] = useState(0);
    const [focusedIndexSecond, setFocusedIndexSecond] = useState(0);
    const [focusedIndexThird, setFocusedIndexThird] = useState(0);
    const [focusedIndexFourth, setFocusedIndexFourth] = useState(0);
    const [focusedIndexVertical, setFocusedIndexVertical] = useState(0);

    const movementStyle = { transform: `translateY(-${focusedIndexVertical * 417}px)` };

    const goToGame = (gameId: number) => {
        sendCommand({ intent: Intent.GAME, entities: [{ type: 'gameId', entity: gameId }] });
    };

    return (
        <div className="home-screen">
            <div className="home-screen__menu">
                <ul>
                    <NavigableWrapper id="pc" focusedClass="home-screen__menu-focused">
                        <li className="home-screen__menu-item">PC</li>
                    </NavigableWrapper>

                    <NavigableWrapper id="ps4" focusedClass="home-screen__menu-focused">
                        <li className="home-screen__menu-item">PS4</li>
                    </NavigableWrapper>

                    <NavigableWrapper id="xbox" focusedClass="home-screen__menu-focused">
                        <li className="home-screen__menu-item">XBOX</li>
                    </NavigableWrapper>

                    <NavigableWrapper id="switch" focusedClass="home-screen__menu-focused">
                        <li className="home-screen__menu-item">SWITCH</li>
                    </NavigableWrapper>
                </ul>
            </div>
            <div className="home-screen__games">
                <div className="home-screen__top-menu">
                    <div className="home-screen__top-platform">PLATAFORMA</div>
                    <NavigableWrapper id="trolley" focusedClass="home-screen__menu-focused">
                        <div className="home-screen__top-trolley">CARRITO</div>
                    </NavigableWrapper>
                </div>
                <div className="home-screen__games-wrapper">
                    <div>
                        <h1 className="home-screen__title" style={movementStyle}>
                            CATEGORY 1
                        </h1>
                        <div className="home-screen__wrapper">
                            {games.map((game: Game, index: number) => (
                                <MusicCard
                                    onClick={() => goToGame(game.id)}
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
                                    border
                                    scale
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h1 className="home-screen__title" style={movementStyle}>
                            CATEGORY 2
                        </h1>
                        <div className="home-screen__wrapper">
                            {games.map((game: Game, index: number) => (
                                <GameCard
                                    onClick={() => goToGame(game.id)}
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
                        <h1 className="home-screen__title" style={movementStyle}>
                            CATEGORY 3
                        </h1>
                        <div className="home-screen__wrapper">
                            {games.map((game: Game, index: number) => (
                                <GameCard
                                    onClick={() => goToGame(game.id)}
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
                        <h1 className="home-screen__title" style={movementStyle}>
                            CATEGORY 4
                        </h1>
                        <div className="home-screen__wrapper">
                            {games.map((game: Game, index: number) => (
                                <GameCard
                                    onClick={() => goToGame(game.id)}
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
        </div>
    );
};

export default screenReady(HomeScreen);
