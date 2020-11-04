import './cart.scss';

import React from 'react';
import { screenReady } from '@telefonica/la-web-sdk';
import { CartScreenData } from '../../../../../dialogs/src/models';

const CartListScreen: React.FC<CartScreenData> = (cart: CartScreenData) => {
    return <div>{cart}</div>;
};

export default screenReady(CartListScreen);
