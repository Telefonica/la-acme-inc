import React from 'react';

import './Animated1.scss';

type AnimatedCard1Props = {
    title: string;
    image: string;
    company: string;
    onClick: Function;
};

const AnimatedCard1: React.FC<AnimatedCard1Props> = ({ title, image, company }: AnimatedCard1Props) => {
    return (
        <div className="view view-first">
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

export default AnimatedCard1;
