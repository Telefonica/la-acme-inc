import { ApiClient } from '../clients/api-client';
import { Configuration, Dialog, PromptCase, ScreenMessage, RouteAction } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Screen, Intent, Entity, HomeScreenData } from '../models';
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
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        const apiClient = new ApiClient(this.config, stepContext);

        const categories = await apiClient.getCategories();
        const games = await apiClient.getGames();
        const platforms = await apiClient.getPlatforms();

        // show pc data by default
        const pcGamesByCat = await helper.getGamesByPl(categories, games, 'pc');

        console.log('test 2', pcGamesByCat);

        const screenData: HomeScreenData = {
            title: 'Video Game Shop Home',
            platforms,
            categories,
            gameList: {
                action: pcGamesByCat[0],
                indie: pcGamesByCat[1],
                sports: pcGamesByCat[2],
                rpg: pcGamesByCat[3],
            },
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
                action: [RouteAction.PUSH, DialogId.GAME],
            },
            {
                operation: Intent.PLTID,
                logic: async () => {
                    const pltId = sdk.lifecycle.getCallingEntity(stepContext, Entity.PLTID);
                    console.log('pltId ', pltId);                    
                },
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
