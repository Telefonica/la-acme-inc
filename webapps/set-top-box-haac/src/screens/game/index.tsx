import './game.scss';

import React, { useEffect } from 'react';
import { screenReady, NavigableButton, useBackground, useAura } from '@telefonica/la-web-sdk';
import Metacritic from '../../components/Metacritic';
import { Entity, Intent, GameScreenData, Categories } from '../../../../../dialogs/src/models';

const GameScreen: React.FC<GameScreenData> = (screenData: GameScreenData) => {
    const { sendCommand } = useAura();
    const { setBackground, clearBackground } = useBackground();

    const { game, platformId } = screenData;
    const { id, videoUrl, image, title, metacritic, company, price, category, description } = game;

    const goToHome = (platformId: string) => {
        sendCommand({ intent: Intent.HOME, entities: [{ type: Entity.PLTID, entity: platformId }] });
    };

    const addToCard = (platformId: string, gameId: string, title: string, quantity = 1) => {
        sendCommand({
            intent: Intent.ADD_CART,
            entities: [
                { type: Entity.PLTID, entity: platformId },
                { type: Entity.GAMEID, entity: gameId },
                { type: Entity.GAMETITLE, entity: title },
                { type: Entity.QUANTITY, entity: quantity },
            ],
        });
    };

    useEffect(() => {
        setBackground(image);
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
                    onClick={() => goToHome(platformId)}
                    makeFocused={true}
                    defaultClass="game-screen__button"
                >
                    BACK
                </NavigableButton>
                <NavigableButton
                    id="buy"
                    onClick={() => addToCard(platformId, id, title)}
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
