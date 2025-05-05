'use client'
import { formatProductName } from "@/app/utils/formatProductName";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


type Category = {
  id: string;
  name: string;
};

export default function Categories({ categories }: { categories: Category[] }) {
  const t = useTranslations('HomePage');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth; // Scroll full width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {categories && categories.length > 0 && (
        <div className="relative group px-10">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                       bg-white p-2 rounded-full shadow hover:bg-gray-100 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scrollable Categories */}
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden no-scrollbar scroll-smooth gap-4"
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="w-[10%] min-w-[120px] flex-shrink-0 items-center justify-center"
              >
                <div className="bg-[#e8f9e9] rounded-full w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 flex items-center justify-center">
                  <Image
                    src="/images/perfume-product.png"
                    alt={category.name}
                    width={100}
                    height={100}
                    className="w-3/4 h-3/4 object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h2 className="capitalize mt-3 text-xs sm:text-sm md:text-base text-center font-medium w-full hover:text-[#359FC1] transition-colors duration-300">
                  {formatProductName(category.name)}
                </h2>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                       bg-white p-2 rounded-full shadow hover:bg-gray-100 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
