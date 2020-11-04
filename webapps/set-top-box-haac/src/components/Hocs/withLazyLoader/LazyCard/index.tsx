import React from 'react';
import withLazyLoader, { LazyProps } from '../withLazyLoader';

import GameCardComponent, { GameCardProps } from '../../../GameCardComponent';

type LazyImageProps = GameCardProps & LazyProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const LazyImages: React.FC<LazyImageProps> = ({ ...props }: LazyImageProps) => <GameCardComponent {...props} />;

export default withLazyLoader(LazyImages);
