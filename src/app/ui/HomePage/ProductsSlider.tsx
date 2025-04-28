'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect,useId } from 'react';

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
            <div className='mt-5'>
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
                breakpoints={{
                    0: { slidesPerView: 2.5 },
                    320: { slidesPerView: 2.5 },
                    480: { slidesPerView: 2.5 },
                    640: { slidesPerView: 3.5 },
                    768: { slidesPerView: 4.5 },
                    1024: { slidesPerView: 6.5 },
                    1280: { slidesPerView: 6.5 },
                }}
                spaceBetween={10}
                className='w-full'
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Custom navigation buttons */}
            <button className={`swiper-button-prev-custom-${uniqueId} absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity`}>
                <FaChevronLeft className="w-5 h-5" />
            </button>

            <button className={`swiper-button-next-custom-${uniqueId} absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity`}>
                <FaChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
