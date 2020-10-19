import './GameCard.scss';

import React from 'react';
import { Game } from '../../../../../dialogs/src/models';
import { NavigableWrapper } from '@telefonica/la-web-sdk';

//import LazyImages from '../Hocs/withLazyLoader/LazyImage';

interface GameCardProps {
    game: Game;
    focused: boolean;
    isFocused: boolean;
    onClick: Function;
    onFocus: Function;
    navigableId: string;
    indexY: number;
    indexX: number;
}

const GameCard: React.FC<GameCardProps> = ({
    game,
    focused,
    isFocused,
    onClick,
    onFocus,
    navigableId,
    indexY,
    indexX,
}: GameCardProps) => {
    const Ypx = 417;
    const Xpx = 360;
    const movementStyle = {
        transform: isFocused
            ? `translate(-${indexX * Xpx}px, -${indexY * Ypx}px) scale(1.1)`
            : `translate(-${indexX * Xpx}px, -${indexY * Ypx}px)`,
    };

    return (
        <NavigableWrapper
            onClick={onClick}
            onFocus={onFocus}
            focusedClass="game-card__focused"
            defaultFocused={focused}
            id={navigableId}
        >
            <div className="game-card" key={game.id} style={movementStyle}>
                <img className="game-card__image" src={game.background_image} alt={game.name} />
                <div
                    className="game-card__info"
                    style={{
                        backgroundColor: game.dominant_color,
                    }}
                >
                    <div className="game-card__info__text">
                        <p className="game-card__info__text__title">{game.name}</p>
                        <p className="game-card__info__text__company">{game.company}</p>
                    </div>
                    <p className="game-card__info__price">{game.price}</p>
                </div>
            </div>
        </NavigableWrapper>
    );
};

export default GameCard;
