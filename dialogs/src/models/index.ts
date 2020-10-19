import { Suggestion } from '@telefonica/la-bot-sdk';

export const LIBRARY_NAME = 'la-acme-inc';

export interface SessionData {
    name: string;
}

export enum DialogId {
    HOME = 'la-acme-inc-home',
    GAME = 'la-acme-inc-game',
}

export enum Screen {
    HOME = 'home',
    ERROR = 'error',
    SPLASH = 'splash',
    GAME = 'game',
}

export enum Intent {
    HOME = 'intent.la-acme-inc.home',
    GAME = 'intent.la-acme-inc.game',
    BACK = 'intent.la-acme-inc.back',
    PLTID = 'intent.la-acme-inc.pltid',
    GAMEID = 'intent.la-acme-inc.gameid',
}

export enum Operation {
    BACK = 'intent.operation.sdk.back',
}

export enum Entity {
    PLTID = 'ent.pltid',
    GAMEID = 'ent.gameid',
}

export interface HomeScreenData {
    title: string;
    platforms: Platform[];
    categories: Category[];
    gameList: {
        action: Game[];
        indie: Game[];
        rpg: Game[];
        sports: Game[];
    };
    suggestions?: Suggestion[];
}

export interface GameScreenData {
    title: string;
    game: Game;
    suggestions?: Suggestion[];
}

export interface Category {
    id: string;
    name: string;
    image_background: string;
}

export interface Game {
    id: string;
    background_image: string;
    name: string;
    metacritic: number;
    company: string;
    video_url: string;
    price: number;
    dominant_color: string;
    platforms: string[];
    category: string;
}

export interface Platform {
    id: string;
    name: string;
}
