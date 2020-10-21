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

    const [cardFocused, setCardFocused] = useState(false);

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
                                        setCardFocused((isFocused) => !isFocused);
                                    }}
                                    onBlur={() => setCardFocused((isFocused) => !isFocused)}
                                    game={game}
                                    key={`game-card-0-${index}`}
                                    focused={index === 0}
                                    isFocused={index === focusedIndex && focusedIndexVertical === 0 && cardFocused}
                                    navigableId={`0-${index}`}
                                    indexX={focusedIndex}
                                    indexY={focusedIndexVertical}
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
                                        setCardFocused((isFocused) => !isFocused);
                                    }}
                                    onBlur={() => setCardFocused((isFocused) => !isFocused)}
                                    game={game}
                                    key={`game-card-1-${index}`}
                                    focused={false}
                                    isFocused={
                                        index === focusedIndexSecond && focusedIndexVertical === 1 && cardFocused
                                    }
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
                                        setCardFocused((isFocused) => !isFocused);
                                    }}
                                    onBlur={() => setCardFocused((isFocused) => !isFocused)}
                                    game={game}
                                    key={`game-card-2-${index}`}
                                    focused={false}
                                    isFocused={index === focusedIndexThird && focusedIndexVertical === 2 && cardFocused}
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
                                        setCardFocused((isFocused) => !isFocused);
                                    }}
                                    onBlur={() => setCardFocused((isFocused) => !isFocused)}
                                    game={game}
                                    key={`game-card-3-${index}`}
                                    focused={false}
                                    isFocused={
                                        index === focusedIndexFourth && focusedIndexVertical === 3 && cardFocused
                                    }
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
