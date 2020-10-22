import { Screen, Intent, GameScreenData, HomeScreenData } from '../../../dialogs/src/models';

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
    [Intent.GAME]: () => changeScreenWithBreadcrumbs(Screen.GAME),
    [Intent.BACK]: () => changeScreenWithBreadcrumbs(getLastScreen() || Screen.HOME),
};

interface mocks {
    home: HomeScreenData;
    game: GameScreenData;
    error: any;
    splash: any;
}

const mockedValues: mocks = {
    home: {
        platformTitle: 'PC',
        backgrounds: [
            'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg',
            'https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg',
        ],
        platforms: [
            {
                id: 'plat01',
                name: 'PC',
            },
            {
                id: 'plat02',
                name: 'PS4',
            },
            {
                id: 'plat03',
                name: 'XBOX',
            },
        ],
        games: {
            cat01: [
                {
                    id: '1',
                    image: 'https://i.imgur.com/EO4eB3G.jpg',
                    name: 'Grand Thef Auto 5',
                    dominantColor: '#826882',
                    price: 30,
                    company: 'Rockstar',
                },
                {
                    id: '2',
                    image: 'https://imgur.com/iqtL3bg.jpg',
                    name: 'Portal 2',
                    dominantColor: '#25578C',
                    price: 15,
                    company: 'Valve',
                },
                {
                    id: '3',
                    image: 'https://imgur.com/tNoW7i4.jpg',
                    name: 'The Witcher 3: Wild Hunt',
                    dominantColor: '#302E31',
                    price: 24,
                    company: 'CD Proyekt',
                },
                {
                    id: '4',
                    image: 'https://imgur.com/VjcgDES.jpg',
                    name: 'Tomb Raider',
                    dominantColor: '#B5492F',
                    price: 24,
                    company: 'Crystal Dynamics',
                },
                {
                    id: '5',
                    image: 'https://imgur.com/M1abEVh.jpg',
                    name: 'The Elder Scrolls: Skyrim',
                    dominantColor: '#263031',
                    price: 24,
                    company: 'Bethesda',
                },
                {
                    id: '6',
                    image: 'https://imgur.com/HsXBEwz.jpg',
                    name: 'Left 4 Dead 2',
                    dominantColor: '#284925',
                    price: 24,
                    company: 'Valve',
                },
            ],
            cat02: [
                {
                    id: '1',
                    image: 'https://i.imgur.com/EO4eB3G.jpg',
                    name: 'Grand Thef Auto 5',
                    dominantColor: '#826882',
                    price: 30,
                    company: 'Rockstar',
                },
                {
                    id: '2',
                    image: 'https://imgur.com/iqtL3bg.jpg',
                    name: 'Portal 2',
                    dominantColor: '#25578C',
                    price: 15,
                    company: 'Valve',
                },
                {
                    id: '3',
                    image: 'https://imgur.com/tNoW7i4.jpg',
                    name: 'The Witcher 3: Wild Hunt',
                    dominantColor: '#302E31',
                    price: 24,
                    company: 'CD Proyekt',
                },
                {
                    id: '4',
                    image: 'https://imgur.com/VjcgDES.jpg',
                    name: 'Tomb Raider',
                    dominantColor: '#B5492F',
                    price: 24,
                    company: 'Crystal Dynamics',
                },
                {
                    id: '5',
                    image: 'https://imgur.com/M1abEVh.jpg',
                    name: 'The Elder Scrolls: Skyrim',
                    dominantColor: '#263031',
                    price: 24,
                    company: 'Bethesda',
                },
                {
                    id: '6',
                    image: 'https://imgur.com/HsXBEwz.jpg',
                    name: 'Left 4 Dead 2',
                    dominantColor: '#284925',
                    price: 24,
                    company: 'Valve',
                },
            ],
        },
    },
    game: {
        platformId: 'plat01',
        game: {
            image: 'https://media.rawg.io/media/games/78d/78dfae12fb8c5b16cd78648553071e0a.jpg',
            company: 'Codemasters',
            dominantColor: '#0f0f0f',
            id: '92726',
            metacritic: 67,
            name: 'DiRT Rally',
            platforms: ['plat01', 'plat02'],
            category: 'cat03',
            price: 30,
            videoUrl: 'https://media.rawg.io/media/stories/caa/caab2afd3282b164431f22730c1bc0a8.mp4',
            description:
                'DiRT Rally for Mac is standing by for Metal<br />\nDiRT Rally is the most authentic and thrilling rally game ever made, road-tested over 80 million miles by the DiRT community. It perfectly captures that white knuckle feeling of racing on the edge as you hurtle along dangerous roads at breakneck speed, knowing that one crash could irreparably harm your stage time.<br />\nDiRT Rally also includes officially licensed World Rallycross content, allowing you to experience the breathless, high-speed thrills of some of the world’s fastest off-road cars as you trade paint with other drivers at some of the series’ best-loved circuits, in both singleplayer and high-intensity multiplayer races.',
        },
    },
    error: {},
    splash: {},
};

export default script;
