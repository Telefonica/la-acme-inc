import React, { useEffect } from 'react';
import { Preloadable, useAura } from '@telefonica/la-web-sdk';
import { Intent } from '../../../../../dialogs/src/models';

const SplashScreen: React.FC<Preloadable> = ({ onReady }: Preloadable) => {
    const { sendCommand } = useAura();

    useEffect(() => {
        onReady();
        sendCommand({ intent: Intent.HOME, entities: [] });
    }, [onReady, sendCommand]);

    return <div className="SplashScreen">WELCOME TO ACME INC!</div>;
};

export default SplashScreen;
