import React from 'react';

import './Animated2.scss';

type AnimatedCard1Props = {
    title: string;
    image: string;
    company: string;
    onClick: Function;
};

const AnimatedCard2: React.FC<AnimatedCard1Props> = ({ title, image, company }: AnimatedCard1Props) => {
    return (
        <div className="view view-second">
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
