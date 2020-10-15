import { Screen, Intent, GameScreenData } from '../../../dialogs/src/models';

const START = 'intent.internal.living-app.start';

const breadcrumbs: Screen[] = [];

const changeScreen = (screen: Screen) => {
    const msg: Record<string, number> = mockedValues[screen as keyof mocks];

    return {
        activeChannels: ['movistar-home', 'set-top-box'],
        screen,
        ...msg,
    };
};

const changeScreenWithBreadcrumbs = (screen: Screen) => {
    screen && breadcrumbs.push(screen);
    return changeScreen(screen);
};

const getLastScreen = () => breadcrumbs.pop() && breadcrumbs[breadcrumbs.length - 1];

const script = {
    [START]: () => changeScreenWithBreadcrumbs(Screen.SPLASH),
    [Intent.HOME]: () => changeScreenWithBreadcrumbs(Screen.HOME),
    [Intent.BACK]: () => changeScreenWithBreadcrumbs(getLastScreen() || Screen.HOME),
};

interface mocks {
    home: GameScreenData;
    error: any;
    splash: any;
}

const mockedValues: mocks = {
    home: {
        title: 'Action',
        games: [
            {
                id: 1,
                background_image: 'https://i.imgur.com/EO4eB3G.jpg',
                name: 'Grand Thef Auto 5',
                dominant_color: '#826882',
                metacritic: 97,
                price: 30,
                company: 'Rockstar',
            },
            {
                id: 2,
                background_image: 'https://imgur.com/iqtL3bg.jpg',
                name: 'Portal 2',
                dominant_color: '#25578C',
                metacritic: 90,
                price: 15,
                company: 'Valve',
            },
            {
                id: 3,
                background_image: 'https://imgur.com/tNoW7i4.jpg',
                name: 'The Witcher 3: Wild Hunt',
                dominant_color: '#302E31',
                metacritic: 90,
                price: 24,
                company: 'CD Proyekt',
            },
            {
                id: 4,
                background_image: 'https://imgur.com/VjcgDES.jpg',
                name: 'Tomb Raider',
                dominant_color: '#B5492F',
                metacritic: 90,
                price: 24,
                company: 'Crystal Dynamics',
            },
            {
                id: 5,
                background_image: 'https://imgur.com/M1abEVh.jpg',
                name: 'The Elder Scrolls: Skyrim',
                dominant_color: '#263031',
                metacritic: 90,
                price: 24,
                company: 'Bethesda',
            },
            {
                id: 6,
                background_image: 'https://imgur.com/HsXBEwz.jpg',
                name: 'Left 4 Dead 2',
                dominant_color: '#284925',
                metacritic: 90,
                price: 24,
                company: 'Valve',
            },
        ],
    },
    error: {},
    splash: {},
};

export default script;
