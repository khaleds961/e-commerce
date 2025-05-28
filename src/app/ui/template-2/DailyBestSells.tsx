'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductCardList from './ProductCardList';

type Category = {
    id: number;
    name: string;
    slug: string;
    image?: string;
    creationAt?: string;
    updatedAt?: string;
};

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    slug: string;
    creationAt: string;
    updatedAt: string;
    discount?: number;
    countdown?: number;
};

type TopImageForBanner = {
    id: number;
    image: string;
};

const topimageforbanner: TopImageForBanner[] = [
    {
        id: 1,
        image: '/images/banner-img3.png',
    },
];

const mockProducts: Product[] = [
    {
        id: 1,
        title: 'Wireless Bluetooth Headphones',
        price: 59.99,
        description: 'Noise-cancelling wireless headphones with long battery life.',
        category: {
            id: 1,
            name: 'Electronics',
            slug: 'electronics',
        },
        images: ['/images/offer-img2.png'],
        slug: 'wireless-bluetooth-headphones',
        discount: 20,
        countdown: 1,
        creationAt: '',
        updatedAt: '',
    },
    {
        id: 2,
        title: 'Smart Watch Pro 2024',
        price: 129.99,
        description: 'Track your fitness, heart rate, and messages.',
        category: {
            id: 2,
            name: 'Wearables',
            slug: 'wearables',
        },
        images: ['/images/offer-img2.png'],
        slug: 'smart-watch-pro-2024',
        creationAt: '',
        updatedAt: '',
        discount: 20,
        countdown: 1,
    },
    {
        id: 3,
        title: 'USB-C Fast Charging Cable',
        price: 9.99,
        description: 'Durable braided cable for fast charging and data transfer.',
        category: {
            id: 3,
            name: 'Accessories',
            slug: 'accessories',
        },
        images: ['/images/offer-img2.png'],
        slug: 'usb-c-fast-charging-cable',
        creationAt: '',
        updatedAt: '',
        discount: 20,
        countdown: 1,
    },
    {
        id: 4,
        title: 'Portable Power Bank 20000mAh',
        price: 29.99,
        description: 'High-capacity fast-charging portable power bank.',
        category: {
            id: 3,
            name: 'Accessories',
            slug: 'accessories',
        },
        images: ['/images/offer-img2.png'],
        slug: 'portable-power-bank',
        creationAt: '',
        updatedAt: '',
        discount: 0,
        countdown: 0,
    },
];

// Countdown hook
function useCountdown(targetDate: Date) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        return {
            hours: hours < 10 ? `0${hours}` : hours,
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds: seconds < 10 ? `0${seconds}` : seconds,
        };
    }

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    return timeLeft;
}

export default function DailyBestSells() {
    const countdown = useCountdown(new Date(new Date().getTime() + 12 * 60 * 60 * 1000)); // 12 hours

    return (
        <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#102B6B] mb-4 sm:mb-6">Daily Best Sells</h2>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Left: Product Grid - full width on mobile, 2 columns on md+, appears first on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 order-2 lg:order-1">
                    {mockProducts.map((product) => (
                        <div key={product.id} className="w-full">
                            <ProductCardList product={product} />
                        </div>
                    ))}
                </div>

                {/* Right: Promo Banner - full width on mobile, fixed width on lg+ */}
                <div className="relative w-full lg:w-[400px] xl:w-[500px] 2xl:w-[650px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl lg:rounded-2xl overflow-hidden order-1 lg:order-2">
                    {/* Background image */}
                    <Image
                        src="/images/special-snacks.png"
                        alt="Flash Sale Banner"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Overlay content - centered and responsive */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                        {/* Top image - responsive width */}
                        <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px]">
                            <Image
                                src={topimageforbanner[0].image}
                                alt="Top Banner Overlay"
                                width={470}
                                height={240}
                                className="object-contain w-full h-auto"
                            />
                        </div>

                        {/* Title - responsive text */}
                        <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold mt-2 sm:mt-4">Flash Sale Today</h3>

                        {/* Countdown - responsive spacing and text */}
                        <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2 text-white font-semibold text-sm sm:text-base md:text-lg">
                            <span className="bg-black/50 px-2 sm:px-3 py-1 rounded">{countdown.hours} Hours</span>
                            <span className="bg-black/50 px-2 sm:px-3 py-1 rounded">{countdown.minutes} Min</span>
                            <span className="bg-black/50 px-2 sm:px-3 py-1 rounded">{countdown.seconds} Sec</span>
                        </div>

                        {/* Button - responsive size */}
                        <button className="mt-2 sm:mt-4 bg-[#1f52cc] hover:bg-[#359FC1] text-white px-4 sm:px-6 py-1 sm:py-2 rounded-3xl font-semibold text-sm sm:text-base">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
