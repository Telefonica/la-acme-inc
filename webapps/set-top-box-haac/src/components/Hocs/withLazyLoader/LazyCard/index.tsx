import React from 'react';

import { GameCardProps } from '../../../GameCardComponent';

const LazyTest = React.lazy(() => import('../../../GameCardComponent'));

const LazyCard: React.FC<GameCardProps> = ({ ...props }: GameCardProps) => (
    <React.Suspense fallback="">
        <LazyTest {...props} />
    </React.Suspense>
);

export default LazyCard;
