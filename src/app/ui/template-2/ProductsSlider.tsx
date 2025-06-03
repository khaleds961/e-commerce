'use client';

import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: any;
  images: string[];
  slug: string;
  creationAt: string;
  updatedAt: string;
};

export default function ProductsSlider({ products }: { products: Product[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (products?.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-md mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView="auto"
        slidesPerGroup={1}
        spaceBetween={10} // Set to 10px
        centeredSlides={false}
        watchOverflow={true}
        breakpoints={{
          320: { slidesPerView: 2 },
          500: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
          1400: { slidesPerView: 6 },
        }}
        className="!overflow-hidden"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons - only show if there are more products than visible */}
      {products.length > 6 && (
        <>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:opacity-90 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:opacity-90 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}