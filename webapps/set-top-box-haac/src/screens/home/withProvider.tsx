import { Preloadable } from '@telefonica/la-web-sdk';
import React from 'react';
import { Provider } from 'react-redux';
import Store from '../../redux/store/store';

export const withProvider = (Comp: React.ComponentType<any>): React.FC<Preloadable> => {
    const Hoc: React.FC<Preloadable> = ({ ...props }) => {
        return (
            <Provider store={Store}>
                <Comp {...props} />
            </Provider>
        );
    };

    return Hoc;
};

export default withProvider;
