import { Configuration, Dialog, PromptCase, RouteAction, Action, ActionMessage } from '@telefonica/la-bot-sdk';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, SessionData, Operation } from '../models';

/*
This dialog is the parent of the action, adventure, simulation and sport dialogs
*/

export default class NavigationDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.NAVIGATION}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.NAVIGATION, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [this._dialogStage.bind(this), this._promptResponse.bind(this)];
    }

    protected prompts(): string[] {
        return [NavigationDialog.dialogPrompt];
    }

    /*
      method to clear the state of the dialogs, for example session data of a dialog
    */
    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        delete sessionData.platformId;
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async _dialogStage(stepContext: WaterfallStepContext<any>): Promise<DialogTurnResult> {
        // possible operations
        const choices: string[] = [Operation.NAVIGATION];
        const msg = new ActionMessage().withAction(Action.customAction('toggleNavigation', {}));
        await sdk.messaging.send(stepContext, msg);

        return await sdk.messaging.prompt(stepContext, NavigationDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const cases: PromptCase[] = [
            {
                operation: Operation.NAVIGATION,
                action: [RouteAction.NONE],
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
