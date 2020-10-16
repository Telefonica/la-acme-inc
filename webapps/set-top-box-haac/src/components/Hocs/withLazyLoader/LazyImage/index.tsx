import React from 'react';
import withLazyLoader from '../withLazyLoader';

type LazyImagesProps = {
    src: string;
    className: string;
    alt: string;
};

const LazyImages: React.FC<LazyImagesProps> = ({ src, className, alt }: LazyImagesProps) => (
    <img src={src} className={className} alt={alt} />
);

export default withLazyLoader(LazyImages);
