import React from 'react';

import './Metacritic.scss';

type MetacriticProps = {
    score: number;
};

const Metacritic: React.FC<MetacriticProps> = ({ score }: MetacriticProps) => {
    const BackgroundColor = score < 50 ? 'red' : score < 70 ? 'yellow' : 'green';
    return <div className={`metacritic metacritic__${BackgroundColor}`}>{score}</div>;
};

export default Metacritic;
