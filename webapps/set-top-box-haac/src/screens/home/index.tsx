import './home.scss';

import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { toggleNavigation, navigationSaga } from '../../redux/actions/navigationActions';
import { AuraCommands, screenReady, useAura, useActions } from '@telefonica/la-web-sdk';
import { HomeScreenData, Intent, GameCard, Entity, Categories, Operation } from '../../../../../dialogs/src/models';

import HomeMenu from './components/HomeMenu';
import HomeTopMenu from './components/HomeTopMenu';

import withProvider from './withProvider';
import {
    SCCarousel,
    MusicCard,
    ShopCard,
    AnimatedCard1,
    AnimatedCard2,
    AnimatedCard4,
} from '@telefonica/la-components';
import { FUNCTION_DONE } from '../../redux/types';

const HomeScreen: React.FC<HomeScreenData> = (screenData: HomeScreenData) => {
    const { platformTitle, platforms, games } = screenData;
    const { sendCommand } = useAura();

    const dispatch = useDispatch();

    const actionHandler = useCallback(
        (actions: any) => {
            if (actions && actions.length > 0) {
                interface DoAction {
                    [key: string]: Function;
                }
                const doAction: DoAction = {
                    toggleNavigation: () => dispatch(toggleNavigation()),
                };

                doAction[actions[0].name] && doAction[actions[0].name]();
            }
        },
        [dispatch],
    );
    useActions(actionHandler);

    useEffect(() => {
        dispatch({ type: FUNCTION_DONE });
    }, [dispatch]);

    const goToGame = async (gameId: string) => {
        await sendCommand(AuraCommands.getAuraCommandSingle(Operation.GAME, { type: Entity.GAMEID, entity: gameId }));
    };

    const goToHome = (platformId: string) => {
        sendCommand(AuraCommands.getAuraCommandSingle(Intent.HOME, { type: Entity.PLTID, entity: platformId }));
    };

    const goToCart = () => {
        sendCommand(AuraCommands.getAuraCommand(Operation.CART));
    };

    return (
        <div className="home-screen">
            <div className="home-screen__menu">
                <HomeMenu goToHome={goToHome} platforms={platforms} />
            </div>
            <div className="home-screen__games">
                <HomeTopMenu platformTitle={platformTitle} goToCart={goToCart} />
                <div className="home-screen__carousels-wrapper">
                    {Object.keys(games).map((key, verticalIndex) => {
                        if (verticalIndex === 0) {
                            return (
                                <SCCarousel
                                    id={`carousel${verticalIndex}`}
                                    key={`carousel-${verticalIndex}`}
                                    title={Categories[key as keyof typeof Categories].toUpperCase()}
                                    selectorBorderRadius={15}
                                    extraHeight={100}
                                    focusedClass={'game-card__focused'}
                                >
                                    {games[key as string].map((game: GameCard, indexCard: number) => (
                                        <ShopCard
                                            key={`game-card-${verticalIndex}-${indexCard}`}
                                            title={game.title}
                                            color={game.dominantColor}
                                            price={game.price}
                                            image={game.image}
                                            text={game.company}
                                            onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                        />
                                    ))}
                                </SCCarousel>
                            );
                        }
                        if (verticalIndex === 1) {
                            return (
                                <SCCarousel
                                    id={`carousel${verticalIndex}`}
                                    key={`carousel-${verticalIndex}`}
                                    title={Categories[key as keyof typeof Categories].toUpperCase()}
                                    selectorBorderRadius={15}
                                    extraHeight={100}
                                >
                                    {games[key as string].map((game: GameCard, indexCard: number) => (
                                        <MusicCard
                                            title={game.title}
                                            text={game.company}
                                            image={game.image}
                                            color={game.dominantColor}
                                            onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                            key={`music-card-${indexCard}`}
                                        />
                                    ))}
                                </SCCarousel>
                            );
                        }
                        if (verticalIndex === 2) {
                            return (
                                <SCCarousel
                                    id={`carousel${verticalIndex}`}
                                    key={`carousel-${verticalIndex}`}
                                    title={Categories[key as keyof typeof Categories].toUpperCase()}
                                    focusedClass={'view-third-focused'}
                                    extraHeight={100}
                                >
                                    {games[key as string].map((game: GameCard, indexCard: number) => (
                                        <AnimatedCard1
                                            key={`game-card-${verticalIndex}-${indexCard}`}
                                            title={game.title}
                                            image={game.image}
                                            text={game.company}
                                            info="BUY NOW"
                                            onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                        />
                                    ))}
                                </SCCarousel>
                            );
                        }
                        if (verticalIndex === 3) {
                            return (
                                <SCCarousel
                                    id={`carousel${verticalIndex}`}
                                    key={`carousel-${verticalIndex}`}
                                    title={Categories[key as keyof typeof Categories].toUpperCase()}
                                    focusedClass={'view-fourth-focused'}
                                    extraHeight={100}
                                >
                                    {games[key as string].map((game: GameCard, indexCard: number) => (
                                        <AnimatedCard2
                                            key={`game-card-${verticalIndex}-${indexCard}`}
                                            title={game.title}
                                            image={game.image}
                                            text={game.company}
                                            info="BUY NOW"
                                            onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                        />
                                    ))}
                                </SCCarousel>
                            );
                        }
                        return (
                            <SCCarousel
                                id={`carousel${verticalIndex}`}
                                key={`carousel-${verticalIndex}`}
                                title={Categories[key as keyof typeof Categories].toUpperCase()}
                                focusedClass={'view-first-focused'}
                                gapPx={15}
                                extraHeight={100}
                            >
                                {games[key as string].map((game: GameCard, indexCard: number) => (
                                    <AnimatedCard4
                                        key={`game-card-${verticalIndex}-${indexCard}`}
                                        title={game.title}
                                        image={game.image}
                                        text={game.company}
                                        info="BUY NOW"
                                        onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                    />
                                ))}
                            </SCCarousel>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default screenReady(withProvider(HomeScreen));
