import { Category, Game, GameCard } from '../models';

export class helper {
    /*
    obtains data from platforms, games and categories
    and returns an array of games grouped by a specific category and platform    
    */
    static async getGamesByPl(categories: Category[], gameCards: GameCard[], platform: string) {
        const agroupedGames = categories.map((category) => {
            return gameCards.filter((game) => {
                return game.category === category.id && game.platforms.indexOf(platform) !== -1;
            });
        });
        return agroupedGames;
    }

    // obtain game data by id
    static async getGameById(games: Game[], gameId: string) {
        const game = games.filter((game) => {
            return game.id === gameId;
        });
        return game[0];
    }
}
