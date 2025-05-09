"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
    id: number;
    image: string;
    title?: string;
    rightImage?: string;
    rightImageAlt?: string;
}

export default function Mainslider({ slides }: { slides: Slide[] }) {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 7000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="relative w-full max-w-[1900px] h-[560px] overflow-hidden rounded-4xl shadow mb-8 mt-24 mx-auto animate-wiggle">
            
            <div
                className="flex transition-transform duration-1700 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative w-full h-full bg-cover bg-center flex-shrink-0 flex items-center justify-center min-w-[1680px]"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        {/* Green overlay */}
                        <div className="absolute inset-0 bg-[#D3EBC0] z-0 opacity-40" />

                        {/* Left side: Title */}
                        {slide.title && (
                            <div className="absolute left-3 ml-4 md:ml-8 text-white z-10 max-w-[50%] px-2">
                                <h2 className="text-2xl md:text-3xl font-bold bg-black/50 px-4 py-2 rounded">
                                    {slide.title}
                                </h2>
                            </div>
                        )}

                        {/* Right side: Additional image */}
                        {slide.rightImage && (
                            <div className="absolute right-3 mr-4 md:mr-8 z-10 w-460px h-300px flex items-center justify-center">
                                
                                <img
                                    src={slide.rightImage}
                                    alt={slide.rightImageAlt || "Slide content"}
                                    className="max-h-[300px] w-auto object-contain"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Optional: Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${current === index ? "bg-white" : "bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}

            </div>
        </div>
    );
}