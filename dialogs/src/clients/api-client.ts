import { ApiClient as BaseApiClient, Configuration, HTTPMethod } from '@telefonica/la-bot-sdk';
import { WaterfallStepContext } from 'botbuilder-dialogs';

export class ApiClient extends BaseApiClient {

    constructor(private readonly config: Configuration, stepContext: WaterfallStepContext) {
        super(stepContext, false);
    }
    // to obtain video game categories data grouped by genre  
    async getCategories(): Promise<void> {
        // import mock data
        const categories = require('./mocks/categories.json');
        const msg = 'Fetching genre videogames from mock data';
        return this.setupRequest(HTTPMethod.GET, this.config.LA_ACME_INC_API_MOCK, msg)
            .withMock(categories)
            .withTimeout(10000)
            .execute<any>();
    }
}
