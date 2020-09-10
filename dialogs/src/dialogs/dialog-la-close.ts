import { CloseDialog as BaseCloseDialog, Configuration } from '@telefonica/la-bot-sdk';

import { LIBRARY_NAME } from '../models';

export default class CloseDialog extends BaseCloseDialog {
    constructor(config: Configuration) {
        super(LIBRARY_NAME, config);
    }
}
