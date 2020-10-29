import { Configuration, Dialog, PromptCase, RouteAction } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Intent, SessionData, Entity, Operation } from '../models';
import { helper } from '../helpers/helpers';
import { ApiClient } from '../clients/api-client';

export default class ChartDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.CART}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.CART, config);
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
        delete sessionData.games;
        delete sessionData.platformId;
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        helper.getCart(stepContext);

        // possible operations
        const choices: string[] = [
            Intent.HOME, // go to home Dialog
            Intent.GAME, // go to game Dialog
        ];

        return await sdk.messaging.prompt(stepContext, ChartDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const apiClient = new ApiClient(this.config, stepContext);

        const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID);
        const quantity = sdk.lifecycle.getCallingEntity(stepContext, Entity.QUANTITY);

        const games = await apiClient.getGames();
        const game = helper.getGameById(games, gameId);

        const cases: PromptCase[] = [
            {
                operation: Intent.GAME,
                action: [RouteAction.PUSH, DialogId.CART],
            },
            {
                operation: Intent.HOME,
                action: [RouteAction.PUSH, DialogId.CART],
            },
            {
                operation: Operation.ADD_CART,
                logic: async () => {
                    console.log('ADD_CART');
                    await helper.addGameToCart(helper.gameToCartGame(game, quantity), stepContext);
                },
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
