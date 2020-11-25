import 'react-app-polyfill/stable'; // TODO: this isn't necessary. Also check browserslist.

import script from '../../common/mocks';
import { init, Channel } from '@telefonica/la-web-sdk';
import { Screen, Operation, Intent, Entity } from '../../../dialogs/src/models';
import { SplashScreen } from './screens/splash';
import ErrorRscreen from './screens/error';
import MhSuggestionsWrapper from './screens/suggestionsWrapper';

init({
    channel: Channel.MH,
    laName: process.env.REACT_APP_LA_NAME as string,
    screens: {
        [Screen.SPLASH]: () => SplashScreen,
        [Screen.ERROR]: () => ErrorRscreen,
        [Screen.HOME]: (data) => {
            const platformSuggestions = data.platforms.map((platform: any) => ({
                title: platform.name,
                intent: Intent.HOME,
                entities: [{ type: Entity.PLTID, entity: platform.id }],
            }));

            data.suggestions = [
                ...platformSuggestions,
                {
                    title: 'VER CESTA',
                    intent: Operation.CART,
                    entities: [],
                },
                {
                    title: 'DESACTIVAR NAVEGACION',
                    intent: Operation.NAVIGATION,
                    entities: [],
                },
            ];

            return MhSuggestionsWrapper;
        },
        [Screen.CART]: (data) => {
            const platformSuggestions = data.platforms.map((platform: any) => ({
                title: platform.name,
                intent: Intent.HOME,
                entities: [{ type: Entity.PLTID, entity: platform.id }],
            }));

            data.suggestions = [
                ...platformSuggestions,
                {
                    title: 'VER CESTA',
                    intent: Operation.CART,
                    entities: [],
                },
            ];

            return MhSuggestionsWrapper;
        },
        [Screen.GAME]: (data) => {
            const platformSuggestions = data.platforms.map((platform: any) => ({
                title: platform.name,
                intent: Intent.HOME,
                entities: [{ type: Entity.PLTID, entity: platform.id }],
            }));

            data.suggestions = [
                ...platformSuggestions,
                {
                    title: 'VER CESTA',
                    intent: Operation.CART,
                    entities: [],
                },
            ];

            return MhSuggestionsWrapper;
        },
    },
    buildNumber: process.env.BUILD_NUMBER,
    auraMockClient:
        process.env.REACT_APP_AURA_MOCK_CLIENT !== 'true'
            ? undefined
            : {
                  script,
                  pendingTerms: false,
              },
});
