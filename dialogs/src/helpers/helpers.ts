import { Category, Game } from '../models';

export class helper {
    /*
    obtains data from platforms, games and categories
    and returns an array of games grouped by a specific category and platform    
    */
    static async getGamesByPl(categories: Category[], games: Game[], platform: string) {
        const agroupedGames = categories.map((category) => {
            return games.filter((game) => {
                return game.category === category.id && game.platforms.indexOf(platform) !== -1;
            });
        });
        return agroupedGames;
    }
}
