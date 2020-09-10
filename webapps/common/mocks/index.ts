import { Screen, Intent, HomeScreenMessage } from '../../../dialogs/src/models';

const START = 'intent.internal.living-app.start';

const script = {
    [START]: () => screen(Screen.SPLASH),
    [Intent.HOME]: () => screen(Screen.HOME, home),
};

const screen = (screen: Screen, msg: Record<string, any> = {}) => {
    return {
        activeChannels: ['movistar-home', 'set-top-box'],
        screen,
        ...msg,
    };
};

const home: HomeScreenMessage = {
    title: 'Welcome to living apps!',
};

export default script;
