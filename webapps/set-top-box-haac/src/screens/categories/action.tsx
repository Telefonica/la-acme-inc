import React from 'react';
import { screenReady, NavigableButton } from '@telefonica/la-web-sdk';
import { Intent } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';
// images
import callofduty from '../../../../common/assets/imgs/callofduty.jpg';
import streetfighter4 from '../../../../common/assets/imgs/streetfighter4.png';
import quake2 from '../../../../common/assets/imgs/quake2.jpg';
import notfound from '../../../../common/assets/imgs/notfound.png';

const ActionScreen: any = (games: any) => {
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
            case 'streetfighter4':
                return streetfighter4;
                break;
            case 'callofduty':
                return callofduty;
                break;
            case 'quake2':
                return quake2;
                break;
            default:
                return notfound;
                break;
        }
    };

    return (
        <div className="ActionScreen">
            <h1>GAMES - CATEGORY {games.genre.toUpperCase()}</h1>
            {gameList.map((game: any) => (
                <div className="card" key={game.id}>
                    <img src={getImg(game.img)} alt={game.title} />

                    <div className="container">
                        <h4>
                            <b>Name: {game.title}</b>
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

export default screenReady(ActionScreen);
