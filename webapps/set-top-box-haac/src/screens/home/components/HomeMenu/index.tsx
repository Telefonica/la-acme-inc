import './HomeMenu.scss';

import React from 'react';
import { NavigableWrapper } from '@telefonica/la-web-sdk';
import { Platform } from '../../../../../../../dialogs/src/models';

export interface HomeMenuProps {
    platforms: Platform[];
    goToHome: Function;
}

const HomeMenu: React.FC<HomeMenuProps> = ({ platforms, goToHome }: HomeMenuProps) => {
    return (
        <div className="home-menu">
            <ul className="home-menu__list">
                {platforms.map((platform) => (
                    <NavigableWrapper
                        onClick={() => goToHome(platform.id)}
                        id={platform.id}
                        key={platform.id}
                        focusedClass="home-menu__menu-focused"
                    >
                        <li className="home-menu__menu-item">{platform.name}</li>
                    </NavigableWrapper>
                ))}
            </ul>
        </div>
    );
};

export default HomeMenu;
