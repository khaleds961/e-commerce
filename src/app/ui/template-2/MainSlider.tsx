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

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    useEffect(() => {
        if (isHovered) return; // Pause on hover
        const interval = setInterval(nextSlide, 7000);
        return () => clearInterval(interval);
    }, [nextSlide, isHovered]);

    if (!slides || slides.length === 0) return null;

    return (
        <div 
            className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[560px] overflow-hidden rounded-xl md:rounded-3xl shadow mb-8 mt-4 md:mt-24 mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
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

                        {/* Left side: Title */}
                        {slide.title && (
                            <div className="absolute left-0 ml-2 sm:ml-4 md:ml-8 text-white z-10 max-w-[80%] sm:max-w-[60%] md:max-w-[50%] px-2">
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-black/50 px-3 py-1 sm:px-4 sm:py-2 rounded">
                                    {slide.title}
                                </h2>
                            </div>
                        )}

                        {/* Right side: Additional image */}
                        {slide.rightImage && (
                            <div className="absolute right-0 mr-2 sm:mr-4 md:mr-8 z-10 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[460px] h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={slide.rightImage}
                                        alt={slide.rightImageAlt || "Slide content"}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, (max-width: 1024px) 400px, 460px"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation buttons - hidden on small screens if not hovered */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white/80 p-1 sm:p-2 rounded-full shadow hover:bg-white transition-colors z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white/80 p-1 sm:p-2 rounded-full shadow hover:bg-white transition-colors z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${current === index ? "bg-white" : "bg-white/50"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}