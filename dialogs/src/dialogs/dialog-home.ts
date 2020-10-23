import { ApiClient } from '../clients/api-client';
import { Configuration, Dialog, PromptCase, ScreenMessage, RouteAction } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Screen, Intent, Entity, HomeScreenData, SessionData } from '../models';
import { helper } from '../helpers/helpers';

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
        delete sessionData.items;
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        const apiClient = new ApiClient(this.config, stepContext);

        const categories = await apiClient.getCategories();
        const games = await apiClient.getGames();
        const platforms = await apiClient.getPlatforms();

        const pltId = sdk.lifecycle.getCallingEntity(stepContext, Entity.PLTID) || 'ptl01';

        // show pc data by default
        const gamesByCat = helper.getGamesByPlatform(categories, games, pltId);
        const backgrounds = helper.getCategoriesBackgrounds(categories);

        const screenData: HomeScreenData = {
            platformTitle: 'Video Game Shop Home',
            backgrounds,
            platforms,
            games: gamesByCat,
        };

        // answer for the webapp
        const message = new ScreenMessage(Screen.HOME, screenData);

        await sdk.messaging.send(stepContext, message);

        // possible operations
        const choices: string[] = [
            Intent.GAME, // go to game Dialog
        ];

        return await sdk.messaging.prompt(stepContext, HomeDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        /*
            RouteAction.PUSH to control the navigation routing between dialogs
        */

        const cases: PromptCase[] = [
            {
                operation: Intent.GAME,
                action: [RouteAction.PUSH, DialogId.HOME],
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
