import { ApiClient as BaseApiClient, Configuration, HTTPMethod } from '@telefonica/la-bot-sdk';
import { WaterfallStepContext } from 'botbuilder-dialogs';
import * as sdk from '@telefonica/la-bot-sdk';
import { Category, Game } from '../models';

export class ApiClient extends BaseApiClient {
    private config: Configuration;

    constructor(config: Configuration, stepContext: WaterfallStepContext) {
        super(stepContext, config.LA_EXAMPLE_API_MOCK);
        this.config = config;
    }
    // to obtain video game categories data
    async getCategories(): Promise<Category[]> {
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_CATEGORIES}`;
        const msg = 'Fetching genre videogames data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('categories.items', fetch, 3600, this.stepContext);
    }

    // to obtain video game action data
    async getAction(): Promise<Game[]> {
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_ACTION}`;
        const msg = 'Fetching action videogames data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('action.games', fetch, 3600, this.stepContext);
    }

    // to obtain video game action data
    async getAdventure(): Promise<Game[]> {
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_ADVENTURE}`;
        const msg = 'Fetching adventure videogames data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('adventure.games', fetch, 3600, this.stepContext);
    }

    // to obtain video game rpg data
    async getRPG(): Promise<Game[]> {
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_RPG}`;
        const msg = 'Fetching rpg videogames data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('rpg.games', fetch, 3600, this.stepContext);
    }

    // to obtain video game indies data
    async getIndie(): Promise<Game[]> {
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_INDIE}`;
        const msg = 'Fetching indie videogames data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('indie.games', fetch, 3600, this.stepContext);
    }
}
