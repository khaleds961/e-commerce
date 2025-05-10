'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState, useEffect, useId } from 'react';
import ProductCard from './ProductCard';

export default function ProductsSlider({ products }: { products: Product[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const uniqueId = useId();

  useEffect(() => {
    if (products?.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="mt-5">
        <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: `.swiper-button-next-custom-${uniqueId}`,
          prevEl: `.swiper-button-prev-custom-${uniqueId}`,
        }}
        slidesPerView={6}
        spaceBetween={170} 
        breakpoints={{
          0: { slidesPerView: 2.5 },
          320: { slidesPerView: 2.5 },
          480: { slidesPerView: 2.5 },
          640: { slidesPerView: 3.5 },
          768: { slidesPerView: 4.5 },
          1024: { slidesPerView: 6.5 },
          1280: { slidesPerView: 6.5 },
        }}
        className="w-full"
      >
        {products.slice(0, 6).map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
