import React from 'react';

import './Animated9.scss';

type AnimatedCard1Props = {
    title: string;
};

const AnimatedCard1: React.FC<AnimatedCard1Props> = ({ title }: AnimatedCard1Props) => {
    return (
        <div className="view view-ninth">
            <img src="https://tympanus.net/Tutorials/OriginalHoverEffects/images/9.jpg" />
            <div className="mask mask-1"></div>
            <div className="mask mask-2"></div>
            <div className="content">
                <h2>Hover Style #9</h2>
                <p>Some Text</p>
                <a href="#" className="info">
                    Read More
                </a>
            </div>
        </div>
    );
};

export default AnimatedCard1;
