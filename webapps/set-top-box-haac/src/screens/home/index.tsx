import './home.scss';
import '../../components/AnimatedCards/AnimatedDefault.scss';

import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { toggleNavigation, navigationSaga } from '../../redux/actions/navigationActions';
import { AuraCommands, screenReady, useAura, useActions } from '@telefonica/la-web-sdk';
import { HomeScreenData, Intent, GameCard, Entity, Categories, Operation } from '../../../../../dialogs/src/models';

import HomeMenu from './components/HomeMenu';
import HomeTopMenu from './components/HomeTopMenu';

import withProvider from './withProvider';
import Carousel from '../../components/Carousel';
import GameCardComponent from '../../components/GameCardComponent';
import AnimatedCard1 from '../../components/AnimatedCards/AnimatedCard1';
import AnimatedCard2 from '../../components/AnimatedCards/AnimatedCard2';
import AnimatedCard3 from '../../components/AnimatedCards/AnimatedCard3';
import AnimatedCard4 from '../../components/AnimatedCards/AnimatedCard4';
import { FUNCTION_DONE } from '../../redux/types';

const HomeScreen: React.FC<HomeScreenData> = (screenData: HomeScreenData) => {
    const { platformTitle, platforms, games } = screenData;
    const { sendCommand } = useAura();

    const [focusedIndexVertical, setFocusedVerticalIndex] = useState(0);

    const dispatch = useDispatch();
    const { isActive } = useSelector((state: RootStateOrAny) => state.navigation);

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
                                <Carousel
                                    key={`carousel-${verticalIndex}`}
                                    title={Categories[key as keyof typeof Categories].toUpperCase()}
                                    verticalIndex={verticalIndex}
                                    focusedVerticalIndex={focusedIndexVertical}
                                    setFocusedVerticalIndex={setFocusedVerticalIndex}
                                    isActive={isActive}
                                    focusedClass={'game-card__focused'}
                                >
                                    {games[key as string].map((game: GameCard, indexCard: number) => (
                                        <GameCardComponent
                                            game={game}
                                            key={`game-card-${verticalIndex}-${indexCard}`}
                                            onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                        />
                                    ))}
                                </Carousel>
                            );
                        }
                        if (verticalIndex === 1) {
                            return (
                                <Carousel
                                    key={`carousel-${verticalIndex}`}
                                    title={Categories[key as keyof typeof Categories].toUpperCase()}
                                    verticalIndex={verticalIndex}
                                    focusedVerticalIndex={focusedIndexVertical}
                                    setFocusedVerticalIndex={setFocusedVerticalIndex}
                                    isActive={isActive}
                                    focusedClass={'view-second-focused'}
                                >
                                    {games[key as string].map((game: GameCard, indexCard: number) => (
                                        <AnimatedCard2
                                            key={`game-card-${verticalIndex}-${indexCard}`}
                                            title={game.title}
                                            image={game.image}
                                            company={game.company}
                                            onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                        />
                                    ))}
                                </Carousel>
                            );
                        }
                        if (verticalIndex === 2) {
                            return (
                                <Carousel
                                    key={`carousel-${verticalIndex}`}
                                    title={Categories[key as keyof typeof Categories].toUpperCase()}
                                    verticalIndex={verticalIndex}
                                    focusedVerticalIndex={focusedIndexVertical}
                                    setFocusedVerticalIndex={setFocusedVerticalIndex}
                                    isActive={isActive}
                                    focusedClass={'view-third-focused'}
                                >
                                    {games[key as string].map((game: GameCard, indexCard: number) => (
                                        <AnimatedCard3
                                            key={`game-card-${verticalIndex}-${indexCard}`}
                                            title={game.title}
                                            image={game.image}
                                            company={game.company}
                                            onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                        />
                                    ))}
                                </Carousel>
                            );
                        }
                        if (verticalIndex === 3) {
                            return (
                                <Carousel
                                    key={`carousel-${verticalIndex}`}
                                    title={Categories[key as keyof typeof Categories].toUpperCase()}
                                    verticalIndex={verticalIndex}
                                    focusedVerticalIndex={focusedIndexVertical}
                                    setFocusedVerticalIndex={setFocusedVerticalIndex}
                                    isActive={isActive}
                                    focusedClass={'view-fourth-focused'}
                                >
                                    {games[key as string].map((game: GameCard, indexCard: number) => (
                                        <AnimatedCard4
                                            key={`game-card-${verticalIndex}-${indexCard}`}
                                            title={game.title}
                                            image={game.image}
                                            company={game.company}
                                            onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                        />
                                    ))}
                                </Carousel>
                            );
                        }
                        return (
                            <Carousel
                                key={`carousel-${verticalIndex}`}
                                title={Categories[key as keyof typeof Categories].toUpperCase()}
                                verticalIndex={verticalIndex}
                                focusedVerticalIndex={focusedIndexVertical}
                                setFocusedVerticalIndex={setFocusedVerticalIndex}
                                isActive={isActive}
                                focusedClass={'view-first-focused'}
                                gapPx={15}
                            >
                                {games[key as string].map((game: GameCard, indexCard: number) => (
                                    <AnimatedCard1
                                        key={`game-card-${verticalIndex}-${indexCard}`}
                                        title={game.title}
                                        image={game.image}
                                        company={game.company}
                                        onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                    />
                                ))}
                            </Carousel>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default screenReady(withProvider(HomeScreen));
