import React from 'react';
import { screenReady, NavigableButton } from '@telefonica/la-web-sdk';
import { Intent } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';
// images
import zelda from '../../../../common/assets/imgs/zelda.png';
import darksouls3 from '../../../../common/assets/imgs/darksouls3.jpg';
import tombraider from '../../../../common/assets/imgs/tombraider.jpg';
import notfound from '../../../../common/assets/imgs/notfound.png';

const AdventureScreen: any = (games: any) => {
    const { sendCommand } = useAura();

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    const gameList = games.items;

    /* TODO
        bad implementation of the use of images, 
        it is like this for the demo but you have to change it    
    */
    const getImg = (name: string) => {
        console.log('test ', name);
        switch (name) {
            case 'zelda':
                return zelda;
                break;
            case 'tombraider':
                return tombraider;
                break;
            case 'darksouls3':
                return darksouls3;
                break;
            default:
                return notfound;
                break;
        }
    };

    return (
        <div className="AdventureScreen">
            <h1>GAMES - CATEGORY {games.genre.toUpperCase()}</h1>
            {gameList.map((game: any) => (
                <div className="card" key={game.id}>
                    <img src={getImg(game.img)} alt={game.title} />
                    <div className="container">
                        <h4>
                            <b>Title: {game.title}</b>
                        </h4>
                        <p>Platform: {game.platform}</p>
                        <p>Year: {game.year}</p>
                        <p>Description: {game.description}</p>
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
