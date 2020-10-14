import { Suggestion } from '@telefonica/la-bot-sdk';

export const LIBRARY_NAME = 'la-acme-inc';

export interface SessionData {
    name: string;
}

export enum DialogId {
    HOME = 'la-acme-inc-home',
    SPORTS = 'la-acme-inc-sports',
    ACTION = 'la-acme-inc-action',
    INDIE = 'la-acme-inc-indie',
    RPG = 'la-acme-inc-rpg',
}

export enum Screen {
    HOME = 'home',
    ERROR = 'error',
    SPLASH = 'splash',
    SPORTS = 'sports',
    ACTION = 'action',
    INDIE = 'indie',
    RPG = 'rpg',
}

export enum Intent {
    HOME = 'intent.la-acme-inc.home',
    SPORTS = 'intent.la-acme-inc.sports',
    ACTION = 'intent.la-acme-inc.action',
    INDIE = 'intent.la-acme-inc.indie',
    RPG = 'intent.la-acme-inc.rpg',
    BACK = 'intent.la-acme-inc.back',
    NAME = 'intent.la-acme-inc.name',
}

export enum Operation {
    BACK = 'intent.operation.sdk.back',
}

export enum Entity {
    NAME = 'ent.name',
}

export interface HomeScreenData {
    title: string;
    categories: Category[];
    suggestions?: Suggestion[];
}

export interface GameScreenData {
    title: string;
    games: Game[];
    suggestions?: Suggestion[];
}

export interface Category {
    id: string;
    name: string;
    games_count: number;
    image_background: string;
}

export interface Game {
    id: string;
    background_image: string;
    name: string;
    platforms: Platform[];
    metacritic: number;
    playtime: number;
    video_url: string;
    price: number;
    dominant_color: string;
}

export interface Platform {
    id: string;
    name: string;
}
