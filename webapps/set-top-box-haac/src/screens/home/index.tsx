import './home.scss';

import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { toggleNavigation, navigationSaga } from '../../redux/actions/navigationActions';
import { AuraCommands, screenReady, useAura, useActions } from '@telefonica/la-web-sdk';
import { HomeScreenData, Intent, GameCard, Entity, Categories, Operation } from '../../../../../dialogs/src/models';

import HomeMenu from './components/HomeMenu';
import HomeTopMenu from './components/HomeTopMenu';

import withProvider from './withProvider';
import Carousel from '../../components/Carousel';
import GameCardComponent from '../../components/GameCardComponent';

const HomeScreen: React.FC<HomeScreenData> = (screenData: HomeScreenData) => {
    const { platformTitle, platforms, games } = screenData;
    const { sendCommand } = useAura();

    const [focusedIndexVertical, setFocusedVerticalIndex] = useState(0);
    const [refTest, setRefTest] = useState<React.MutableRefObject<HTMLDivElement[]>>({ current: [] });

    const itemsRef = useRef([]) as React.MutableRefObject<HTMLDivElement[]>;
    const addToRefs = (el: HTMLDivElement) => el && !itemsRef.current.includes(el) && itemsRef.current.push(el);

    const addToRefsv2 = useCallback(
        (el: HTMLDivElement) => {
            setRefTest((ref) => {
                return {
                    current: [...ref.current, el],
                };
            });
        },
        [setRefTest],
    );

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
                    {Object.keys(games).map((key, verticalIndex) => (
                        <Carousel
                            key={`carousel-${verticalIndex}`}
                            title={Categories[key as keyof typeof Categories].toUpperCase()}
                            verticalIndex={verticalIndex}
                            focusedVerticalIndex={focusedIndexVertical}
                            setFocusedVerticalIndex={setFocusedVerticalIndex}
                            itemsRef={refTest}
                            isActive={isActive}
                        >
                            {games[key as string].map((game: GameCard, indexCard: number) => (
                                <GameCardComponent
                                    game={game}
                                    key={`game-card-0-${indexCard}`}
                                    onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                    addToRefs={addToRefsv2}
                                />
                            ))}
                        </Carousel>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default screenReady(withProvider(HomeScreen));
