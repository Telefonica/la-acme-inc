import './GameCard.scss';

import React from 'react';
import { Game } from '../../../../../dialogs/src/models';
import { NavigableWrapper } from '@telefonica/la-web-sdk';

import styled from 'styled-components';

//import LazyImages from '../Hocs/withLazyLoader/LazyImage';

interface GameCardContainerProps {
    isFocused: boolean;
    indexY: number;
    indexX: number;
    Xpx: number;
    Ypx: number;
}

const GameCardContainer = styled.div<GameCardContainerProps>`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    min-height: 320px;
    margin-left: 30px;
    will-change: transform;
    transform: ${(props) =>
        props.isFocused
            ? `translate(-${props.indexX * props.Xpx}px, -${props.indexY * props.Ypx}px) scale(1.1)`
            : `translate(-${props.indexX * props.Xpx}px, -${props.indexY * props.Ypx}px)`};
`;
interface GameCardProps {
    game: Game;
    focused: boolean;
    isFocused: boolean;
    onClick: Function;
    onFocus: Function;
    onBlur: Function;
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
    onBlur,
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
            onBlur={onBlur}
            //focusedClass="game-card__focused"
            defaultFocused={focused}
            id={navigableId}
        >
            <GameCardContainer
                className="game-card"
                key={game.id}
                isFocused={isFocused}
                indexX={indexX}
                indexY={indexY}
                Ypx={417}
                Xpx={360}
            >
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
            </GameCardContainer>
        </NavigableWrapper>
    );
};

export default GameCard;
