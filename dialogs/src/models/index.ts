import { Suggestion } from '@telefonica/la-bot-sdk';

export const LIBRARY_NAME = 'la-acme-inc';

// user data session
export interface SessionData {
    name: string;
}

export enum DialogId {
    HOME = 'la-acme-inc-home',
    ADVENTURE = 'la-acme-inc-adventure',
    ACTION = 'la-acme-inc-action',
    SIMULATION = 'la-acme-inc-simulation',
    SPORTS = 'la-acme-inc-sports',
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
    SPORTS = 'intent.la-acme-inc.sports',
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
    img: string;
}

export interface Game {
    id: string;
    img?: string;
    title: string;
    platform: string;
    year: string;
    description: string;
}
