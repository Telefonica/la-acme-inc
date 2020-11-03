import {
    Action,
    ActionMessage,
    Configuration,
    Dialog,
    PromptCase,
    RouteAction,
    ScreenMessage,
} from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, GameScreenData, Entity, Screen, SessionData, Operation } from '../models';
import { ApiClient } from '../clients/api-client';
import { helper } from '../helpers/helpers';

/*
This dialog is the parent of the Home dialog
*/

export default class GameDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.GAME}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.GAME, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [this._dialogStage.bind(this), this._promptResponse.bind(this)];
    }

    protected prompts(): string[] {
        return [GameDialog.dialogPrompt];
    }

    /*
      method to clear the state of the dialogs, for example session data of a dialog
    */
    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        const apiClient = new ApiClient(this.config, stepContext);

        const games = await apiClient.getGames();

        const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID) || sessionData.currentGameId;
        const platformId = sdk.lifecycle.getCallingEntity(stepContext, Entity.PLTID);

        sessionData.currentGame = await helper.getGameById(games, gameId);

        const screenData: GameScreenData = {
            game: sessionData.currentGame,
            platformId,
        };

        // answer for the webapp
        const message = new ScreenMessage(Screen.GAME, screenData);

        await sdk.messaging.send(stepContext, message);

        // possible operations
        const choices: string[] = [
            Operation.BACK, // go back
            Operation.ADD_CART,
            Operation.CART, // go to chart Dialog
        ];

        return await sdk.messaging.prompt(stepContext, GameDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        /*
            RouteAction.PUSH to control the navigation routing between dialogs
        */
        const cases: PromptCase[] = [
            {
                operation: Operation.BACK,
                action: [RouteAction.REPLACE, DialogId.HOME],
            },
            {
                operation: Operation.CART,
                action: [RouteAction.REPLACE, DialogId.CART],
            },
            {
                operation: Operation.ADD_CART,
                logic: async () => {
                    const { currentGame } = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
                    const quantity = sdk.lifecycle.getCallingEntity(stepContext, Entity.QUANTITY);

                    await helper.addGameToCart(helper.gameToCartGame(currentGame, quantity), stepContext);

                    const msg = new ActionMessage().withAction(
                        Action.toast(`${currentGame.title} añadido a la cesta.`, 'success'),
                    );
                    await sdk.messaging.send(stepContext, msg);
                },
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
