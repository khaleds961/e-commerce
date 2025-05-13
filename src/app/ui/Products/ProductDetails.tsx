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
import SideDrawer from './SideDrawer';
import OrderDetails from './SideDrawer/OrderDetails';
import CustomImage from '@/app/components/CustomImage';

export default function ProductDetails({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const t = useTranslations('Product');
    const sizes = [11, 15, 26];
    const colors = ['red', 'blue', 'green'];
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

    const cart = useAddToCart((state) => state.items);
    const setCart = (items: CartItem[]) => useAddToCart.setState({ items });

    const onAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const cartItem = handleAddToCart(product, quantity, selectedSize, selectedColor, t);
        if (cartItem && cartItem.length > 0) {
            setIsSideDrawerOpen(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
        setIsLoading(false);

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
                                <CustomImage src={image}
                                    alt={`${product.title} - Image ${index + 1}`}
                                    width={200}
                                    height={200}
                                    className="object-contain w-full h-full rounded-md p-2" />
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
                    {product.images.length > 0 && product.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-full w-full cursor-pointer">
                                <CustomImage src={image}
                                    alt={`${product.title} - Thumbnail ${index + 1}`}
                                    width={200}
                                    height={200}
                                    className="object-cover rounded" />
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

                {/* Order Details */}
                <OrderDetails product={product} selectedSize={selectedSize} selectedColor={selectedColor} />

            </div>
        </div>
    );
}
