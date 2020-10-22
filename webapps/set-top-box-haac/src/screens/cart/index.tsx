import './game.scss';

import React, { useEffect } from 'react';
import { screenReady, NavigableButton, useBackground, useAura, Preloadable } from '@telefonica/la-web-sdk';
import Metacritic from '../../components/Metacritic';
import { Entity, Intent, CartScreenData } from '../../../../../dialogs/src/models';

const CartScreen: React.FC<Preloadable> = ({ screenData }: { screenData: CartScreenData }) => {
    return <div></div>;
};

export default screenReady(CartScreen);
