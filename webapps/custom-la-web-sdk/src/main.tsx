import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import {
    BackgroundContextProvider,
    Channel,
    Env,
    EnvsConfig,
    Instrumentation,
    KeysHandler,
    Loading,
    NavigationContextProvider,
    QnaComponent,
    Routes,
    Terms,
    remoteConsole,
    urlParams,
} from '@telefonica/la-web-sdk';

import { Options as OriginalOptions } from '@telefonica/la-web-sdk';
import App from '@telefonica/la-web-sdk/dist/App';
import VideoContextProvider from '@telefonica/la-web-sdk/dist/contexts/VideoContext';
import { Options as OriginalAuraOptions } from '@telefonica/la-web-sdk/dist/services/aura/models';
import Stb from '@telefonica/la-web-sdk/dist/services/stb';

import { AuraKontextProvider } from './AuraKontext';

export type Options = OriginalOptions & {
    gkName?: string;
};

export type AuraOptions = OriginalAuraOptions & {
    gkName?: string;
};

const baseRoutes: Routes = {
    loading: () => Loading,
    terms: () => Terms,
    qna: () => QnaComponent,
};

async function initRemoteConsole(): Promise<void> {
    const env = urlParams.env || (window as any).ENV || Env.PRO;
    const envConfig = EnvsConfig[env];

    // If console was explicitly specified, wait for it to be online
    if (Stb.isPresent() && urlParams.consoleIp?.indexOf('192.168.') === 0) {
        return remoteConsole(urlParams.consoleIp);
    }

    // If console was not explicity specified but is set in environment, return immediately
    if (Stb.isPresent() && envConfig.consoleIp?.indexOf('192.168.') === 0) {
        remoteConsole(envConfig.consoleIp);
        return;
    }

    console.debug('init - remote console not configured');
}

function scale() {
    let meta = document.head.querySelector('[name=viewport]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'width=device-width, initial-scale=0.667');
}

function initInstrumentation() {
    if (urlParams.instApi) {
        return new Instrumentation(urlParams.instApi).init();
    }

    console.debug('init - instrumentation not configured');
}

export function init(options: Options) {
    const env = urlParams.env || (window as any).ENV || Env.PRO;
    const envConfig = EnvsConfig[env];

    const auraOptions: AuraOptions = {
        channel: options.channel,
        gkName: urlParams.gkName || options.gkName,
        laName: urlParams.laName || options.laName,
        laId: urlParams.laId || options.laId,
        laPrefix: urlParams.laPrefix || options.laPrefix,
        laPrettyName: urlParams.laPrettyName || options.laPrettyName,
        laSessionId: urlParams.laSessionId || options.laSessionId,
        authApi: envConfig[options.channel],
        dlSecret: urlParams.dlSecret || options.dlSecret,
        dlToken: urlParams.dlToken || options.dlToken,
        dlConversationId: urlParams.dlConversationId || options.dlConversationId,
        auraId: urlParams.auraId || options.auraId,
        auraMockClient: options.auraMockClient,
    };

    const interval = window.setInterval(() => {}, 50);
    options.channel === Channel.MH && scale();
    initInstrumentation();
    initRemoteConsole()
        .then(() => Stb.init())
        .then(() => Stb.initVoice())
        .then((hasVoice) => KeysHandler.init(hasVoice))
        .then(() => {
            ReactDOM.render(
                <AuraKontextProvider auraOptions={auraOptions}>
                    <NavigationContextProvider>
                        <VideoContextProvider>
                            <BackgroundContextProvider>
                                <App routes={{ ...baseRoutes, ...options.screens }} />
                            </BackgroundContextProvider>
                        </VideoContextProvider>
                    </NavigationContextProvider>
                </AuraKontextProvider>,
                document.getElementById('root'),
            );
        })
        .catch(() => {
            console.debug('init - error starting 3PA');
            return Stb.exit();
        })
        .finally(() => window.clearInterval(interval));
}
