import { Configuration, StartDialog as BaseStartDialog } from '@telefonica/la-bot-sdk';

import { LIBRARY_NAME } from '../models';

export default class StartDialog extends BaseStartDialog {
    constructor(config: Configuration) {
        super(LIBRARY_NAME, config);
    }
}
