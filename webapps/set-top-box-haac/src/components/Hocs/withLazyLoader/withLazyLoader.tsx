import React, { useEffect, useState, useRef } from 'react';

export type LazyProps<R extends React.HTMLAttributes<T>, T> = React.DetailedHTMLProps<R, T>;

export const withLazyLoader = <R extends React.HTMLAttributes<T>, T extends HTMLElement>(
    Comp: React.ComponentType<LazyProps<R, T>>,
): React.FC<LazyProps<R, T>> => {
    const Hoc: React.FC<LazyProps<R, T>> = ({ ...props }: LazyProps<R, T>) => {
        const [show, setShow] = useState(true);

        const observableObjectRef: React.Ref<HTMLDivElement> = useRef(null);

        useEffect(() => {
            const onChange = (entries: IntersectionObserverEntry[]) => {
                const el = entries[0];
                setShow(el.isIntersecting);
            };
            const observer = new IntersectionObserver(onChange, {
                rootMargin: '100px',
            });

            observableObjectRef.current && observer.observe(observableObjectRef.current);
        });
        return <div ref={observableObjectRef}>{show && <Comp {...props} />}</div>;
    };

    return Hoc;
};

export default withLazyLoader;
