import * as sdk from '@telefonica/la-bot-sdk';
import { WaterfallStepContext } from 'botbuilder-dialogs';
import { CartGame, Category, Game, GameCards, SessionData } from '../models';

export class helper {
    /*
    obtains data from platforms, games and categories
    and returns an array of games grouped by a specific category and platform
    */
    static getGamesByPlatform = (categories: Category[], games: Game[], platform: string): GameCards => {
        const gameCards = categories.map(({ id }) => {
            return {
                [id]: games
                    .filter((game) => game.category === id && game.platforms.indexOf(platform) !== -1)
                    .map((game) => ({
                        id: game.id,
                        company: game.company,
                        price: game.price,
                        image: game.image,
                        title: game.title,
                        dominantColor: game.dominantColor,
                    })),
            };
        });

        return gameCards.reduce((obj, item) => {
            obj[Object.keys(item)[0]] = item[Object.keys(item)[0]];
            return obj;
        }, {});
    };

    // obtain game data by id
    static getGameById(games: Game[], gameId: string): Game {
        const game = games.filter((game) => {
            return game.id === gameId;
        });
        return game[0];
    }

    static gameToCartGame(game: Game, quantity: number): CartGame {
        return {
            title: game.title,
            price: game.price,
            id: game.id,
            quantity,
        };
    }

    // obtain game data by id
    static getCategoriesBackgrounds(categories: Category[]): Array<string> {
        const backgrounds = categories.map((category) => {
            return category.imageBackground;
        });
        return backgrounds;
    }

    static async getCart(stepContext: WaterfallStepContext): Promise<CartGame[]> {
        const persistedData = (await sdk.persistence.getStoredData(stepContext)) as SessionData;

        return persistedData.cart || [];
    }

    static async addGameToCart(game: CartGame, stepContext: WaterfallStepContext): Promise<CartGame[]> {
        const cart = await this.getCart(stepContext);

        const existing = cart.find((cartItem) => cartItem.id === game.id);
        if (existing) {
            existing.quantity += game.quantity;
            console.log('addGameToCart', existing.title, existing.quantity);
        } else {
            console.log('addGameToCart', 'adding', game.title, game.quantity);
            cart.push(game);
        }

        await sdk.persistence.storeData(stepContext, {
            cart,
        });

        return cart;
    }

    static async removeGameToCart(gameId: string, stepContext: WaterfallStepContext): Promise<void> {
        const cart = await this.getCart(stepContext);
        const existingIndex = cart.findIndex((cartItem) => cartItem.id === gameId);
        if (existingIndex !== -1) {
            const existing = cart[existingIndex];
            if (existing.quantity === 1) {
                cart.splice(existingIndex, 1);
            } else {
                existing.quantity--;
            }
        }
        await sdk.persistence.storeData(stepContext, {
            cart,
        });
    }
}
