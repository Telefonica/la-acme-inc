import './HomeTopMenu.scss';

import React from 'react';
import { NavigableWrapper } from '@telefonica/la-web-sdk';

import { ReactComponent as Cart } from '../../../../../public/assets/imgs/shopping-cart.svg';

export interface HomeTopMenuProps {
    platformTitle: string;
    goToCart: Function;
}

const HomeTopMenu: React.FC<HomeTopMenuProps> = ({ platformTitle, goToCart }: HomeTopMenuProps) => {
    return (
        <div className="home-top-menu">
            <div className="home-top-menu__platform">{platformTitle}</div>
            <NavigableWrapper onClick={() => goToCart()} id="cart" focusedClass="home-top-menu__cart-focused">
                <div className="home-top-menu__cart">
                    <Cart fill="white" />
                </div>
            </NavigableWrapper>
        </div>
    );
};

export default HomeTopMenu;
