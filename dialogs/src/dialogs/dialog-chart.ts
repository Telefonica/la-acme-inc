import { Configuration, Dialog, PromptCase, RouteAction, ScreenMessage } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, GameScreenData, Intent, Entity, Screen, SessionData } from '../models';
import { ApiClient } from '../clients/api-client';
import { helper } from '../helpers/helpers';

export default class ChartDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.CHART}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.CHART, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [this._dialogStage.bind(this), this._promptResponse.bind(this)];
    }

    protected prompts(): string[] {
        return [ChartDialog.dialogPrompt];
    }

    /*
      method to clear the state of the dialogs, for example session data of a dialog
    */
    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        delete sessionData.name;
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        const apiClient = new ApiClient(this.config, stepContext);

        const games = await apiClient.getGames();

        const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID);

        const gameById = await helper.getGameById(games, gameId);

        const screenData: GameScreenData = {
            title: 'Video Game Info',
            game: gameById,
        };

        // answer for the webapp
        const message = new ScreenMessage(Screen.GAME, screenData);

        await sdk.messaging.send(stepContext, message);

        // possible operations
        const choices: string[] = [
            Intent.HOME, // go to home Dialog
        ];

        return await sdk.messaging.prompt(stepContext, ChartDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        /*
            RouteAction.PUSH to control the navigation routing between dialogs
        */

        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        const context = await sdk.persistence.getStoredData(stepContext);

        const cases: PromptCase[] = [
            {
                operation: Intent.GAME,
                action: [RouteAction.PUSH, DialogId.GAME],
            },
            {
                operation: Intent.ADD_CHART,
                logic: async () => {
                    const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID);
                    if (gameId) {
                        sessionData.gameId = gameId;
                        await sdk.persistence.storeData(stepContext, { ...context, gameId });
                    }
                },
            },
            {
                operation: Intent.REMOVE_CHART,
                logic: async () => {
                    const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
                    if (sessionData.gameId) {
                        delete sessionData.gameId;
                    }
                },
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
