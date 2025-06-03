'use client';

import { useState, useEffect, useRef } from 'react';
import ProductCard2 from './ProductCard2';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { productData, Product } from '@/data/product';

const SLIDES_TO_SHOW = 6;
const SLIDE_STEP = 1;
const CARD_WIDTH = 275; // 267px card + 8px gap

export default function CategoryFeaturedProducts() {
    const [currentStart, setCurrentStart] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Filter featured products (isfeatured === 1)
    const featuredProducts = productData.filter(product => product.isfeatured === 1);

    const handlePrev = () => {
        setCurrentStart((prev) =>
            prev - SLIDE_STEP < 0
                ? featuredProducts.length - SLIDES_TO_SHOW
                : Math.max(prev - SLIDE_STEP, 0)
        );
    };

    const handleNext = () => {
        setCurrentStart((prev) =>
            prev + SLIDES_TO_SHOW >= featuredProducts.length
                ? 0
                : prev + SLIDE_STEP
        );
    };

    // Touch event handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX);
        if (carouselRef.current) {
            setScrollLeft(carouselRef.current.scrollLeft);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        if (carouselRef.current) {
            const x = e.touches[0].pageX;
            const walk = (x - startX) * 2; // Adjust sensitivity
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (carouselRef.current) {
            // Determine if we should snap to next/prev based on scroll position
            const threshold = CARD_WIDTH / 2;
            const delta = scrollLeft - carouselRef.current.scrollLeft;
            
            if (delta > threshold) {
                handleNext();
            } else if (delta < -threshold) {
                handlePrev();
            } else {
                // Return to original position
                setCurrentStart(currentStart);
            }
        }
    };

    // Mouse event handlers for desktop drag
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX);
        if (carouselRef.current) {
            setScrollLeft(carouselRef.current.scrollLeft);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        if (carouselRef.current) {
            const x = e.pageX;
            const walk = (x - startX) * 2;
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging) { // Don't auto-advance while user is interacting
                setCurrentStart((prev) =>
                    prev + SLIDES_TO_SHOW >= featuredProducts.length
                        ? 0
                        : prev + SLIDE_STEP
                );
            }
        }, 7000);

        return () => clearInterval(interval);
    }, [featuredProducts.length, isDragging]);

    const translateX = -currentStart * CARD_WIDTH;

    return (
        <div className="my-12 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#102B6B]">
                    Featured Products
                </h2>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 hover:underline transition cursor-pointer">
                        View All
                    </button>
                    <button
                        onClick={handlePrev}
                        className="bg-white hover:bg-gray-100 cursor-pointer shadow-md rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={handleNext}
                        className="bg-white hover:bg-gray-100 cursor-pointer shadow-md rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div 
                className="overflow-hidden"
                ref={carouselRef}
            >
                <div
                    className="flex gap-2 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(${translateX}px)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="w-[267px] shrink-0">
                            <ProductCard2 product={{
                                id: product.id,
                                title: product.name,
                                price: product.price,
                                description: product.description,
                                category: { 
                                    id: 1, 
                                    name: 'Organic', 
                                    slug: 'organic' 
                                },
                                images: [product.image],
                                slug: product.slug,
                                creationAt: '',
                                updatedAt: '',
                                rating: product.rating,
                                reviews: product.reviews,
                                quantity: product.quantity
                            }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}