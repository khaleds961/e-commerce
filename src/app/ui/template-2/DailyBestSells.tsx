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
        <section className="w-full py-6">
            <h2 className="text-2xl font-bold text-[#102B6B] mb-6">Daily Best Sells</h2>

            <div className="flex gap-6">
                {/* Left: Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCardList product={product} />
                        </div>
                    ))}
                </div>

                {/* Right: Promo Banner with Overlay */}
                <div className="flex-shrink-0 relative w-[650px] h-[550px] rounded-2xl overflow-hidden">
                    {/* Background image */}
                    <Image
                        src="/images/special-snacks.png"
                        alt="Flash Sale Banner"
                        fill
                        className="object-cover"
                    />

                    {/* Overlay content */}
                    <div className="absolute top-4  flex flex-col items-center text-center left-2/9 transform -translate-x-2/20 z-10">
                        {/* Top image */}
                        <Image
                            src={topimageforbanner[0].image}
                            alt="Top Banner Overlay"
                            width={470}
                            height={240}
                            className="object-contain"
                        />

                        {/* Title */}
                        <h3 className="text-black text-2xl font-bold mt-4">Flash Sale Today</h3>

                        {/* Countdown */}
                        <div className="flex gap-2 mt-2 text-white font-semibold text-lg">
                            <span className="bg-black/50 px-3 py-1 rounded">{countdown.hours} Hours</span>
                            <span className="bg-black/50 px-3 py-1 rounded">{countdown.minutes} Min</span>
                            <span className="bg-black/50 px-3 py-1 rounded">{countdown.seconds} Sec</span>
                        </div>

                        {/* Button */}
                        <button className="mt-4 bg-[#1f52cc] hover:bg-[#359FC1] text-white px-6 py-2 rounded-3xl font-semibold">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
