import './home.scss';

import React, { useState, useEffect } from 'react';
import { screenReady, useAura, useBackground } from '@telefonica/la-web-sdk';
import { HomeScreenData, Intent, GameCard, Entity, Categories } from '../../../../../dialogs/src/models';

import GameCardComponent from '../../components/GameCardComponent';

import HomeMenu from './components/HomeMenu';
import HomeTopMenu from './components/HomeTopMenu';

import styled from 'styled-components';

interface CarouselTitleProps {
    focusedIndexVertical: number;
}

const CarouselTitle = styled.div<CarouselTitleProps>`
    font-size: 26px;
    height: 50px;
    transform: ${(props) => `translateY(-${props.focusedIndexVertical * 400}px)`};
`;
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

    const goToGame = (gameId: string) => {
        sendCommand({ intent: Intent.GAME, entities: [{ type: Entity.GAMEID, entity: gameId }] });
    };

    const goToHome = (platformId: string) => {
        sendCommand({ intent: Intent.HOME, entities: [{ type: Entity.PLTID, entity: platformId }] });
    };

    const goToCart = () => {
        sendCommand({ intent: Intent.CART, entities: [] });
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
                <HomeMenu goToHome={goToHome} platforms={platforms} />
            </div>
            <div className="home-screen__games">
                <HomeTopMenu platformTitle={platformTitle} goToCart={goToCart} />
                <div className="home-screen__carousels-wrapper">
                    {Object.keys(games).map((key, indexCategory) => (
                        <div className="home-screen__carousel" key={`game-carousel-0-${indexCategory}`}>
                            <CarouselTitle focusedIndexVertical={focusedIndexVertical}>
                                {Categories[key as keyof typeof Categories].toUpperCase()}
                            </CarouselTitle>
                            <div className="home-screen__cards-wrapper">
                                {games[key as string].map((game: GameCard, indexCard: number) => (
                                    <GameCardComponent
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
