import { CartScreenData, Category, Game, GameCards, SessionData, Screen, CartGame } from '../models';
import * as sdk from '@telefonica/la-bot-sdk';
import { WaterfallStepContext } from 'botbuilder-dialogs';
import { ActionMessage, Action, ScreenMessage } from '@telefonica/la-bot-sdk';

export class helper {
    /*
    obtains data from platforms, games and categories
    and returns an array of games grouped by a specific category and platform    
    */
    static getGamesByPlatform = (categories: Category[], games: Game[], platform: string): GameCards => {
        const GameCards = categories.map(({ id }) => {
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

        return GameCards.reduce((obj, item) => {
            obj[Object.keys(item)[0]] = item[Object.keys(item)[0]];
            return obj;
        }, {});
    };

    // obtain game data by id
    static getGameById(games: Game[], gameId: string) {
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

    static async getCart(stepContext: WaterfallStepContext): Promise<void> {
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        const { games } = sessionData;
        if (!games) {
            const msg = new ActionMessage().withAction(Action.toast('Aún no tienes productos en la cesta.', 'warning'));
            await sdk.messaging.send(stepContext, msg);
        } else {
            const screenData: CartScreenData = {
                games,
                totalPrice: games.reduce((totalPrice, game) => totalPrice + game.price, 0),
            };

            // answer for the webapp
            const message = new ScreenMessage(Screen.CART, screenData);

            await sdk.messaging.send(stepContext, message);
        }
    }

    static async addGameToCart(game: CartGame, stepContext: WaterfallStepContext): Promise<void> {
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        const { games } = sessionData;

        const newGames = games.filter((item) => item.id === game.id).length
            ? games.map((item) =>
                  item.id === game.id
                      ? {
                            ...item,
                            quantity: item.quantity + game.quantity,
                        }
                      : item,
              )
            : [...games, game];

        const screenData: CartScreenData = {
            games: newGames,
            totalPrice: games.reduce((totalPrice, game) => totalPrice + game.price, 0),
        };

        // answer for the webapp
        const message = new ScreenMessage(Screen.GAME, screenData);

        await sdk.messaging.send(stepContext, message);
    }

    static async removeGameToCart(gameId: string, stepContext: WaterfallStepContext) {
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        const { games } = sessionData;

        const screenData: CartScreenData = {
            games: games.filter((g) => gameId !== g.id),
            totalPrice: games.reduce((totalPrice, game) => totalPrice + game.price, 0),
        };

        // answer for the webapp
        const message = new ScreenMessage(Screen.CART, screenData);

        await sdk.messaging.send(stepContext, message);
    }
}
