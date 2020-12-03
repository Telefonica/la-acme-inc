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
import { DialogId, LIBRARY_NAME, Operation, Entity, CartScreenData, Screen, SessionData } from '../models';
import { helper } from '../helpers/helpers';
import { ApiClient } from '../clients/api-client';

export default class CartDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.CART}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.CART, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [this._dialogStage.bind(this), this._promptResponse.bind(this)];
    }

    protected prompts(): string[] {
        return [CartDialog.dialogPrompt];
    }

    /*
      method to clear the state of the dialogs, for example session data of a dialog
    */
    protected async clearDialogState(): Promise<void> {
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        const session = await sdk.lifecycle.getSessionData<SessionData>(stepContext);

        if (!session.cart?.length) {
            return await this.routeDialog(stepContext, [RouteAction.REPLACE, DialogId.HOME]);
        }

        if (session.skipScreenMessage) {
            delete session.skipScreenMessage;
        } else {
            const cart = await helper.getCart(stepContext);
            const screenData: CartScreenData = {
                games: cart,
                totalPrice: cart.reduce((totalPrice, game) => totalPrice + game.price * game.quantity, 0),
            };

            // answer for the webapp
            const message = new ScreenMessage(Screen.CART, screenData);

            await sdk.messaging.send(stepContext, message);
        }
        // possible operations
        const choices: string[] = [
            Operation.BACK,
            Operation.REMOVE_CART,
            Operation.QUANTITY_ADD,
            Operation.QUANTITY_REMOVE,
        ];

        return await sdk.messaging.prompt(stepContext, CartDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const cases: PromptCase[] = [
            {
                operation: Operation.BACK,
                action: [RouteAction.POP],
            },
            {
                operation: Operation.REMOVE_CART,
                action: [RouteAction.NONE],
                logic: async () => {
                    const session = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
                    session.skipScreenMessage = true;

                    const apiClient = new ApiClient(this.config, stepContext);

                    const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID);
                    const games = await apiClient.getGames();
                    const { title } = helper.getGameById(games, gameId);
                    await helper.removeGameFromCart(gameId, stepContext);

                    const msg = new ActionMessage().withAction(
                        Action.toast(`${title} fue eliminado de la cesta.`, 'success'),
                    );
                    await sdk.messaging.send(stepContext, msg);
                },
            },
            {
                operation: Operation.QUANTITY_ADD,
                action: [RouteAction.NONE],
                logic: async () => {
                    const session = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
                    session.skipScreenMessage = true;
                    const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID);
                    await helper.addGameQuantity(gameId, stepContext);
                },
            },
            {
                operation: Operation.QUANTITY_REMOVE,
                action: [RouteAction.NONE],
                logic: async () => {
                    const session = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
                    session.skipScreenMessage = true;
                    const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID);
                    await helper.removeItemQuantity(gameId, stepContext);
                },
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
