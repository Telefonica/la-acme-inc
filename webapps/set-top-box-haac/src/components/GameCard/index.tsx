import './GameCard.scss';

import React from 'react';
import { Game } from '../../../../../dialogs/src/models';
import { NavigableWrapper } from '@telefonica/la-web-sdk';

interface GameCardProps {
    game: Game;
    focused: boolean;
    onClick: Function;
    onFocus: Function;
    navigableId: string;
}

const GameCard: React.FC<GameCardProps> = ({ game, focused, onClick, onFocus, navigableId }: GameCardProps) => {
    return (
        <NavigableWrapper
            onClick={onClick}
            onFocus={onFocus}
            focusedClass="game-card__focused"
            defaultFocused={focused}
            id={navigableId}
            keyRight={`${parseInt(navigableId, 10) + 1}`}
            keyLeft={`${parseInt(navigableId, 10) - 1}`}
        >
            <div className="game-card" key={game.id}>
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
                    <p className="game-card__info__price">{navigableId}</p>
                </div>
            </div>
        </NavigableWrapper>
    );
};

export default GameCard;
