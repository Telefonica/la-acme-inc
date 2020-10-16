import React, { useEffect, useState, useRef } from 'react';

export const withLazyLoader = (Comp: React.ComponentType<any>): React.FC<any> => {
    const Hoc: React.FC<any> = (props: any) => {
        const [show, setShow] = useState(true);

        const observableObjectRef: any = useRef(null);

        useEffect(() => {
            const onChange = (entries: any) => {
                const el = entries[0];
                setShow(el.isIntersecting);
            };
            const observer = new IntersectionObserver(onChange, {
                rootMargin: '100px',
            });

            observer.observe(observableObjectRef.current);
        });
        return <div ref={observableObjectRef}>{show && <Comp {...props} />}</div>;
    };

    return Hoc;
};

export default withLazyLoader;
