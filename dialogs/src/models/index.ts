import { Suggestion } from '@telefonica/la-bot-sdk';

export const LIBRARY_NAME = 'la-acme-inc';

export interface SessionData {
    name: string;
}

export enum DialogId {
    HOME = 'la-acme-inc-home',
    GAME = 'la-acme-inc-game',
    STORE = 'la-acme-inc-store',
}

export enum Screen {
    HOME = 'home',
    GAME = 'game',
    STORE = 'store',
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
    image: string;
    name: string;
    dominantColor: string;
    company: string;
    price: number;
}

export interface GameCards {
    [key: string]: GameCard[];
}

export enum Categories {
    cat01 = 'action',
    cat02 = 'adventure',
    cat03 = 'rpg',
    cat04 = 'sports',
    cat05 = 'indie',
}

export interface HomeScreenData {
    platformTitle: string;
    platforms: Platform[];
    games: GameCards;
    backgrounds: string[];
    suggestions?: Suggestion[];
}

export interface GameScreenData {
    game: Game;
    suggestions?: Suggestion[];
}

export interface Category {
    id: string;
    name: string;
    imageBackground: string;
}

export interface Game {
    id: string;
    image: string;
    name: string;
    metacritic: number;
    company: string;
    videoUrl: string;
    price: number;
    dominantColor: string;
    platforms: string[];
    category: string;
    description: string;
}

export interface ShortScreenshots {
    id: string;
    image: string;
}

export interface Platform {
    id: string;
    name: string;
}
