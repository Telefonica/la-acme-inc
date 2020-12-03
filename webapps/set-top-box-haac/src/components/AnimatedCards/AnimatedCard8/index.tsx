import React from 'react';

import './Animated8.scss';

type AnimatedCard1Props = {
    title: string;
};

const AnimatedCard1: React.FC<AnimatedCard1Props> = ({ title }: AnimatedCard1Props) => {
    return (
        <div className="view view-eighth">
            <img src="https://tympanus.net/Tutorials/OriginalHoverEffects/images/8.jpg" />
            <div className="mask">
                <h2>Title</h2>
                <p>Your Text</p>
                <a href="#" className="info">
                    Read More
                </a>
            </div>
        </div>
    );
};

export default AnimatedCard1;