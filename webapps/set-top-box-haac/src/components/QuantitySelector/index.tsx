import React from 'react';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';
import { NavigableWrapper } from '@telefonica/la-web-sdk';

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 0',
    },
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 58,
        height: 58,
        textAlign: 'center',
        fontSize: 35,
        color: '#f4f4f4',
        background: '#4a4a4a',
        border: '4px solid #4a4a4a',
        borderRadius: 8,
        fontFamily: 'Work Sans',

        '&.navigable-focused': {
            borderColor: '#be574e',
        },
    },
    counter: {
        width: 70,
        margin: '0 16px',
        background: 'transparent',
        boxSizing: 'border-box',
        lineHeight: '52px',
    },
    decrement: {
        paddingBottom: 3,
    },
});

type Props = {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

const QuantitySelector: React.FC<Props> = ({ value, onIncrement, onDecrement }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <NavigableWrapper id="quantity-selector-decrement" onClick={onDecrement}>
                <button className={classnames(classes.box, classes.decrement)}>-</button>
            </NavigableWrapper>
            <span className={classnames(classes.box, classes.counter)}>{value}</span>
            <NavigableWrapper defaultFocused id="quantity-selector-increment" onClick={onIncrement}>
                <button className={classes.box}>+</button>
            </NavigableWrapper>
        </div>
    );
};

export default QuantitySelector;
