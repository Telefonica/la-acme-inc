import { Configuration, Dialog, PromptCase, RouteAction, ScreenMessage } from '@telefonica/la-bot-sdk';
import { ApiClient } from '../clients/api-client';
import * as sdk from '@telefonica/la-bot-sdk';
import { DialogTurnResult, WaterfallStep, WaterfallStepContext } from 'botbuilder-dialogs';
import { DialogId, LIBRARY_NAME, Intent, GameScreenData, Screen } from '../models';

/* dialog simulation child of HOME */

export default class SimulationDialog extends Dialog {
    static readonly dialogPrompt = `${DialogId.SIMULATION}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.SIMULATION, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [this._dialogStage.bind(this), this._promptResponse.bind(this)];
    }

    protected prompts(): string[] {
        return [SimulationDialog.dialogPrompt];
    }

    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        return;
    }

    private async _dialogStage(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        // instantiate the client
        const apiClient = new ApiClient(this.config, stepContext);

        // videogames data
        const games = await apiClient.getSimulation();

        const screenData: GameScreenData = {
            title: 'SIMULATION VIDEOGAMES',
            games,
        };

        // answer for the webapp
        const message = new ScreenMessage(Screen.ADVENTURE, screenData);

        await sdk.messaging.send(stepContext, message);
        // user choices operations
        const choices: string[] = [
            Intent.BACK, // go back
        ];
        return await sdk.messaging.prompt(stepContext, SimulationDialog.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const cases: PromptCase[] = [
            {
                operation: Intent.BACK, // go back
                action: [RouteAction.POP], // save this navigation in the routing
            },
        ];

        return super.promptHandler(stepContext, cases);
    }
}
