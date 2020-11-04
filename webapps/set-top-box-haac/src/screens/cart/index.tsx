import './cart.scss';

import React from 'react';
import { NavigableWrapper, NavigableButton, screenReady, useAura } from '@telefonica/la-web-sdk';
import { CartScreenData, Entity, Operation } from '../../../../../dialogs/src/models';

const CartScreen: React.FC<CartScreenData> = (cart: CartScreenData) => {
    const { games } = cart;
    const { sendCommand } = useAura();

    const deleteItem = (gameId: string) => {
        sendCommand({ intent: Operation.REMOVE_CART, entities: [{ type: Entity.GAMEID, entity: gameId }] });
    };

    const goBack = () => {
        sendCommand({ intent: Operation.BACK, entities: [] });
    };

    return (
        <div className="cart-screen">
            <div className="game-screen__buttons">
                <ul className="cart-screen__list">
                    {games.map((game, index) => {
                        return (
                            <li className="cart-screen__item" key={`card-item-${index}`}>
                                <div className="cart-screen__name">{game.title}</div>
                                <div className="cart-screen__quantity">{game.quantity}</div>
                                <NavigableWrapper
                                    id={`cart-item-${index}`}
                                    defaultFocused={index === 0}
                                    onClick={() => deleteItem(game.id)}
                                    focusedClass="cart-screen__focused"
                                >
                                    <div className="cart-screen__delete">X</div>
                                </NavigableWrapper>
                            </li>
                        );
                    })}
                </ul>
                <NavigableButton id="back" onClick={goBack} makeFocused={true} defaultClass="game-screen__button">
                    BACK
                </NavigableButton>
            </div>
        </div>
    );
};

export default screenReady(CartScreen);
