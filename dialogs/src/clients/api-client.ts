import { ApiClient as BaseApiClient, Configuration, HTTPMethod } from '@telefonica/la-bot-sdk';
import { WaterfallStepContext } from 'botbuilder-dialogs';
import * as sdk from '@telefonica/la-bot-sdk';
import { Category, Game, Platform } from '../models';

export class ApiClient extends BaseApiClient {
    private config: Configuration;

    constructor(config: Configuration, stepContext: WaterfallStepContext) {
        super(stepContext, config.LA_EXAMPLE_API_MOCK);
        this.config = config;
    }

    async getCategories(): Promise<Category[]> {
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_CATEGORIES}`;
        const msg = 'Fetching videogame categories data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('categories.items', fetch, 3600, this.stepContext);
    }

    async getPlatforms(): Promise<Platform[]> {
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_PLATFORMS}`;
        const msg = 'Fetching gaming platforms data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('platforms.items', fetch, 3600, this.stepContext);
    }

    // to obtain video game data
    async getGames(): Promise<Game[]> {
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_GAMES}`;
        const msg = 'Fetching videogames data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('game.items', fetch, 3600, this.stepContext);
    }
}
