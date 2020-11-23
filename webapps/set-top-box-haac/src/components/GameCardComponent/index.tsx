import './GameCard.scss';

import React from 'react';
import { GameCard } from '../../../../../dialogs/src/models';

import LazyImage from '../Hocs/withLazyLoader/LazyImage';
export interface GameCardProps {
    game: GameCard;
    onClick: Function;
    addToRefs: any;
}

const GameCardComponent: React.FC<GameCardProps> = ({ game, addToRefs }: GameCardProps) => {
    return (
        <div className="game-card" ref={addToRefs}>
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
        </div>
    );
};

export default GameCardComponent;
