import 'react-app-polyfill/stable';
import 'intersection-observer';

import './index.css';
import script from '../../common/mocks';
import { Screen } from '../../../dialogs/src/models';
import { init, Channel, SDKScreen } from '@telefonica/custom-la-web-sdk';
import SplashScreen from './screens/splash';
import HomeScreen from './screens/home';
import ErrorScreen from './screens/error';
import GameScreen from './screens/game';
import CartScreen from './screens/cart';

init({
    channel: Channel.STB,
    laName: process.env.REACT_APP_LA_NAME as string,
    screens: {
        [SDKScreen.LOADING]: () => () => null,
        [Screen.SPLASH]: () => SplashScreen,
        [Screen.ERROR]: () => ErrorScreen,
        [Screen.HOME]: () => HomeScreen,
        [Screen.GAME]: () => GameScreen,
        [Screen.CART]: () => CartScreen,
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
