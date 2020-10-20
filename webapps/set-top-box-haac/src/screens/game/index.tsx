import './game.scss';

import React from 'react';
import { screenReady, NavigableButton } from '@telefonica/la-web-sdk';
import Metacritic from '../../components/Metacritic';

const GameScreen: React.FC = () => {
    return (
        <div className="game-screen">
            <div className="game-screen__container">
                <div className="game-screen__data">
                    <div className="game-screen__top-wrapper">
                        <div className="game-screen__title">Gran thief auto V</div>
                        <div className="game-screen__info">
                            <div className="game-screen__pegi">Pegi 18</div>
                            <Metacritic score={20} />
                        </div>
                    </div>
                    <div className="game-screen__description">
                        Rockstar Games: Los Santos: una metrópolis llena de gurús de autoayuda, actrices y celebridades
                        desvaneciendo que luchan por mantenerse a flote en una época de incertidumbre económica y TV por
                        cable barata. En medio de la confusión, tres delincuentes muy diferentes arriesgando todo en una
                        serie de robos audaces y peligrosos que puedan ponerlos en marcha por la vida.
                    </div>
                </div>
                <div className="game-screen__image">
                    <img src="https://media.rawg.io/media/games/84d/84da2ac3fdfc6507807a1808595afb12.jpg" />
                </div>
            </div>
            <div className="game-screen__buttons">
                <NavigableButton id="back" makeFocused={true} defaultClass="game-screen__button">BACK</NavigableButton>
                <NavigableButton id="buy" makeFocused={true} defaultClass="game-screen__button">BUY</NavigableButton>
            </div>
        </div>
    );
};

export default screenReady(GameScreen);
