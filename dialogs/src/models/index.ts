import { Suggestion } from '@telefonica/la-bot-sdk';

export const LIBRARY_NAME = 'la-acme-inc';

export interface SessionData {
    name: string;
    gameId: string;
}

export enum DialogId {
    HOME = 'la-acme-inc-home',
    GAME = 'la-acme-inc-game',
    CHART = 'la-acme-inc-chart',
}

export enum Screen {
    HOME = 'home',
    GAME = 'game',
    CHART = 'chart',
    ERROR = 'error',
    SPLASH = 'splash',
}

export enum Intent {
    HOME = 'intent.la-acme-inc.home',
    GAME = 'intent.la-acme-inc.game',
    BACK = 'intent.la-acme-inc.back',
    CHART = 'intent.la-acme-inc.chart',
    ADD_CHART = 'intent.la-acme-inc.add_chart',
    REMOVE_CHART = 'intent.la-acme-inc.remove_chart',
}

export enum Operation {
    BACK = 'intent.operation.sdk.back',
}

export enum Entity {
    PLTID = 'ent.pltid',
    GAMEID = 'ent.gameid',
}
export interface GameCard {
    id: string;
    company: string;
    price: number;
    image: string;
    title: string;
    platforms: string[];
    category: string;
}
export enum CATEGORIES {
    action = 'cat01',
    rpg = 'cat02',
    sports = 'cat03',
    indie = 'cat04',
}
export interface GameCards {
    [key: string]: GameCard[];
}
export interface HomeScreenData {
    platformTitle: string;
    platforms: Platform[];
    games: GameCards;
    suggestions?: Suggestion[];
}
export interface GameScreenData {
    title: string;
    game: Game[];
    suggestions?: Suggestion[];
}
export interface Category {
    id: string;
    name: string;
    backgroundImage: string;
}
export interface Game {
    id: string;
    backgroundImage: string;
    name: string;
    metacritic: number;
    company: string;
    videoUrl: string;
    price: number;
    dominantColor: string;
    platforms: string[];
    category: string;
}
export interface Platform {
    id: string;
    name: string;
}
