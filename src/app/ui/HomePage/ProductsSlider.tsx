'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ProductCard from './ProductCard';

export default function ProductsSlider({ products }: { products: Product[] }) {
    return (
        <div className="relative group">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                slidesPerView={6}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Custom navigation buttons */}
            <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaChevronLeft className="w-5 h-5" />
            </button>

            <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
