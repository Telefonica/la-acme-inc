import { Screen, Intent, HomeScreenData } from '../../../dialogs/src/models';

const START = 'intent.internal.living-app.start';

const script = {
    [START]: () => screen(Screen.SPLASH),
    [Intent.HOME]: () => screen(Screen.HOME, home),
    [Intent.GAMES]: () => screen(Screen.GAMES, games),
};

const screen = (screen: Screen, msg: Record<string, any> = {}) => {
    return {
        activeChannels: ['movistar-home', 'set-top-box'],
        screen,
        ...msg,
    };
};

const home: HomeScreenData = {
    title: 'VideoGames Categories',
    categories: [
        {
            id: '01',
            name: 'Adventure',
            items: [
                {
                    title: 'The legend of Zelda',
                    platform: 'Nintendo 64',
                    year: '1998',
                    description:
                        'The Legend of Zelda is a high fantasy action-adventure video game franchise created by Japanese game designers Shigeru Miyamoto and Takashi Tezuka. It is primarily developed and published by Nintendo, although some portable installments and re-releases have been outsourced to Capcom, Vanpool, and Grezzo. The gameplay incorporates action-adventure and elements of action RPG games.',
                },
                {
                    title: 'Tomb Raider',
                    platform: 'PlayStation',
                    year: '1996',
                    description:
                        'Development of Tomb Raider, the first video game, began in 1994; it was released in October 1996. Its critical and commercial success prompted Core Design to develop a new game annually for the next four years, which put a strain on staff. The sixth game, The Angel of Darkness, faced difficulties during development and was considered a failure at release. This prompted Eidos to switch development duties to Crystal Dynamics, which has been the series primary developer since. Other developers have contributed to spin-off titles and ports of mainline entries.',
                },
                {
                    title: 'Dark Souls 3',
                    platform: 'Xbox One',
                    year: '1998',
                    description:
                        'Dark Souls III is an action role-playing video game developed by FromSoftware and published by Bandai Namco Entertainment for PlayStation 4, Xbox One, and Microsoft Windows. The fourth installment of the Souls series and the final installment of the Dark Souls trilogy, the game was released in Japan in March 2016 and worldwide a month later. Two downloadable content (DLC) expansions, Ashes of Ariandel and The Ringed City, were also made for the game.',
                },
            ],
        },
        {
            id: '02',
            name: 'Action',
            items: [
                {
                    title: 'Street Fighter IV',
                    platform: 'Playstation 4',
                    year: '2018',
                    description:
                        'Street Fighter IV is a 2008 fighting game published by Capcom, who also co-developed the game with Dimps. It was the first original main entry in the series since Street Fighter III in 1997, a hiatus of eleven years.',
                },
                {
                    title: 'Call of Duty: operations',
                    platform: 'Windows 10',
                    year: '2020',
                    description:
                        'Call of Duty is a first-person shooter video game franchise published by Activision. Starting out in 2003, it first focused on games set in World War II. Over time, the series has seen games set in the midst of the Cold War, futuristic worlds, and outer space.',
                },
                {
                    title: 'Quake 2',
                    platform: 'Windows 98',
                    year: '1997',
                    description:
                        'Quake II is a first-person shooter video game released in December 1997. It was developed by id Software and published by Activision. It is not a direct sequel to Quake; id decided to revert to an existing trademark when the games fast-paced, tactile feel felt closer to a Quake game than a new franchise.',
                },
            ],
        },
        {
            id: '03',
            name: 'Simulation',
            items: [
                {
                    title: 'Age of empires',
                    platform: 'Windows 98',
                    year: '1997',
                    description:
                        'Age of Empires is a series of historical real-time strategy video games, originally developed by Ensemble Studios and published by Xbox Game Studios. The first game was Age of Empires, released in 1997. Eight total games within the series have been released.',
                },
                {
                    title: 'Theme Hospital',
                    platform: 'Playstation',
                    year: '1996',
                    description:
                        'Theme Hospital is a business simulation game developed by Bullfrog Productions and published by Electronic Arts in 1997 for the PC in which players design and operate a privately owned hospital with the goal of curing patients of fictitious comical ailments.',
                },
                {
                    title: 'The sims 4',
                    platform: 'Windows 10',
                    year: '2018',
                    description:
                        'The Sims 4 is a 2014 life simulation video game developed by the Redwood Shores studio of Maxis and published by Electronic Arts. It is the fourth major title in The Sims series and was originally announced on May 6, 2013, and was released in North America on September 2, 2014 for Microsoft Windows.',
                },
            ],
        },
        {
            id: '04',
            name: 'Sports',
            items: [
                {
                    title: 'Fifa 2020',
                    platform: 'Xbox One x',
                    year: '2020',
                    description:
                        'Age of Empires is a series of historical real-time strategy video games, originally developed by Ensemble Studios and published by Xbox Game Studios. The first game was Age of Empires, released in 1997. Eight total games within the series have been released.',
                },
                {
                    title: 'Theme Hospital',
                    platform: 'Playstation',
                    year: '1996',
                    description:
                        'Theme Hospital is a business simulation game developed by Bullfrog Productions and published by Electronic Arts in 1997 for the PC in which players design and operate a privately owned hospital with the goal of curing patients of fictitious comical ailments.',
                },
                {
                    title: 'The sims 4',
                    platform: 'Windows 10',
                    year: '2018',
                    description:
                        'The Sims 4 is a 2014 life simulation video game developed by the Redwood Shores studio of Maxis and published by Electronic Arts. It is the fourth major title in The Sims series and was originally announced on May 6, 2013, and was released in North America on September 2, 2014 for Microsoft Windows.',
                },
            ],
        },
    ],
};

const games: any = [
    {
        genre: 'adventure',
        catId: '01',
        items: [
            {
                id: 'a1',
                title: 'The legend of Zelda',
                platform: 'Nintendo 64',
                year: '1998',
                description:
                    'The Legend of Zelda is a high fantasy action-adventure video game franchise created by Japanese game designers Shigeru Miyamoto and Takashi Tezuka. It is primarily developed and published by Nintendo, although some portable installments and re-releases have been outsourced to Capcom, Vanpool, and Grezzo. The gameplay incorporates action-adventure and elements of action RPG games.',
            },
            {
                id: 'a2',
                title: 'Tomb Raider',
                platform: 'PlayStation',
                year: '1996',
                description:
                    'Development of Tomb Raider, the first video game, began in 1994; it was released in October 1996. Its critical and commercial success prompted Core Design to develop a new game annually for the next four years, which put a strain on staff. The sixth game, The Angel of Darkness, faced difficulties during development and was considered a failure at release. This prompted Eidos to switch development duties to Crystal Dynamics, which has been the series primary developer since. Other developers have contributed to spin-off titles and ports of mainline entries.',
            },
            {
                id: 'a3',
                title: 'Dark Souls 3',
                platform: 'Xbox One',
                year: '1998',
                description:
                    'Dark Souls III is an action role-playing video game developed by FromSoftware and published by Bandai Namco Entertainment for PlayStation 4, Xbox One, and Microsoft Windows. The fourth installment of the Souls series and the final installment of the Dark Souls trilogy, the game was released in Japan in March 2016 and worldwide a month later. Two downloadable content (DLC) expansions, Ashes of Ariandel and The Ringed City, were also made for the game.',
            },
        ],
    },
];

export default script;
