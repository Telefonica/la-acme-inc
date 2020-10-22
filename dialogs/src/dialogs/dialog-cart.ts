import { Configuration, Dialog, PromptCase, RouteAction } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Intent, Entity, SessionData } from '../models';

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
        delete sessionData.items;
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        // possible operations
        const choices: string[] = [
            Intent.HOME, // go to home Dialog
            Intent.GAME, // go to game Dialog
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
                action: [RouteAction.PUSH, DialogId.CART],
            },
            {
                operation: Intent.HOME,
                action: [RouteAction.PUSH, DialogId.CART],
            },
            {
                operation: Intent.ADD_CART,
                logic: async () => {
                    const name = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMENAME);
                    const quantity = sdk.lifecycle.getCallingEntity(stepContext, Entity.QUANTITY);

                    sessionData.items.push({
                        name,
                        quantity,
                    });

                    await sdk.persistence.storeData(stepContext, { ...context, sessionData });
                },
            },
            {
                operation: Intent.REMOVE_CART,
                logic: async () => {
                    // TODO delete game in items array of cart
                },
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
