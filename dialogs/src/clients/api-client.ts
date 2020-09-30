import { ApiClient as BaseApiClient, Configuration, HTTPMethod } from '@telefonica/la-bot-sdk';
import { WaterfallStepContext } from 'botbuilder-dialogs';
import { Category, Game } from '../models';

// mock data from jsons
import * as categories from './mocks/categories.json';
import * as action from './mocks/action.json';
import * as adventure from './mocks/adventure.json';
import * as simulation from './mocks/simulation.json';
import * as sports from './mocks/sports.json';

export class ApiClient extends BaseApiClient {
    constructor(private readonly config: Configuration, stepContext: WaterfallStepContext) {
        super(stepContext, config.LA_ACME_INC_API_MOCK);
    }
    // to obtain video game categories data
    async getCategories(): Promise<Category[]> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_CATEGORIES}`;
        const msg = 'Fetching genre videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, url, msg)
            .withMock(categories)
            .withTimeout(10000)
            .execute<any>()
            .then((categoriesObject) => categoriesObject.categories);
    }

    // to obtain video game action data
    async getAction(): Promise<Game> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_ACTION}`;
        const msg = 'Fetching action videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, url, msg)
            .withMock(action)
            .withTimeout(10000)
            .execute<any>()
            .then((actionObject) => actionObject.games);
    }

    // to obtain video game action data
    async getAdventure(): Promise<Game> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_ADVENTURE}`;
        const msg = 'Fetching adventure videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, url, msg)
            .withMock(adventure)
            .withTimeout(10000)
            .execute<any>()
            .then((adventureObject) => adventureObject.games);
    }

    // to obtain video game simulation data
    async getSimulation(): Promise<Game> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_SIMULATION}`;
        const msg = 'Fetching simulation videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, url, msg)
            .withMock(simulation)
            .withTimeout(10000)
            .execute<any>()
            .then((adventureObject) => adventureObject.games);
    }

    // to obtain video game sports data
    async getSports(): Promise<Game> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_SPORTS}`;
        const msg = 'Fetching sports videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, url, msg)
            .withMock(sports)
            .withTimeout(10000)
            .execute<any>()
            .then((sportsObject) => sportsObject.games);
    }
}
