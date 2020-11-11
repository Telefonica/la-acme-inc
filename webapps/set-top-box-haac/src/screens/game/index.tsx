import './game.scss';

import React, { useEffect } from 'react';
import { screenReady, NavigableButton, useBackground, useAura, AuraCommands } from '@telefonica/la-web-sdk';
import Metacritic from '../../components/Metacritic';
import { Entity, GameScreenData, Categories, Operation } from '../../../../../dialogs/src/models';

const GameScreen: React.FC<GameScreenData> = (screenData: GameScreenData) => {
    const { sendCommand } = useAura();
    const { setBackground, clearBackground } = useBackground();

    const { game, platformId } = screenData;
    const { id, image, title, metacritic, company, price, category, description } = game;

    const goBack = (platformId: string) => {
        sendCommand(AuraCommands.getAuraCommandSingle(Operation.BACK, { type: Entity.PLTID, entity: platformId }));
    };

    const goToCart = () => {
        sendCommand(AuraCommands.getAuraCommand(Operation.CART));
    };

    const addToCart = (gameId: string, quantity = 1) => {
        sendCommand(
            AuraCommands.getAuraCommand(Operation.ADD_CART, [
                { type: Entity.GAMEID, entity: gameId },
                { type: Entity.QUANTITY, entity: quantity },
            ]),
        );
    };

    useEffect(() => {
        setBackground(image);
        return clearBackground;
    }, [setBackground, clearBackground, image]);

    return (
        <div className="game-screen">
            <div className="game-screen__container">
                <div className="game-screen__data">
                    <div className="game-screen__top-wrapper">
                        <div className="game-screen__title">{title}</div>
                        <div className="game-screen__info">
                            <div className="game-screen__company">{company}</div>
                            <div className="game-screen__category">
                                {Categories[category as keyof typeof Categories].toUpperCase()}
                            </div>
                            <div className="game-screen__price">{price}€</div>
                            <Metacritic score={metacritic} />
                        </div>
                    </div>
                    <div className="game-screen__description" dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </div>
            <div className="game-screen__buttons">
                <NavigableButton
                    id="back"
                    onClick={() => goBack(platformId)}
                    makeFocused={true}
                    defaultClass="game-screen__button"
                >
                    BACK
                </NavigableButton>
                <NavigableButton
                    id="back"
                    onClick={() => goToCart()}
                    makeFocused={true}
                    defaultClass="game-screen__button"
                >
                    CART
                </NavigableButton>
                <NavigableButton
                    id="buy"
                    onClick={() => addToCart(id)}
                    makeFocused={true}
                    defaultClass="game-screen__button"
                >
                    BUY
                </NavigableButton>
            </div>
        </div>
    );
};

export default screenReady(GameScreen);
