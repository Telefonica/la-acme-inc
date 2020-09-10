import { ApiClient as BaseApiClient, Configuration, HTTPMethod } from '@telefonica/la-bot-sdk';
import { WaterfallStepContext } from 'botbuilder-dialogs';

export class ApiClient extends BaseApiClient {
    constructor(private readonly config: Configuration, stepContext: WaterfallStepContext) {
        super(stepContext, false);
    }

    async getData(): Promise<void> {
        return this.setupRequest(HTTPMethod.GET, this.config.apiUrl, 'fetching data').execute();
    }
}
