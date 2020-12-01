import { Configuration, Dialog, PromptCase, RouteAction } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Operation, Entity } from '../models';
import { helper } from '../helpers/helpers';

/*
This dialog is the parent of the action, adventure, simulation and sport dialogs
*/

export default class CartQuantityDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.CART_QUANTITY}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.CART_QUANTITY, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [this._dialogStage.bind(this), this._promptResponse.bind(this)];
    }

    protected prompts(): string[] {
        return [CartQuantityDialog.dialogPrompt];
    }

    /*
      method to clear the state of the dialogs, for example session data of a dialog
    */
    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        // possible operations
        const choices: string[] = [Operation.QUANTITY_ADD, Operation.QUANTITY_REMOVE];
        return await sdk.messaging.prompt(stepContext, CartQuantityDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const cases: PromptCase[] = [
            {
                operation: Operation.QUANTITY_ADD,
                action: [RouteAction.NONE],
                logic: async () => {
                    const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID);
                    console.log('addGameQuantity');
                    await helper.addGameQuantity(gameId, stepContext);
                },
            },
            {
                operation: Operation.QUANTITY_REMOVE,
                action: [RouteAction.NONE],
                logic: async () => {
                    const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID);
                    await helper.removeGameFromCart(gameId, stepContext);
                },
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
