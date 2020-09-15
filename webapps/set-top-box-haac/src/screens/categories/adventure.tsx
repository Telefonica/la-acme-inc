import React from 'react';
import { screenReady, NavigableButton } from '@telefonica/la-web-sdk';
import { Intent } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';

const AdventureScreen: any = (games: any) => {
    const { sendCommand } = useAura();

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    const gameList = games.items;

    return (
        <div className="AdventureScreen">
            <h1>GAMES - CATEGORY {games.genre.toUpperCase()}</h1>
            {gameList.map((game: any) => (
                <div className="card" key={game.id}>
                    <img src="img_avatar.png" alt={game.title} />
                    <div className="container">
                        <h4>
                            <b>{game.title}</b>
                        </h4>
                        <p>{game.platform}</p>
                        <p>{game.year}</p>
                        <p>{game.description}</p>
                    </div>
                </div>
            ))}
            <NavigableButton onClick={(e: any) => goToHome()} defaultClass="" focusedClass="" id="categories-button">
                BACK
            </NavigableButton>
        </div>
    );
};

export default screenReady(AdventureScreen);
