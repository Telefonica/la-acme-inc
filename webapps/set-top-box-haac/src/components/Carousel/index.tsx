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
    transform: ${({ focusedVerticalIndex, focusedHorizontalIndex, height, width, gapPx }) => {
        const horizontalTranslation = focusedHorizontalIndex * (width + gapPx);
        const verticalTranslation = focusedVerticalIndex * height;
        const translation = `translate(-${horizontalTranslation}px, -${verticalTranslation}px)`;

        return translation;
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
    focusedClass: string;
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
    focusedClass,
}: CarouselProps) => {
    const [focusedHorizontalIndex, setFocusedHorizonalIndex] = useState(0);

    const carouselRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const titleRef = useRef() as React.MutableRefObject<HTMLDivElement>;

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
                            }}
                            defaultFocused={!horizontalIndex && !verticalIndex}
                            id={`${horizontalIndex}${verticalIndex}`}
                            focusedClass={focusedClass}
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