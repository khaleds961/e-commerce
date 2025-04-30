'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import { useTranslations } from 'next-intl';
import { useSiteProperties } from '@/app/store/siteProperties';
import ProductProperties from './ProductProperties';
import { useAddToCart } from '@/app/store/addToCart';
import { handleAddToCart } from '@/app/utils/addToCart';

export default function ProductDetails({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const t = useTranslations('Product');
    const { backgroundColor, textColor } = useSiteProperties();
    const sizes = [11, 15, 26];
    const colors = ['red', 'blue', 'green'];
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const cart = useAddToCart((state) => state.items);
    const setCart = (items: CartItem[]) => useAddToCart.setState({ items });

    const onAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        handleAddToCart(product, quantity, selectedSize, selectedColor, cart, setCart, t);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="flex grid grid-cols-1 md:grid-cols-8 gap-8">


            {/* Image Gallery */}
            <div className="space-y-2 md:col-span-3">
                <Swiper
                    navigation={false}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs, Zoom]}
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
            <div className="space-y-6 md:mt-4 md:col-span-3">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="flex items-center gap-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                        ))}
                    </div>
                    <span className="text-gray-500">(120 reviews)</span>
                </div>

                {/* Product Properties */}
                <ProductProperties titleKey='chooseSize' properties={sizes} onSelect={(size) => setSelectedSize(size)} />
                <ProductProperties titleKey='chooseColor' properties={colors} onSelect={(color) => setSelectedColor(color)} />

                {/* Product Price */}
                <p className="text-2xl font-bold">${product.price}</p>

                {/* Product Description */}
                <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Product Promotion */}
            <div className="md:mt-4 md:col-span-2">
                <div className='bg-linear-to-r from-[#FEC125] to-[#faebbb] rounded-md p-2 flex justify-between items-center gap-1'>
                    <div className='p-1'>
                        <p className='text-xl font-bold'>25% off</p>
                        <p className='text-sm capitalize'>if order over 100$</p>
                    </div>
                    <div className='bg-[#F9D669] rounded-md p-1'>
                        <p className='text-sm'>Until 2025-05-01</p>
                    </div>
                </div>


                <div className='mt-4 p-2 border border-gray-300 rounded-md'>
                    <h2 className='text-lg font-bold border-b border-gray-300 pb-2'>{t('orderDetails')}</h2>
                    <div className='mt-3'>
                        {/* Quantity */}
                        <div className='mb-7 flex sm:flex md:block xl:flex justify-between items-center '>
                            <h2 className='text-md font-bold mb-2'>{t('quantity')}</h2>
                            <div className="flex items-center justify-between border border-gray-300 rounded bg-gray-100">
                                <button
                                    className="cursor-pointer px-3 py-1 bg-white rounded m-1 hover:bg-gray-50 transition-colors"
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-15 text-center bg-transparent border-none focus:outline-none focus:ring-0"
                                />
                                <button
                                    className="cursor-pointer px-3 py-1 bg-white rounded m-1 hover:bg-gray-50 transition-colors"
                                    onClick={() => setQuantity(prev => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* price */}
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className='text-lg text-gray-500 font-bold'>{t('price')}</h2>
                            <p className='text-lg font-bold'>${product.price}</p>
                        </div>

                        {/* total */}
                        <div className='flex justify-between items-center border-t border-gray-300 pt-2'>
                            <h2 className='text-md font-bold'>{t('total')}</h2>
                            <p className='text-xl font-bold'>${product.price * quantity}</p>
                        </div>

                        {/* add to cart */}
                        <div className='mt-6'>
                            <button className='cursor-pointer rounded-md p-2 text-center w-full'
                                style={{ backgroundColor: backgroundColor, color: textColor }}
                                onClick={onAddToCart}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="loader mx-auto"></div>
                                ) : (
                                    <p className='text-md'>{t('addToCart')}</p>
                                )}
                            </button>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}
