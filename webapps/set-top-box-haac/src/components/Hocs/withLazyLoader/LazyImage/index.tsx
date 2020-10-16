import React from 'react';
import withLazyLoader, { LazyProps } from '../withLazyLoader';

type LazyImageProps = LazyProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const LazyImages: React.FC<LazyImageProps> = ({ ...props }: LazyImageProps) => <img {...props} />;

export default withLazyLoader(LazyImages);
