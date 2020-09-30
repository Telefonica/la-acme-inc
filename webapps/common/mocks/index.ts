import { Screen, Intent } from '../../../dialogs/src/models';

const START = 'intent.internal.living-app.start';

const script = {
    [START]: () => screen(Screen.SPLASH),
    [Intent.HOME]: () => screen(Screen.HOME),
    [Intent.ADVENTURE]: () => screen(Screen.ADVENTURE),
    [Intent.ACTION]: () => screen(Screen.ACTION),
    [Intent.SIMULATION]: () => screen(Screen.SIMULATION),
    [Intent.SPORTS]: () => screen(Screen.SPORTS),
    [Intent.BACK]: () => screen(Screen.HOME),
};

const screen = (screen: Screen, msg: Record<string, any> = {}) => {
    return {
        activeChannels: ['movistar-home', 'set-top-box'],
        screen,
        ...msg,
    };
};

export default script;
