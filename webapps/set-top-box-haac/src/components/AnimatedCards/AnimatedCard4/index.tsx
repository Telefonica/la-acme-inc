import React from 'react';

import './Animated4.scss';

type AnimatedCard4Props = {
    title: string;
    image: string;
    company: string;
    onClick: Function;
};

const AnimatedCard4: React.FC<AnimatedCard4Props> = ({ title, image, company }: AnimatedCard4Props) => {
    return (
        <div className="view view-fourth">
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

export default AnimatedCard4;
