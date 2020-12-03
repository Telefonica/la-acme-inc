import React from 'react';

import './Animated3.scss';

type AnimatedCard3Props = {
    title: string;
    image: string;
    company: string;
    onClick: Function;
    addToRefs: any;
};

const AnimatedCard3: React.FC<AnimatedCard3Props> = ({ title, image, company, addToRefs }: AnimatedCard3Props) => {
    return (
        <div className="view view-third" ref={addToRefs}>
            <img src={image} />
            <div className="mask">
                <h2>{title}</h2>
                <p>{company}</p>
                <a href="#" className="info">
                    BUY NOW
                </a>
            </div>
        </div>
    );
};

export default AnimatedCard3;
