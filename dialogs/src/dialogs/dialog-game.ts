import { Configuration, Dialog, PromptCase, RouteAction } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, SessionData, Intent, Entity } from '../models';

/*
This dialog is the parent of the Home dialog
*/

export default class GameDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.HOME}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.HOME, config);
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
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        delete sessionData.name;
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {     

        // possible operations
        const choices: string[] = [
            Intent.GAME, // go to game Dialog
        ];

        return await sdk.messaging.prompt(stepContext, GameDialog.dialogPrompt, choices);
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
                operation: Intent.GAMEID,
                logic: async () => {
                   const gameId = sdk.lifecycle.getCallingEntity(stepContext, Entity.GAMEID); 
                   console.log('gameId', gameId);                   
                },
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
