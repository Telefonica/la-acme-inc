
import { ApiClient } from '../clients/api-client';
import { Configuration, Dialog, PromptCase, ScreenMessage, RouteAction, Suggestion } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Screen, SessionData, Intent, Entity } from '../models';

/*
This dialog is the parent of the action, adventure, simulation and sport dialogs
*/

export default class HomeDialog extends Dialog {

    static readonly dialogPrompt = `${DialogId.HOME}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.HOME, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [this._dialogStage.bind(this), this._promptResponse.bind(this)];
    }

    protected prompts(): string[] {
        return [HomeDialog.dialogPrompt];
    }

    /*
      method to clear the state of the dialogs, for example session data of a dialog
    */
    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        delete sessionData.name;
        return;
    }

    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {

        // get the session data from sdk
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);

        // getting the persistent data from sdk
        const context = await sdk.persistence.getStoredData(stepContext);

        const name = sessionData.name || context.name;

        // instantiate the client
        const apiClient = new ApiClient(this.config, stepContext);

        // videogames categories data
        const categories = await apiClient.getCategories()

        const screenData: any = {
            title: 'VIDEOGAMES CATEGORIES',
            categories,
            suggestions: Suggestion.getSuggestions(stepContext, 'home.suggestion', { name }) // TODO config para usar locale (LANGUAGES)
        };

        // answer for the webapp
        const message = new ScreenMessage(Screen.HOME, screenData)
            .withText('home.welcome')
            .withSpeak('home.welcome');

        await sdk.messaging.send(stepContext, new ScreenMessage(Screen.HOME, message));

        // possible operations
        const choices: string[] = [
            Intent.ADVENTURE,// go to adventure Dialog
            Intent.ACTION,// go to action dialog
            Intent.SIMULATION, // go to simulation dialog
            Intent.SPORTS, // go to sports dialog
        ];

        return await sdk.messaging.prompt(stepContext, HomeDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {

        // session data from user
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);

        // getting the persistent data from sdk
        const context = await sdk.persistence.getStoredData(stepContext);

        /*
            RouteAction.PUSH to control the navigation routing between dialogs
        */

        const cases: PromptCase[] = [
            {
                operation: Intent.ADVENTURE,
                action: [RouteAction.PUSH, DialogId.ADVENTURE]
            },
            {
                operation: Intent.ACTION,
                action: [RouteAction.PUSH, DialogId.ACTION]
            },
            {
                operation: Intent.SIMULATION,
                action: [RouteAction.PUSH, DialogId.SIMULATION]
            },
            {
                operation: Intent.SPORTS,
                action: [RouteAction.PUSH, DialogId.SPORTS]
            },
            {
                operation: Intent.NAME,
                logic: async () => {
                    const name = sdk.lifecycle.getCallingEntity(stepContext, Entity.NAME);
                    if (name) {
                        sessionData.name = name;
                        await sdk.persistence.storeData(stepContext, { ...context, name });
                    }
                }
            }
        ];

        return super.promptHandler(stepContext, cases);
    }
}
