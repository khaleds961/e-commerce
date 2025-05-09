'use client';

import { useState, useEffect } from 'react';
import ProductCard2 from './ProductCard2';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Category = {
    id: number;
    name: string;
    slug: string;
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
};

const products: Product[] = [
    {
        id: 1,
        title: 'Wireless Headphones',
        price: 89.99,
        description: 'High-quality wireless headphones with noise cancellation.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'wireless-headphones',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 2,
        title: 'Smart Watch',
        price: 129.99,
        description: 'Stylish and functional smartwatch.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'smart-watch',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 3,
        title: 'Gaming Mouse',
        price: 59.99,
        description: 'Ergonomic gaming mouse with customizable buttons.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'gaming-mouse',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 4,
        title: 'Bluetooth Speaker',
        price: 49.99,
        description: 'Portable Bluetooth speaker with rich sound.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'bluetooth-speaker',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 5,
        title: 'VR Headset',
        price: 199.99,
        description: 'Immersive virtual reality headset for gaming and more.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'vr-headset',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    {
        id: 6,
        title: 'Wireless Headphones',
        price: 89.99,
        description: 'High-quality wireless headphones with noise cancellation.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'wireless-headphones',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 7,
        title: 'Smart Watch',
        price: 129.99,
        description: 'Stylish and functional smartwatch.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'smart-watch',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 8,
        title: 'Gaming Mouse',
        price: 59.99,
        description: 'Ergonomic gaming mouse with customizable buttons.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'gaming-mouse',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 9,
        title: 'Bluetooth Speaker',
        price: 49.99,
        description: 'Portable Bluetooth speaker with rich sound.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'bluetooth-speaker',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 10,
        title: 'VR Headset',
        price: 199.99,
        description: 'Immersive virtual reality headset for gaming and more.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'vr-headset',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    {
        id: 11,
        title: 'Wireless Headphones',
        price: 89.99,
        description: 'High-quality wireless headphones with noise cancellation.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'wireless-headphones',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 12,
        title: 'Smart Watch',
        price: 129.99,
        description: 'Stylish and functional smartwatch.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'smart-watch',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 13,
        title: 'Gaming Mouse',
        price: 59.99,
        description: 'Ergonomic gaming mouse with customizable buttons.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'gaming-mouse',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 14,
        title: 'Bluetooth Speaker',
        price: 49.99,
        description: 'Portable Bluetooth speaker with rich sound.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'bluetooth-speaker',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 15,
        title: 'VR Headset',
        price: 199.99,
        description: 'Immersive virtual reality headset for gaming and more.',
        category: { id: 1, name: 'Electronics', slug: 'electronics' },
        images: ['/images/offer-img2.png'],
        slug: 'vr-headset',
        creationAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
];



const SLIDES_TO_SHOW = 6;
const SLIDE_STEP = 1;
const CARD_WIDTH = 267 + 16;

export default function CategoryFeaturedProducts() {
    const [currentStart, setCurrentStart] = useState(0);

    const handlePrev = () => {
        setCurrentStart((prev) =>
            prev - SLIDE_STEP < 0
                ? products.length - SLIDES_TO_SHOW
                : Math.max(prev - SLIDE_STEP, 0)
        );
    };

    const handleNext = () => {
        setCurrentStart((prev) =>
            prev + SLIDES_TO_SHOW >= products.length
                ? 0
                : prev + SLIDE_STEP
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStart((prev) =>
                prev + SLIDES_TO_SHOW >= products.length
                    ? 0
                    : prev + SLIDE_STEP
            );
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const translateX = -currentStart * CARD_WIDTH;

    return (
        <div className="my-12 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#102B6B]">
                    Electronics - Featured Products
                </h2>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 hover:underline transition cursor-pointer">
                        All Categories
                    </button>
                    <button
                        onClick={handlePrev}
                        className="bg-white hover:bg-gray-100 cursor-pointer shadow-md rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={handleNext}
                        className="bg-white hover:bg-gray-100 cursor-pointer shadow-md rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden">
                <div
                    className="flex gap-4 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(${translateX}px)` }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="w-[267px] shrink-0">
                            <ProductCard2 product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}