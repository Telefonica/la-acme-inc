import React from 'react';
import { screenReady } from '@telefonica/la-web-sdk';

const ErrorScreen: React.FC = () => {
    return <div className="ErrorScreen">ERROR</div>;
};

export default screenReady(ErrorScreen);
