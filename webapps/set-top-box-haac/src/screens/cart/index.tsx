import './cart.scss';

import React, { useState } from 'react';
import { NavigableWrapper, NavigableButton, screenReady, useAura } from '@telefonica/la-web-sdk';
import { CartScreenData, Entity, Intent } from '../../../../../dialogs/src/models';

const CartScreen: React.FC<CartScreenData> = (cart: CartScreenData) => {
    const [navigationState, setNavigationState] = useState(false);
    const { games } = cart;
    const { sendCommand } = useAura();

    const toggleNavigationState = () => setNavigationState((navigationState) => !navigationState);

    const deleteItem = (gameId: string) => {
        sendCommand({ intent: Intent.CART, entities: [{ type: Entity.GAMEID, entity: gameId }] });
    };

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    return (
        <div className="cart-screen">
            <div className="game-screen__buttons">
                {!navigationState ? (
                    <NavigableButton
                        id="back"
                        onClick={() => goToHome()}
                        makeFocused={true}
                        defaultClass="game-screen__button"
                    >
                        BACK
                    </NavigableButton>
                ) : (
                    <button onClick={() => goToHome()}>BACK</button>
                )}
            </div>
            {!navigationState ? (
                <NavigableWrapper id="list" focusedClass="cart-screen__focused" onClick={toggleNavigationState}>
                    <ul className="cart-screen__list">
                        {games.map((game, index) => {
                            if (navigationState) {
                                return (
                                    <li className="cart-screen__item">
                                        <div className="cart-screen__name">{game.title}</div>
                                        <div className="cart-screen__quantity">{game.quantity}</div>
                                        <NavigableWrapper
                                            id={`cart-item-${index}`}
                                            defaultFocused={index === 0}
                                            focusedClass="cart-screen__focused"
                                        >
                                            <button className="cart-screen__delete" onClick={() => deleteItem(game.id)}>
                                                X
                                            </button>
                                        </NavigableWrapper>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="cart-screen__item">
                                        <div className="cart-screen__name">{game.title}</div>
                                        <div className="cart-screen__quantity">{game.quantity}</div>
                                        <button className="cart-screen__delete" onClick={() => deleteItem(game.id)}>
                                            X
                                        </button>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </NavigableWrapper>
            ) : (
                <ul className="cart-screen__list">
                    {games.map((game, index) => {
                        if (navigationState) {
                            return (
                                <li className="cart-screen__item">
                                    <div className="cart-screen__name">{game.title}</div>
                                    <div className="cart-screen__quantity">{game.quantity}</div>
                                    <NavigableWrapper
                                        id={`cart-item-${index}`}
                                        defaultFocused={index === 0}
                                        leftPressed={toggleNavigationState}
                                        focusedClass="cart-screen__focused"
                                    >
                                        <button className="cart-screen__delete" onClick={() => deleteItem(game.id)}>
                                            X
                                        </button>
                                    </NavigableWrapper>
                                </li>
                            );
                        } else {
                            return (
                                <li className="cart-screen__item">
                                    <div className="cart-screen__name">{game.title}</div>
                                    <div className="cart-screen__quantity">{game.quantity}</div>
                                    <button className="cart-screen__delete" onClick={() => deleteItem(game.id)}>
                                        X
                                    </button>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
        </div>
    );
};

export default screenReady(CartScreen);
