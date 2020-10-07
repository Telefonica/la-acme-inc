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
        const msg = 'Fetching genre videogames from mock data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('categories.items', fetch, 3600, this.stepContext);
    }

    // to obtain video game action data
    async getAction(): Promise<Game[]> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_ACTION}`;
        const msg = 'Fetching action videogames from mock data';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, url, msg).withMock({}).withTimeout(10000).execute<any>();

        return sdk.cacheGet<any>('action.games', fetch, 3600, this.stepContext);
    }

    // to obtain video game action data
    async getAdventure(): Promise<Game[]> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_ADVENTURE}`;
        const msg = 'Fetching adventure videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, url, msg)
            .withMock({})
            .withTimeout(10000)
            .execute<any>()
            .then((adventureObject) => adventureObject.games);
    }

    // to obtain video game simulation data
    async getSimulation(): Promise<Game[]> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_SIMULATION}`;
        const msg = 'Fetching simulation videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, url, msg)
            .withMock({})
            .withTimeout(10000)
            .execute<any>()
            .then((adventureObject) => adventureObject.games);
    }

    // to obtain video game sports data
    async getSports(): Promise<Game[]> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_SPORTS}`;
        const msg = 'Fetching sports videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, url, msg)
            .withMock({})
            .withTimeout(10000)
            .execute<any>()
            .then((sportsObject) => sportsObject.games);
    }
}
