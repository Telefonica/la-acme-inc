import { Suggestion } from '@telefonica/la-bot-sdk';

export const LIBRARY_NAME = 'la-acme-inc';

export interface SessionData {
    items: CartGame[];
}

export enum DialogId {
    HOME = 'la-acme-inc-home',
    GAME = 'la-acme-inc-game',
    CART = 'la-acme-inc-cart',
}

export enum Screen {
    HOME = 'home',
    GAME = 'game',
    CART = 'cart',
    ERROR = 'error',
    SPLASH = 'splash',
}

export enum Intent {
    HOME = 'intent.la-acme-inc.home',
    GAME = 'intent.la-acme-inc.game',
    BACK = 'intent.la-acme-inc.back',
    CART = 'intent.la-acme-inc.cart',
    ADD_CART = 'intent.la-acme-inc.add_cart',
    REMOVE_CART = 'intent.la-acme-inc.remove_cart',
}

export enum Operation {
    BACK = 'intent.operation.sdk.back',
}

export enum Entity {
    PLTID = 'ent.pltid',
    GAMEID = 'ent.gameid',
    GAMENAME = 'ent.gamename',
    QUANTITY = 'ent.quantity',
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
export enum Categories {
    cat01 = 'action',
    cat02 = 'rpg',
    cat03 = 'sports',
    cat04 = 'indie',
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
    game: Game;
    suggestions?: Suggestion[];
}
export interface CartScreenData {
    items: CartGame[];   
}
export interface Category {
    id: string;
    name: string;
    imageBackground: string;
}
export interface CartGame {
    name: string;
    id: string;
    quantity?: number;
}
export interface Game {
    id: string;
    image: string;
    name: string;
    description: string;
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
