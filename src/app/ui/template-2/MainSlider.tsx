"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Slide {
    id: number;
    image: string;
    title?: string;
    rightImage?: string;
    rightImageAlt?: string;
}

export default function Mainslider({ slides }: { slides: Slide[] }) {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile viewport
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    // Auto-rotate slides (pauses on hover and on mobile touch devices)
    useEffect(() => {
        if (isHovered || isMobile) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide, isHovered, isMobile]);

    if (!slides || slides.length === 0) return null;

    return (
        <div 
            className="relative w-full h-[180px] xs:h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg md:rounded-xl shadow mb-4 mt-2 md:mt-6 mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)} // Pause on touch
        >
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative w-full h-full bg-cover bg-center flex-shrink-0 flex items-center justify-center min-w-full"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        {/* Green overlay */}
                        <div className="absolute inset-0 bg-[#D3EBC0] z-0 opacity-40" />

                        {/* Left side: Title - Hidden on smallest screens if no space */}
                        {slide.title && (
                            <div className="absolute left-0 ml-2 xs:ml-3 sm:ml-4 md:ml-6 lg:ml-8 text-white z-10 max-w-[70%] xs:max-w-[60%] sm:max-w-[50%] px-1 xs:px-2">
                                <h2 className="text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl font-bold bg-black/50 px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 rounded">
                                    {slide.title}
                                </h2>
                            </div>
                        )}

                        {/* Right side: Additional image - Scales down on mobile */}
                        {slide.rightImage && (
                            <div className={`absolute right-0 mr-2 xs:mr-3 sm:mr-4 md:mr-6 lg:mr-8 z-10 
                                ${isMobile ? 'w-[120px] h-[90px] xs:w-[150px] xs:h-[110px]' : 'w-[200px] h-[150px] sm:w-[250px] sm:h-[180px] md:w-[300px] md:h-[220px] lg:w-[350px] lg:h-[250px]'} 
                                flex items-center justify-center`}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={slide.rightImage}
                                        alt={slide.rightImageAlt || "Slide content"}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 400px) 120px, (max-width: 640px) 150px, (max-width: 768px) 200px, (max-width: 1024px) 300px, 350px"
                                        priority={current === slides.findIndex(s => s.id === slide.id)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation buttons - Larger touch targets on mobile */}
            <button
                onClick={prevSlide}
                className={`absolute top-1/2 left-2 xs:left-3 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white transition-colors z-10
                    ${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`}
                aria-label="Previous slide"
            >
                <ChevronLeft className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
            </button>
            <button
                onClick={nextSlide}
                className={`absolute top-1/2 right-2 xs:right-3 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white transition-colors z-10
                    ${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`}
                aria-label="Next slide"
            >
                <ChevronRight className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
            </button>

            {/* Slide indicators - More visible on mobile */}
            <div className="absolute bottom-2 xs:bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`${isMobile ? 'w-3 h-3' : 'w-2 h-2'} rounded-full transition-colors ${current === index ? "bg-white" : "bg-white/50"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}