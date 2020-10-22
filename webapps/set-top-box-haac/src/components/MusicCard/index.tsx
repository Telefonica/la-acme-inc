import './MusicCard.scss';

import React from 'react';
import { GameCard } from '../../../../../dialogs/src/models';
import { NavigableWrapper } from '@telefonica/la-web-sdk';

//import LazyImages from '../Hocs/withLazyLoader/LazyImage';

interface MusicCardProps {
    game: GameCard;
    focused: boolean;
    isFocused: boolean;
    onClick: Function;
    onFocus: Function;
    onBlur: Function;
    navigableId: string;
    indexY: number;
    indexX: number;
}

const MusicCard: React.FC<MusicCardProps> = ({
    game,
    focused,
    isFocused,
    onClick,
    onFocus,
    onBlur,
    navigableId,
    indexY,
    indexX,
}: MusicCardProps) => {
    const Ypx = 417;
    const Xpx = 360;

    const movementStyle = {
        transform: isFocused
            ? `translate(-${indexX * Xpx}px, -${indexY * Ypx}px) scale(1.05)`
            : `translate(-${indexX * Xpx}px, -${indexY * Ypx}px)`,
    };
    const borderStyle = {
        opacity: isFocused ? 1 : 0,
    };

    return (
        <NavigableWrapper
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            focusedClass="music-card__focused"
            defaultFocused={focused}
            id={navigableId}
        >
            <div className="music-card" key={game.id} style={movementStyle}>
                <div className="music-card__border" style={borderStyle} />
                <img className="music-card__image" src={game.image} alt={game.name} />
                <div
                    className="music-card__info"
                    style={{
                        backgroundColor: game.dominantColor,
                    }}
                >
                    <div className="music-card__info__text">
                        <p className="music-card__info__text__title">{game.name}</p>
                        <p className="music-card__info__text__company">
                            {game.company} / this is an example of other type of card
                        </p>
                    </div>
                </div>
            </div>
        </NavigableWrapper>
    );
};

export default MusicCard;
