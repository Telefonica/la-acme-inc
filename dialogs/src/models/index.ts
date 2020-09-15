export const LIBRARY_NAME = 'la-acme-inc';

export interface SessionData {
    sampleKey: string;
}

export enum DialogId {
    HOME = 'la-acme-inc-home',
    GAMES = 'la-acme-inc-games'
}

export enum Screen {
    HOME = 'home',
    ERROR = 'error',
    SPLASH = 'splash',
    GAMES = 'games',
}

export enum Intent {
    HOME = 'intent.la-acme-inc.home',
    GAMES = 'intent.la-acme-inc.games',
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
    categories: any;
}


