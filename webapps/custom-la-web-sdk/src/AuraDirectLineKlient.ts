import { AuraCommand, AuraIntentCommand, AuraMessage } from '@telefonica/la-web-sdk';
import AuraDirectlineClient from '@telefonica/la-web-sdk/dist/services/aura/AuraDirectlineClient';
import { AuraOptions } from './main';

export type VoidFunc = () => void;

export class PrivateClient {
    appContext: any;
    livingAppStart: VoidFunc;
}

export default class AuraDirectLineKlient extends AuraDirectlineClient {
    private private: PrivateClient;
    private originalLivingAppStart: VoidFunc;
    private originalLivingAppName: string;

    constructor(options: AuraOptions) {
        super(options);

        this.private = this as any;
        this.private.appContext.livingApp.gkName = options.gkName;
        this.originalLivingAppStart = this.private.livingAppStart;
        this.private.livingAppStart = () => {
            // replace the generikon la name with the specific "la instance"
            this.originalLivingAppName = this.private.appContext.livingApp.name;
            this.private.appContext.livingApp.generik = this.originalLivingAppName;
            this.private.appContext.livingApp.name = options.gkName;
            this.originalLivingAppStart();
        };
    }

    sendIntentCommand(command: AuraIntentCommand, context?: any[]): Promise<AuraMessage> {
        return super.sendIntentCommand(
            {
                intent: 'intent.la-generikon.generik',
                entities: [{ type: 'ent.dynamic_intent', entity: command.intent }].concat(command.entities),
            },
            context,
        );
    }

    sendCommand(command: AuraCommand, context?: any[], modality?: 'form' | 'voice'): Promise<AuraMessage> {
        const newIntentCommand: AuraIntentCommand = {
            intent: 'intent.la-generikon.generik',
            entities: [],
        };
        const newCommand = {
            type: 'suggestion',
            value: newIntentCommand,
        } as AuraCommand;

        if (command.type == 'text') {
            newIntentCommand.entities.push(
                {
                    type: 'ent.dynamic_intent',
                    entity: 'utterance',
                },
                {
                    type: 'ent.utterance',
                    entity: command.value,
                },
            );
        } else {
            const originalIntent = command.value as AuraIntentCommand;
            newIntentCommand.entities.push(
                {
                    type: 'ent.dynamic_intent',
                    entity: originalIntent.intent,
                },
                ...originalIntent.entities,
            );
        }

        return super.sendCommand(newCommand, context, modality);
    }
}
