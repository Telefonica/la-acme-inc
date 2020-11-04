import './cart.scss';

import React, { useState } from 'react';
import { NavigableWrapper, screenReady } from '@telefonica/la-web-sdk';
import { Entity, Intent, CartScreenData } from '../../../../../dialogs/src/models';

const CartItem: React.FC<CartScreenData> = (cart: CartScreenData) => {

    const [navigationState, setNavigationState] = useState(false);

    const toggleNavigation = () => {

    }
    
    return (
        <li className="cart-screen__item">
            <div className="cart-screen__name">NAME</div>
            <div className="cart-screen__quantity">QUANTITY</div>
            <div className="cart-screen__price">PRICE</div>
        </li>
    );
};

export default screenReady(CartItem);
