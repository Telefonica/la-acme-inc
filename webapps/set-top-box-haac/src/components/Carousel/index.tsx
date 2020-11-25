import { NavigableWrapper } from '@telefonica/la-web-sdk';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type CarouselTitleProps = {
    focusedVerticalIndex: number;
    carouselRef: React.MutableRefObject<HTMLDivElement>;
};

const CarouselTitle = styled.div<CarouselTitleProps>`
    font-size: 26px;
    font-weight: bold;
    height: 50px;
    width: 1570px;
    will-change: transform;
    transition: transform 0.3s ease-in-out;
    transform: ${({ focusedVerticalIndex, carouselRef }) =>
        `translateY(-${focusedVerticalIndex * carouselRef.current?.offsetHeight}px)`};
`;

type CarouselItemProps = {
    isFocused: boolean;
    isActive: boolean;
    focusedVerticalIndex: number;
    focusedHorizontalIndex: number;
    height: number;
    width: number;
    gapPx: number;
    transition: string;
};

const CarouselItem = styled.div<CarouselItemProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    will-change: transform;
    margin-left: ${({ gapPx }) => `${gapPx}px`};
    opacity: ${({ isActive }) => (isActive ? '1' : '.5')};
    transition: ${({ transition }) => `${transition}`};
    transform: ${({ isFocused, focusedVerticalIndex, focusedHorizontalIndex, height, width, gapPx }) => {
        const horizontalTranslation = focusedHorizontalIndex * (width + gapPx);
        const verticalTranslation = focusedVerticalIndex * height;
        const translation = `translate(-${horizontalTranslation}px, -${verticalTranslation}px)`;

        return isFocused ? `${translation} scale(1.1)` : translation;
    }};
`;

const ItemsWrapper = styled.div`
    display: flex;
    align-items: center;
`;

type CarouselWrapperProps = {
    width: number;
    height: number;
};

const CarouselWrapper = styled.div<CarouselWrapperProps>`
    display: flex;
    flex-direction: column;
    min-height: ${({ height }) => `${height}px`};
    min-width: ${({ width }) => `${width}px`};
`;

type CarouselProps = {
    title: string;
    verticalIndex: number;
    focusedVerticalIndex: number;
    setFocusedVerticalIndex: Function;
    itemsRef: React.MutableRefObject<HTMLDivElement[]>;
    gapPx?: number;
    titleHeight?: number;
    transition?: string;
    children: JSX.Element | JSX.Element[];
    isActive?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
    title,
    verticalIndex,
    focusedVerticalIndex,
    setFocusedVerticalIndex,
    itemsRef,
    gapPx = 30,
    titleHeight = 50,
    transition = 'transform 0.3s ease-in-out',
    children,
    isActive = true,
}: CarouselProps) => {
    const [cardFocused, setCardFocused] = useState(false);
    const [focusedHorizontalIndex, setFocusedHorizonalIndex] = useState(0);

    const carouselRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const titleRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const isFocused = useCallback(
        (verticalIndex: number, horizontalIndex: number) =>
            horizontalIndex === focusedHorizontalIndex && focusedVerticalIndex === verticalIndex && cardFocused,
        [cardFocused, focusedHorizontalIndex, focusedVerticalIndex],
    );

    const getItemWidth = useCallback((horizontalIndex: number) => itemsRef.current[horizontalIndex]?.offsetWidth, [
        itemsRef,
    ]);
    const getItemHeight = useCallback((horizontalIndex: number) => itemsRef.current[horizontalIndex]?.offsetHeight, [
        itemsRef,
    ]);
    const getCarouselWidth = useCallback(() => itemsRef.current?.reduce((acc, el) => el.offsetWidth + acc + gapPx, 0), [
        itemsRef,
        gapPx,
    ]);

    return (
        <CarouselWrapper width={getCarouselWidth()} height={450} ref={carouselRef}>
            <CarouselTitle focusedVerticalIndex={focusedVerticalIndex} carouselRef={carouselRef} ref={titleRef}>
                {title}
            </CarouselTitle>
            <ItemsWrapper>
                {React.Children.map(children, (child, horizontalIndex) => (
                    <CarouselItem
                        isFocused={isFocused(verticalIndex, horizontalIndex)}
                        focusedVerticalIndex={focusedVerticalIndex}
                        focusedHorizontalIndex={focusedHorizontalIndex}
                        isActive={isActive}
                        width={getItemWidth(horizontalIndex)}
                        height={carouselRef.current?.offsetHeight}
                        gapPx={gapPx}
                        transition={transition}
                    >
                        <NavigableWrapper
                            onClick={() => child.props.onClick()}
                            onFocus={() => {
                                setFocusedHorizonalIndex(() => horizontalIndex);
                                setFocusedVerticalIndex(() => verticalIndex);
                                setCardFocused((isFocused) => !isFocused);
                            }}
                            onBlur={() => setCardFocused((isFocused) => !isFocused)}
                            defaultFocused={!horizontalIndex && !verticalIndex}
                            id={`${horizontalIndex}${verticalIndex}`}
                        >
                            <div>{child}</div>
                        </NavigableWrapper>
                    </CarouselItem>
                ))}
            </ItemsWrapper>
        </CarouselWrapper>
    );
};

export default Carousel;
