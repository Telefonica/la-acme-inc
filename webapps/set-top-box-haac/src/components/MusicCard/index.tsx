import './MusicCard.scss';

import React, { useRef } from 'react';
import { Game } from '../../../../../dialogs/src/models';
import { NavigableWrapper } from '@telefonica/la-web-sdk';

//import LazyImages from '../Hocs/withLazyLoader/LazyImage';

interface MusicCardProps {
    game: Game;
    focused: boolean;
    isFocused: boolean;
    onClick: Function;
    onFocus: Function;
    onBlur: Function;
    navigableId: string;
    indexY: number;
    indexX: number;
    scale?: boolean;
    border?: boolean;
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
    scale,
    border,
}: MusicCardProps) => {
    const Ypx = 417;
    const Xpx = 360;

    const movementStyle = {
        transform:
            isFocused && scale
                ? `translate(-${indexX * Xpx}px, -${indexY * Ypx}px) scale(1.05)`
                : `translate(-${indexX * Xpx}px, -${indexY * Ypx}px)`,
    };
    const borderStyle = {
        opacity: isFocused && border ? 1 : 0,
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
                <img className="music-card__image" src={game.background_image} alt={game.name} />
                <div
                    className="music-card__info"
                    style={{
                        backgroundColor: game.dominant_color,
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
