export const LIBRARY_NAME = 'la-acme-inc';

export interface SessionData {
    sampleKey: string;
}

export enum DialogId {
    HOME = 'la-acme-inc-home',
    GAMES = 'la-acme-inc-games',
}

export enum Screen {
    HOME = 'home',
    ERROR = 'error',
    SPLASH = 'splash',
    ADVENTURE = 'adventure',
    ACTION = 'action',
    SIMULATION = 'simulation',
    SPORTS = 'sports',
}

export enum Intent {
    HOME = 'intent.la-acme-inc.home',
    ADVENTURE = 'intent.la-acme-inc.adventure',
    ACTION = 'intent.la-acme-inc.action',
    SIMULATION = 'intent.la-acme-inc.simulation',
    SPORTS = 'intent.la-acme-inc.sport',
    BACK = 'intent.la-acme-inc.home',
}

export enum Operation {
    BACK = 'intent.operation.sdk.back',
}

export enum Entity {
    MESSAGE = 'ent.message',
}

export enum CustomAction {}

export interface HomeScreenData {
    title: string;
    categories: GenreCategory[];
}

export interface GenreCategory {
    genre: string;
    catId: string;
    img: string;
    items: Game[];
}

export interface Game {
    id: string;
    img?: string;
    title: string;
    platform: string;
    year: string;
    description: string;
}
