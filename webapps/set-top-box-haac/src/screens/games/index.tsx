import React from 'react';
import { screenReady, NavigableButton } from '@telefonica/la-web-sdk';
import { Intent } from '../../../../../dialogs/src/models';
import { Preloadable, useAura } from '@telefonica/la-web-sdk';

const GamesScreen: any = (games: any) => {
    const { sendCommand } = useAura();

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    const gameList = games[0].items;

    return (
        <div className="GamesScreen">
            <h1>GAMES - CATEGORIE {games[0].genre.toUpperCase()}</h1>
            {gameList.map((game: any) => (
                <div className="card" key={game.id}>
                    {/*<img src="img_avatar.png" alt="Avatar" style="width:100%">*/}
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

export default screenReady(GamesScreen);
