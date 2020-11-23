import './splash.scss';

import React, { useEffect } from 'react';
import { Preloadable, useAura } from '@telefonica/custom-la-web-sdk';
import { Intent } from '../../../../../dialogs/src/models';

const SplashScreen: React.FC<Preloadable> = ({ onReady }: Preloadable) => {
    const { sendCommand } = useAura();

    useEffect(() => {
        onReady();
        setTimeout(() => {
            sendCommand({
                intent: 'intent.la-generikon.generik',
                entities: [{ type: 'ent.dynamic_intent' as string, entity: Intent.HOME }],
            });
        }, 1000);
    }, [onReady, sendCommand]);

    return (
        <div className="splash-screen" id="splash">
            <h1>WELCOME TO ACME INC!</h1>
        </div>
    );
};

export default SplashScreen;
