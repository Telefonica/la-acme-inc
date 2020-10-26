import './cart.scss';

import React, { useState } from 'react';
import { NavigableWrapper, NavigableButton, screenReady } from '@telefonica/la-web-sdk';
import { CartScreenData } from '../../../../../dialogs/src/models';

const CartScreen: React.FC<CartScreenData> = (cart: CartScreenData) => {
    const [navigationState, setNavigationState] = useState(false);
    const { games } = cart;
    
    const toggleNavigationState = () => setNavigationState((navigationState) => !navigationState)

    return (
        <div className="cart-screen">
            <div className="game-screen__buttons">
                {!navigationState ? (
                    <NavigableButton
                        id="back"
                        onClick={() => console.log('aaaa')}
                        makeFocused={true}
                        defaultClass="game-screen__button"
                    >
                        BACK
                    </NavigableButton>
                ) : (
                    <button>BACK</button>
                )}
            </div>
            {!navigationState ? (
                <NavigableWrapper
                    id="list"
                    focusedClass="cart-screen__focused"
                    onClick={toggleNavigationState}
                >
                    <ul className="cart-screen__list">
                        <li className="cart-screen__item">
                            <div className="cart-screen__name">NAME</div>
                            <div className="cart-screen__quantity">QUANTITY</div>
                            <div className="cart-screen__price">PRICE</div>
                        </li>
                        {games.map((game, index) => {
                            if (navigationState) {
                                return (
                                    <NavigableWrapper
                                        id={`cart-item-${index}`}
                                        defaultFocused={index === 0}
                                        focusedClass="cart-screen__focused"
                                    >
                                        <li className="cart-screen__item">
                                            <div className="cart-screen__name">{game.title}</div>
                                            <div className="cart-screen__quantity">{game.quantity}</div>
                                            <div className="cart-screen__price">{game.price}F</div>
                                        </li>
                                    </NavigableWrapper>
                                );
                            } else {
                                return (
                                    <li className="cart-screen__item">
                                        <div className="cart-screen__name">{game.title}</div>
                                        <div className="cart-screen__quantity">{game.quantity}</div>
                                        <div className="cart-screen__price">{game.price}</div>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </NavigableWrapper>
            ) : (
                <ul className="cart-screen__list">
                    <li className="cart-screen__item">
                        <div className="cart-screen__name">NAME</div>
                        <div className="cart-screen__quantity">QUANTITY</div>
                        <div className="cart-screen__price">PRICE</div>
                    </li>
                    {games.map((game, index) => {
                        if (navigationState) {
                            return (
                                <NavigableWrapper
                                    id={`cart-item-${index}`}
                                    defaultFocused={index === 0}
                                    leftPressed={toggleNavigationState}
                                    focusedClass="cart-screen__focused"
                                >
                                    <li className="cart-screen__item">
                                        <div className="cart-screen__name">{game.title}</div>
                                        <div className="cart-screen__quantity">{game.quantity}</div>
                                        <div className="cart-screen__price">{game.price}</div>
                                    </li>
                                </NavigableWrapper>
                            );
                        } else {
                            return (
                                <li className="cart-screen__item">
                                    <div className="cart-screen__name">{game.title}</div>
                                    <div className="cart-screen__quantity">{game.quantity}</div>
                                    <div className="cart-screen__price">{game.price}</div>
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
