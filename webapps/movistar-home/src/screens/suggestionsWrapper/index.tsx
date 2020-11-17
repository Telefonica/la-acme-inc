import React from 'react';
import { MhSuggestionsComponent, Preloadable } from '@telefonica/la-web-sdk';

const MhSuggestionsWrapper: React.FC<Preloadable> = (props: Preloadable) => <MhSuggestionsComponent {...props} />;

export default MhSuggestionsWrapper;
