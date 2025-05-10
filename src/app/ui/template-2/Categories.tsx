'use client'
import { formatProductName } from "@/app/utils/formatProductName";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Category = {
  id: string;
  name: string;
};

export default function Categories({ categories }: { categories: Category[] }) {
  const t = useTranslations('HomePage');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState({ left: false, right: true });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if the device supports touch events
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowArrows({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 1
      });
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef?.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();
    
    return () => {
      currentRef?.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    <>
      {categories && categories.length > 0 && (
        <div className="relative px-4 sm:px-6 lg:px-8">
          {/* Left Arrow - only visible when needed and not on touch devices */}
          {!isTouchDevice && showArrows.left && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 
                         bg-white p-1 sm:p-2 rounded-full shadow-md hover:bg-gray-100 
                         transition-opacity duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Scrollable Categories with touch scrolling enabled */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth gap-3 sm:gap-4 py-2 px-1"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch', // Important for smooth scrolling on iOS
            }}
          >
            {/* WebKit scrollbar hiding */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
                -webkit-overflow-scrolling: touch;
              }
            `}</style>
            
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center flex-shrink-0 w-[100px] xs:w-[110px] sm:w-[130px] md:w-[150px] lg:w-[180px] touch-pan-x" // touch-pan-x enables horizontal panning
              >
                <div className="bg-[#e8f9e9] rounded-full w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
                  <Image
                    src="/images/perfume-product.png"
                    alt={category.name}
                    width={100}
                    height={100}
                    className="w-3/4 h-3/4 object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h2 className="capitalize mt-2 text-xs xs:text-sm sm:text-base text-center font-medium hover:text-[#359FC1] transition-colors duration-300 line-clamp-2">
                  {formatProductName(category.name)}
                </h2>
              </div>
            ))}
          </div>

          {/* Right Arrow - only visible when needed and not on touch devices */}
          {!isTouchDevice && showArrows.right && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 
                         bg-white p-1 sm:p-2 rounded-full shadow-md hover:bg-gray-100 
                         transition-opacity duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}