import AuraMockClient from '@telefonica/la-web-sdk/dist/services/aura/AuraMockClient';
import { AuraOptions } from './main';
import { PrivateClient, VoidFunc } from './AuraDirectLineKlient';

export default class AuraMockKlient extends AuraMockClient {
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
}
