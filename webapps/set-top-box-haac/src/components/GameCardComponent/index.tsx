import './GameCard.scss';

import React from 'react';
import { GameCard } from '../../../../../dialogs/src/models';
import { NavigableWrapper } from '@telefonica/la-web-sdk';

import styled from 'styled-components';
import LazyImage from '../Hocs/withLazyLoader/LazyImage';

interface GameCardContainerProps {
    isFocused: boolean;
    indexY: number;
    indexX: number;
    Xpx: number;
    Ypx: number;
    isActive: boolean;
}

const GameCardContainer = styled.div<GameCardContainerProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 320px;
    min-width: 426px;
    will-change: transform;
    margin-left: 30px;
    opacity: ${(props) => (props.isActive ? '1' : '.5')};
    transition: transform 0.3s ease-in-out;
    transform: ${(props) =>
        props.isFocused
            ? `translate(-${props.indexX * props.Xpx}px, -${props.indexY * props.Ypx}px) scale(1.1)`
            : `translate(-${props.indexX * props.Xpx}px, -${props.indexY * props.Ypx}px)`};
`;

export interface GameCardProps {
    game: GameCard;
    focused: boolean;
    isFocused: boolean;
    onClick: Function;
    onFocus: Function;
    onBlur: Function;
    navigableId: string;
    indexY: number;
    indexX: number;
    isActive: boolean;
}

const GameCardComponent: React.FC<GameCardProps> = ({
    game,
    focused,
    isFocused,
    onClick,
    onFocus,
    onBlur,
    navigableId,
    indexY,
    indexX,
    isActive,
}: GameCardProps) => {
    return (
        <NavigableWrapper onClick={onClick} onFocus={onFocus} onBlur={onBlur} defaultFocused={focused} id={navigableId}>
            <GameCardContainer
                //className="game-card"
                key={game.id}
                isFocused={isFocused}
                indexX={indexX}
                indexY={indexY}
                Ypx={400}
                Xpx={456}
                isActive={isActive}
            >
                <div className="game-card__image-wrapper">
                    <LazyImage className="game-card__image" src={game.image} alt={game.title} />
                </div>
                <div
                    className="game-card__info"
                    style={{
                        backgroundColor: game.dominantColor,
                    }}
                >
                    <div className="game-card__info__text">
                        <p className="game-card__info__text__title">{game.title}</p>
                        <p className="game-card__info__text__company">{game.company}</p>
                    </div>
                    <p className="game-card__info__price">{game.price}</p>
                </div>
            </GameCardContainer>
        </NavigableWrapper>
    );
};

export default GameCardComponent;
