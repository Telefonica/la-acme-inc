import { ApiClient as BaseApiClient, Configuration, HTTPMethod } from '@telefonica/la-bot-sdk';
import { WaterfallStepContext } from 'botbuilder-dialogs';
import { GenreCategory } from '../models';

import * as categories from './mocks/categories.json';

export class ApiClient extends BaseApiClient {
    constructor(private readonly config: Configuration, stepContext: WaterfallStepContext) {
        super(stepContext, config.LA_ACME_INC_API_MOCK);
    }
    // to obtain video game categories data grouped by genre
    async getCategories(): Promise<GenreCategory[]> {
        // import mock data
        const url = `${this.config.LA_ACME_INC_API_BASE_URL}${this.config.LA_ACME_INC_API_GET_CATEGORIES}`;
        const msg = 'Fetching genre videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, url, msg)
            .withMock(categories)
            .withTimeout(10000)
            .execute<any>()
            .then((categoriesObject) => categoriesObject.categories);
    }
}
