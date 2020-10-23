import { Category, Game, GameCards } from '../models';

export class helper {
    /*
    obtains data from platforms, games and categories
    and returns an array of games grouped by a specific category and platform    
    */
    static getGamesByPlatform = (categories: Category[], games: Game[], platform: string): GameCards => {
        const Test = categories.map(({ id }) => {
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

        return Test.reduce((obj, item) => {
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
}
