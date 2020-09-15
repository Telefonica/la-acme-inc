import { Screen, Intent, HomeScreenData, GenreCategory, Game } from '../../../dialogs/src/models';

const START = 'intent.internal.living-app.start';

const script = {
    [START]: () => screen(Screen.SPLASH),
    [Intent.HOME]: () => screen(Screen.HOME, home),
    [Intent.ADVENTURE]: () => screen(Screen.ADVENTURE, home.categories[0]),
    [Intent.ACTION]: () => screen(Screen.ACTION, home.categories[1]),
    [Intent.BACK]: () => screen(Screen.HOME, home),
};

const screen = (screen: Screen, msg: Record<string, any> = {}) => {
    return {
        activeChannels: ['movistar-home', 'set-top-box'],
        screen,
        ...msg,
    };
};

const home: HomeScreenData = {
    title: 'VIDEOGAMES CATEGORIES',
    categories: [
        {
            genre: 'adventure',
            catId: '01',
            items: [
                {
                    id: 'ad1',
                    img: 'zelda',
                    title: 'The legend of Zelda',
                    platform: 'Nintendo 64',
                    year: '1998',
                    description:
                        'The Legend of Zelda is a high fantasy action-adventure video game franchise created by Japanese game designers.',
                },
                {
                    id: 'ad2',
                    img: 'tombraider',
                    title: 'Tomb Raider',
                    platform: 'PlayStation',
                    year: '1996',
                    description:
                        'Development of Tomb Raider, the first video game, began in 1994; it was released in October 1996.',
                },
                {
                    id: 'ad3',
                    img: 'darksouls3',
                    title: 'Dark Souls 3',
                    platform: 'Xbox One',
                    year: '1998',
                    description:
                        'Dark Souls III is an action role-playing video game developed by FromSoftware and published by Bandai Namco Entertainment.',
                },
            ],
        },
        {
            genre: 'action',
            catId: '02',
            items: [
                {
                    id: 'ac1',
                    img: 'streetfighter4',
                    title: 'Street Fighter IV',
                    platform: 'Playstation 4',
                    year: '2018',
                    description:
                        'Street Fighter IV is a 2008 fighting game published by Capcom, who also co-developed the game with Dimps.',
                },
                {
                    id: 'ac2',
                    img: 'callofduty',
                    title: 'Call of Duty: operations',
                    platform: 'Windows 10',
                    year: '2020',
                    description: 'Call of Duty is a first-person shooter video game franchise published by Activision.',
                },
                {
                    id: 'ac3',
                    img: 'quake2',
                    title: 'Quake 2',
                    platform: 'Windows 98',
                    year: '1997',
                    description: 'Quake II is a first-person shooter video game released in December 1997.',
                },
            ],
        },
        {
            genre: 'simulation',
            catId: '03',
            items: [
                {
                    id: 'si1',
                    title: 'Age of empires',
                    platform: 'Windows 98',
                    year: '1997',
                    description:
                        'Age of Empires is a series of historical real-time strategy video games, originally developed by Ensemble Studios and published by Xbox Game Studios. The first game was Age of Empires, released in 1997. Eight total games within the series have been released.',
                },
                {
                    id: 'si2',
                    title: 'Theme Hospital',
                    platform: 'Playstation',
                    year: '1996',
                    description:
                        'Theme Hospital is a business simulation game developed by Bullfrog Productions and published by Electronic Arts in 1997 for the PC in which players design and operate a privately owned hospital with the goal of curing patients of fictitious comical ailments.',
                },
                {
                    id: 'si3',
                    title: 'The sims 4',
                    platform: 'Windows 10',
                    year: '2018',
                    description:
                        'The Sims 4 is a 2014 life simulation video game developed by the Redwood Shores studio of Maxis and published by Electronic Arts. It is the fourth major title in The Sims series and was originally announced on May 6, 2013, and was released in North America on September 2, 2014 for Microsoft Windows.',
                },
            ],
        },
        {
            genre: 'sports',
            catId: '04',
            items: [
                {
                    id: 'sp1',
                    title: 'Fifa 2020',
                    platform: 'Xbox One x',
                    year: '2020',
                    description:
                        'Age of Empires is a series of historical real-time strategy video games, originally developed by Ensemble Studios and published by Xbox Game Studios. The first game was Age of Empires, released in 1997. Eight total games within the series have been released.',
                },
                {
                    id: 'sp2',
                    title: 'NBA 2K 2020',
                    platform: 'Playstation 4',
                    year: '2020',
                    description:
                        'NBA 2k is a basket simulation game developed by Bullfrog Productions and published by Electronic Arts in 1997 for the PC in which players design and operate a privately owned hospital with the goal of curing patients of fictitious comical ailments.',
                },
                {
                    id: 'sp3',
                    title: 'Super tennis',
                    platform: 'Super Nintento',
                    year: '1990',
                    description:
                        'Super tennis is a sport simulation video game developed by the Redwood Shores studio of Maxis and published by Electronic Arts. It is the fourth major title in The Sims series and was originally announced on May 6, 2013, and was released in North America on September 2, 2014 for Microsoft Windows.',
                },
            ],
        },
    ],
};

export default script;
