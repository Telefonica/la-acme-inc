import React from 'react';
import { screenReady } from '@telefonica/la-web-sdk';

const GamesScreen: any = (games: any) => {
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
        </div>
    );
};

export default screenReady(GamesScreen);
