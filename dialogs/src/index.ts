/* eslint-disable @typescript-eslint/no-explicit-any */
import * as sdk from '@telefonica/la-bot-sdk';
import * as path from 'path';

import configurationSchema from './config';
import { LIBRARY_NAME } from './models';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export = function setup(options: any, imports: any, register: (err: Error, result: any) => void): void {
    const dialogs = [
        './dialogs/dialog-la-start',
        './dialogs/dialog-la-close',
        './dialogs/dialog-home',
        './dialogs/dialog-game',
        './dialogs/dialog-cart',
        './dialogs/dialog-navigation',
    ];

    sdk.loader.excludeDialogs(dialogs, options);

    const settingsPath = path.resolve(__dirname, '..', 'settings');

    register(null, {
        [LIBRARY_NAME]: {
            dialogs: dialogs.map((d) => require(d)),
            locale: sdk.loader.readLocaleFolder(path.resolve(settingsPath, 'locale')),
            env: sdk.loader.readEnv(options.configuration, settingsPath),
            config: sdk.loader.readDialogConfig(options.configuration, settingsPath),
            configSchema: configurationSchema,
            resources: path.resolve(__dirname, '..', 'resources'),
        },
    });
};
