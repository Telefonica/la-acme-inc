import './home.scss';

import { AuraCommands, KeyCode, KeyEvent, NavigableButton, screenReady, useBackground, useInput } from '@telefonica/la-web-sdk';
import { HomeScreenData, Category, Entity } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';
import React, { useEffect, useCallback, useState } from 'react';
import { Intent } from '../../../../../dialogs/src/models';

const HomeScreen: React.FC<HomeScreenData> = (screenData: HomeScreenData) => {
    console.log('Home data ', screenData)
    const {platformTitle, games, platforms} = screenData;
    const background = useBackground();
    const { sendCommand } = useAura();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        background.clearBackground();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goToGame = (gameId: string) => {
        sendCommand({intent: Intent.GAME, entities: [{ type: Entity.GAMEID, entity: gameId}]});
    };

    const goToPlatform = (pltId: string) => {
        sendCommand({intent: Intent.HOME, entities: [{ type: Entity.PLTID, entity: pltId}]});
    };



    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);


    return (
        <div className="home-screen">
            <h1 className="title">{platformTitle}</h1>    
            <NavigableButton
                  id="heroes-button"
                  defaultClass="home-button"
                  focusedClass="focused-home"
                  defaultFocused={true}
                  onClick={() => goToGame('21029')}
              >
                  Go to Game
              </NavigableButton>    
              <NavigableButton
                  id="heroes-button"
                  defaultClass="home-button"
                  focusedClass="focused-home"
                  defaultFocused={true}
                  onClick={() => goToPlatform('pc')}
              >
                  Go to Platform
              </NavigableButton>     
        </div>
    );
};

export default screenReady(HomeScreen);
