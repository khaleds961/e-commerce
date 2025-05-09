'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const salesItems = [
    {
        id: 1,
        image: '/images/sale1.png',
        additionalImage: '/images/banner-img1.png',
        link: '#',
        title: 'Sale 1',
    },
    {
        id: 2,
        image: '/images/sale3.png',
        additionalImage: '/images/banner-img1.png',
        link: '#',
        title: 'Sale 2',
    },
    {
        id: 3,
        image: '/images/sale1.png',
        additionalImage: '/images/banner-img1.png',
        link: '#',
        title: '',
    },
    {
        id: 4,
        image: '/images/sale3.png',
        additionalImage: '/images/banner-img1.png',
        link: '#',
        title: 'Sale 4',
    },
    {
        id: 5,
        image: '/images/sale1.png',
        additionalImage: '/images/banner-img1.png',
        link: '#',
        title: 'Sale 5',
    },
    {
        id: 6,
        image: '/images/sale3.png',
        additionalImage: '/images/banner-img1.png',
        link: '#',
        title: 'Sale 6',
    },
    {
        id: 7,
        image: '/images/sale1.png',
        additionalImage: '/images/banner-img1.png',
        link: '#',
        title: 'Sale 7',
    },
    {
        id: 8,
        image: '/images/sale3.png',
        additionalImage: '/images/banner-img1.png',
        link: '#',
        title: 'Sale 8',
    },
];

const targetDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

function getTimeLeft() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
    };
}

export default function FlashSalesToday() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const extendedItems = [...salesItems, ...salesItems, ...salesItems];

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % salesItems.length);
        setCurrentTranslate(0);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + salesItems.length) % salesItems.length);
        setCurrentTranslate(0);
    };

    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        setStartPos(clientX);
    };

    const endDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        setIsDragging(false);
        const clientX =
            'touches' in e
                ? (e as React.TouchEvent).changedTouches[0].clientX
                : (e as React.MouseEvent).clientX;
        const diff = clientX - startPos;
        if (diff < -50) goToNext();
        else if (diff > 50) goToPrev();
        setCurrentTranslate(0);
    };

    const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        setCurrentTranslate(clientX - startPos);
    };

    return (
        <div className="w-full relative ">
            <h2 className="text-2xl font-bold mb-6">Flash Sales Today</h2>

            <div className="relative w-full rounded-xl overflow-hidden cursor-grab">
                <div
                    className="relative w-full rounded-xl overflow-hidden"
                    ref={carouselRef}
                    onMouseDown={startDrag}
                    onTouchStart={startDrag}
                    onMouseMove={onDrag}
                    onTouchMove={onDrag}
                    onMouseUp={endDrag}
                    onMouseLeave={endDrag}
                    onTouchEnd={endDrag}
                >
                    <div
                        className="flex transition-transform duration-300 ease-out"
                        style={{
                            transform: `translateX(calc(-${currentIndex * 50}% + ${currentTranslate}px))`,
                        }}
                    >
                        {extendedItems.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="w-1/2 flex-shrink-0 px-2">
                                <div className="relative w-full h-[500px] sm:h-[255px] rounded-3xl overflow-hidden ">
                                    {/* Main image */}
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover w-full h-full "
                                    />

                                    {/* Additional overlay image */}
                                    <div className="absolute top-10 left-4 w-[291px] h-[147px]">
                                        <Image
                                            src={item.additionalImage}
                                            alt={`Product ${item.id}`}
                                            width={291}
                                            height={147}
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Overlay content */}
                                    <div className="absolute inset-0 flex flex-col justify-center items-end text-right px-6 gap-4">
                                        {item.title && (
                                            <div className="text-black text-xl sm:text-2xl font-semibold bg-white/80 px-4 py-2 rounded-md">
                                                {item.title}
                                            </div>
                                        )}

                                        {/* Countdown */}
                                        <div className="flex gap-2 text-black text-lg sm:text-xl font-bold bg-white/80 px-4 py-2 rounded-md">
                                            <div className="bg-white rounded-md px-3 py-1 min-w-[50px] text-center">
                                                {timeLeft.days}d
                                            </div>
                                            <div className="bg-white rounded-md px-3 py-1 min-w-[50px] text-center">
                                                {timeLeft.hours}h
                                            </div>
                                            <div className="bg-white rounded-md px-3 py-1 min-w-[50px] text-center">
                                                {timeLeft.minutes}m
                                            </div>
                                            <div className="bg-white rounded-md px-3 py-1 min-w-[50px] text-center">
                                                {timeLeft.seconds}s
                                            </div>
                                        </div>

                                        {/* Button */}
                                        <a
                                            href={item.link}
                                            className="bg-white text-black px-6 py-3 text-base font-semibold rounded-full hover:bg-[#359FC1] hover:text-white transition-colors duration-300 inline-flex items-center gap-2 w-fit"
                                        >
                                            Shop Now <span className="text-xl">→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
