'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs,Zoom } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import { useTranslations } from 'next-intl';
import { useSiteProperties } from '@/app/store/siteProperties';

export default function ProductDetails({ product }: { product: Product }) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const t = useTranslations('Product');
    const { backgroundColor, textColor } = useSiteProperties();
    return (
        <div className="flex grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="space-y-2 ">
                <Swiper
                    navigation={false}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs,Zoom]}
                    className="h-[500px]"
                    zoom={true}
                >
                    {product.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="swiper-zoom-container relative h-full w-full border border-gray-300 rounded-lg">
                                <Image
                                    src={image}
                                    alt={`${product.title} - Image ${index + 1}`}
                                    fill
                                    className="object-contain rounded-md p-2"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnails */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    modules={[Thumbs]}
                    className="h-[120px]"
                    watchSlidesProgress={true}
                >
                    {product.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-full w-full cursor-pointer">
                                <Image
                                    src={image}
                                    alt={`${product.title} - Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Product Info */}
            <div className="space-y-6 md:col-span-2 md:mt-4">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="flex items-center gap-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                        ))}
                    </div>
                    <span className="text-gray-500">(120 reviews)</span>
                </div>
                <p className="text-2xl font-bold">${product.price}</p>
                <p className="text-gray-600">{product.description}</p>

                {/* Add to Cart */}
                <div className="flex gap-4">
                    <div className="flex items-center border rounded">
                        <button className="px-4 py-2">-</button>
                        <span className="px-4 py-2">1</span>
                        <button className="px-4 py-2">+</button>
                    </div>
                    <button className="cursor-pointer flex p-2 rounded" style={{ backgroundColor: backgroundColor, color: textColor }}>
                        {t('addToCart')}
                    </button>
                </div>
            </div>
        </div>
    );
}
