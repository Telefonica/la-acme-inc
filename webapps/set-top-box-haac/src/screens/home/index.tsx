import './home.scss';

import React, { useState, useEffect } from 'react';
import { screenReady, NavigableWrapper, useAura, Preloadable, useBackground } from '@telefonica/la-web-sdk';
import { HomeScreenData, Intent, GameCard, Entity, Categories } from '../../../../../dialogs/src/models';
import MusicCard from '../../components/MusicCard';


const HomeScreen: React.FC<HomeScreenData> = (screenData: HomeScreenData) => {
    const { platformTitle, platforms, games, backgrounds } = screenData;
    const { sendCommand } = useAura();
    const { setBackground, clearBackground } = useBackground();

    const [cardFocused, setCardFocused] = useState(false);

    const [focusedIndex, setFocusedIndex] = useState(0);
    const [focusedIndexSecond, setFocusedIndexSecond] = useState(0);
    const [focusedIndexThird, setFocusedIndexThird] = useState(0);
    const [focusedIndexFourth, setFocusedIndexFourth] = useState(0);
    const [focusedIndexVertical, setFocusedIndexVertical] = useState(0);

    useEffect(() => {
        setBackground(backgrounds[focusedIndexVertical]);
    }, [setBackground, clearBackground, focusedIndexVertical, backgrounds]);

    const movementStyle = { transform: `translateY(-${focusedIndexVertical * 417}px)` };

    const goToGame = (gameId: string) => {
        sendCommand({ intent: Intent.GAME, entities: [{ type: Entity.GAMEID, entity: gameId }] });
    };

    const goToHome = (platformId: string) => {
        sendCommand({ intent: Intent.HOME, entities: [{ type: Entity.PLTID, entity: platformId }] });
    };

    interface switchObject<TValue> {
        [id: string]: TValue;
    }

    const focusedIndexFunctions: switchObject<Function> = {
        0: setFocusedIndex,
        1: setFocusedIndexSecond,
        2: setFocusedIndexThird,
        3: setFocusedIndexFourth,
    };

    const focusedIndexes: switchObject<number> = {
        0: focusedIndex,
        1: focusedIndexSecond,
        2: focusedIndexThird,
        3: focusedIndexFourth,
    };

    const isFocused = (indexCategory: number, indexCard: number) =>
        indexCard === focusedIndexes[indexCategory] && focusedIndexVertical === indexCategory && cardFocused;

    return (
        <div className="home-screen">
            <div className="home-screen__menu">
                <ul>
                    {platforms.map((platform) => (
                        <NavigableWrapper
                            onClick={() => goToHome(platform.id)}
                            id={platform.id}
                            key={platform.id}
                            focusedClass="home-screen__menu-focused"
                        >
                            <li className="home-screen__menu-item">{platform.name}</li>
                        </NavigableWrapper>
                    ))}
                </ul>
            </div>
            <div className="home-screen__games">
                <div className="home-screen__top-menu">
                    <div className="home-screen__top-platform">{platformTitle}</div>
                    <NavigableWrapper id="trolley" focusedClass="home-screen__menu-focused">
                        <div className="home-screen__top-trolley">CARRITO</div>
                    </NavigableWrapper>
                </div>
                <div className="home-screen__games-wrapper">
                    {Object.keys(games).map((key, indexCategory) => (
                        <div key={`game-carousel-0-${indexCategory}`}>
                            <h1 className="home-screen__title" style={movementStyle}>
                                {Categories[key as keyof typeof Categories].toUpperCase()}
                            </h1>
                            <div className="home-screen__wrapper">
                                {games[key as string].map((game: GameCard, indexCard: number) => (
                                    <MusicCard
                                        onClick={() => goToGame(game.id)}
                                        onFocus={() => {
                                            focusedIndexFunctions[indexCategory](() => indexCard);
                                            setFocusedIndexVertical(() => indexCategory);
                                            setCardFocused((isFocused) => !isFocused);
                                        }}
                                        onBlur={() => setCardFocused((isFocused) => !isFocused)}
                                        game={game}
                                        key={`game-card-0-${indexCard}`}
                                        focused={indexCard === 0 && indexCategory === 0}
                                        isFocused={isFocused(indexCategory, indexCard)}
                                        navigableId={`${indexCard}-${indexCategory}`}
                                        indexX={focusedIndexes[indexCategory]}
                                        indexY={focusedIndexVertical}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default screenReady(HomeScreen);
