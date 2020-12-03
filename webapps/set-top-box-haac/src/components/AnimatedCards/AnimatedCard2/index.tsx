import React from 'react';

import './Animated2.scss';

type AnimatedCard1Props = {
    title: string;
    image: string;
    company: string;
    onClick: Function;
    addToRefs: any;
};

const AnimatedCard2: React.FC<AnimatedCard1Props> = ({ title, image, company, addToRefs }: AnimatedCard1Props) => {
    return (
        <div className="view view-second" ref={addToRefs}>
            <img src={image} />
            <div className="mask"></div>
            <div className="content">
                <h2>{title}</h2>
                <p>{company}</p>
                <a href="#" className="info">
                    BUY NOW
                </a>
            </div>
        </div>
    );
};

export default AnimatedCard2;
