import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { AuraContext, AuraContextObject, AuraIntentCommand, AuraMessage } from '@telefonica/la-web-sdk';
import { Action } from '@telefonica/la-web-sdk/dist/models/Aura';
import AuraBaseClient from '@telefonica/la-web-sdk/dist/services/aura/AuraBaseClient';
import AuraMhClient from '@telefonica/la-web-sdk/dist/services/aura/AuraMhClient';
import { Monitor } from '@telefonica/la-web-sdk/dist/services/monitoring';

import AuraDirectLineKlient from './AuraDirectLineKlient';
import AuraMockKlient from './AuraMockKlient';
import { AuraOptions } from './main';

type Props = {
    auraOptions: AuraOptions;
    children: ReactNode;
};

function getAuraClient(options: AuraOptions): AuraBaseClient {
    if (AuraMhClient.exists()) {
        return new AuraMhClient(options);
    } else if (options.auraMockClient) {
        return new AuraMockKlient(options);
    } else {
        return new AuraDirectLineKlient(options);
    }
}

const KEEP_ALIVE_PERIOD = 15 * 60 * 1000;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const AuraKontextProvider = ({ children, auraOptions }: Props) => {
    const [message, setMessage] = useState<AuraMessage>();
    const auraRef = useRef<AuraBaseClient>(getAuraClient(auraOptions));
    const subscribers = useRef<{ [key: number]: React.RefObject<(actions: Action[]) => void> }>({});
    const keepAliveInterval = useRef<number>(0);

    const subscribe = useCallback((ref: React.RefObject<(actions: Action[]) => void>) => {
        const id = Math.max(0, ...Object.keys(subscribers.current).map((key) => Number(key))) + 1;
        subscribers.current[id] = ref;
        return id;
    }, []);

    const unsubscribe = useCallback((id: number) => {
        delete subscribers.current[id];
    }, []);

    const clearKeepAlive = useCallback(() => {
        window.clearInterval(keepAliveInterval.current);
        keepAliveInterval.current = 0;
    }, []);

    const setKeepAlive = useCallback(() => {
        if (!keepAliveInterval.current) {
            keepAliveInterval.current = window.setInterval(() => {
                auraRef.current.sendIntentCommand({ intent: 'intent.operation.sdk.keep-alive', entities: [] });
            }, KEEP_ALIVE_PERIOD);
        }
    }, []);

    const eventCallback = useCallback(
        (message: AuraMessage) => {
            if (!Monitor.isInitialized() && message.hasMonitoringData()) {
                const { appKey, sessionId, userId } = message.getData().monitoring;
                Monitor.initialize(appKey, sessionId, userId, auraRef.current.getChannel());
            }

            if (message.getData().screen || message.isError()) {
                setMessage(message);

                //TODO(dani): Keep Alives always disabled by default on screen change for now
                clearKeepAlive();
            }

            if (message.hasLivingAppActions()) {
                Object.values(subscribers.current).forEach((ref) =>
                    setTimeout(() => ref.current && ref.current(message.getLivingAppActions())),
                );
            }
        },
        [clearKeepAlive],
    );

    useEffect(() => {
        auraRef.current.init(eventCallback);
    }, [eventCallback]);

    const value: AuraContext = {
        hasError: useCallback(() => message?.isError() || false, [message]),
        getData: useCallback(() => message?.getData() || {}, [message]),
        acceptTerms: useCallback(() => auraRef.current.acceptTerms(), []),
        rejectTerms: useCallback(() => auraRef.current.rejectTerms(), []),
        sendCommand: useCallback((command: AuraIntentCommand) => auraRef.current.sendIntentCommand(command), []),
        sendTextCommand: useCallback((text: string) => auraRef.current.sendTextCommand(text), []),
        close: useCallback(() => auraRef.current.close(), []),
        restart: useCallback(
            () => (auraRef.current.isInitialized() ? auraRef.current.restart() : auraRef.current.init(eventCallback)),
            [eventCallback],
        ),
        getChannel: useCallback(() => auraRef.current.getChannel(), []),
        subscribe: useCallback((ref: React.RefObject<(actions: Action[]) => void>) => subscribe(ref), [subscribe]),
        unsubscribe: useCallback((id: number) => unsubscribe(id), [unsubscribe]),
        setKeepAlive,
        clearKeepAlive,
    };

    return <AuraContextObject.Provider value={value}>{children}</AuraContextObject.Provider>;
};
