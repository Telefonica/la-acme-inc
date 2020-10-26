import './cart.scss';

import React, { useState } from 'react';
import { NavigableWrapper, screenReady } from '@telefonica/la-web-sdk';
import { Entity, Intent, CartScreenData } from '../../../../../dialogs/src/models';

const CartListScreen: React.FC<CartScreenData> = (cart: CartScreenData) => {

    const [navigationState, setNavigationState] = useState(false);

    const toggleNavigation = () => {

    }
    
    return (
        <div className="cart-screen">
            <ul className="cart-screen__list">
                <li className="cart-screen__item">
                    <div className="cart-screen__name">NAME</div>
                    <div className="cart-screen__quantity">QUANTITY</div>
                    <div className="cart-screen__price">PRICE</div>
                </li>
                <NavigableWrapper id="1">
                    <li className="cart-screen__item">
                        <div className="cart-screen__name">GAME NAME</div>
                        <div className="cart-screen__quantity">1</div>
                        <div className="cart-screen__price">60€</div>
                    </li>
                </NavigableWrapper>
            </ul>
        </div>
    );
};

export default screenReady(CartListScreen);
