import { Suggestion } from '@telefonica/la-bot-sdk';

export const LIBRARY_NAME = 'la-acme-inc';

export interface SessionData {
    cart: CartGame[];
    currentGameId: string;
    currentGame: Game;
    platformId: string;
    skipScreenMessage?: boolean;
}

export enum DialogId {
    HOME = 'la-acme-inc-home',
    GAME = 'la-acme-inc-game',
    CART = 'la-acme-inc-cart',
    NAVIGATION = 'la-acme-inc-navigation',
    CART_QUANTITY = 'la-acme-inc-quantity',
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
}

export enum Operation {
    BACK = 'intent.operation.sdk.back',
    GAME = 'intent.operation.acme-inc.game',
    CART = 'intent.operation.acme-inc.cart',
    ADD_CART = 'intent.operation.acme-inc.add_cart',
    REMOVE_CART = 'intent.operation.acme-inc.remove_cart',
    NAVIGATION = 'intent.operation.acme-inc.navigation',
    QUANTITY_ADD = 'intent.operation.acme-inc.quantity_add',
    QUANTITY_REMOVE = 'intent.operation.acme-inc.quantity_remove',
}

export enum Entity {
    PLTID = 'ent.plt-id',
    GAMEID = 'ent.game-id',
    GAMETITLE = 'ent.game-title',
    QUANTITY = 'ent.quantity',
    PRICE = 'ent.price',
}
export interface GameCard {
    id: string;
    company: string;
    price: number;
    image: string;
    title: string;
    dominantColor: string;
}
export enum Categories {
    cat01 = 'action',
    cat02 = 'rpg',
    cat03 = 'sports',
    cat04 = 'indie',
    cat05 = 'something',
    cat06 = 'something else',
}
export interface GameCards {
    [key: string]: GameCard[];
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
    platformId: string;
    suggestions?: Suggestion[];
}

export interface CartGame {
    title: string;
    id: string;
    price: number;
    quantity: number;
}

export interface CartScreenData {
    games: CartGame[];
    totalPrice: number;
}

export interface Category {
    id: string;
    name: string;
    imageBackground: string;
}

export interface Game {
    id: string;
    image: string;
    title: string;
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
