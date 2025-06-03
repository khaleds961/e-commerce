'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  discount: number;
};

const rawProducts = [
  {
    id: 1,
    title: 'Discounted Rice',
    price: 25,
    discount: 35,
    images: ['/images/offer-img1.png'],
    description: 'High-quality rice at a discounted price.',
    slug: 'discounted-rice',
    category: 'Promo',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Juice Pack',
    price: 5,
    discount: 20,
    images: ['/images/offer-img1.png'],
    description: 'Refreshing juice pack for your daily needs.',
    slug: 'juice-pack',
    category: 'Promo',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Chips Combo',
    price: 3,
    discount: 15,
    images: ['/images/offer-img1.png'],
    description: 'Crunchy chips combo for snack time.',
    slug: 'chips-combo',
    category: 'Promo',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Organic Pack',
    price: 10,
    discount: 30,
    images: ['/images/offer-img1.png'],
    description: 'Organic products for a healthy lifestyle.',
    slug: 'organic-pack',
    category: 'Promo',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Fresh Veggies',
    price: 8,
    discount: 25,
    images: ['/images/offer-img1.png'],
    description: 'Fresh vegetables for your meals.',
    slug: 'fresh-veggies',
    category: 'Promo',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: 'Fruit Basket',
    price: 12,
    discount: 18,
    images: ['/images/offer-img1.png'],
    description: 'A basket full of fresh fruits.',
    slug: 'fruit-basket',
    category: 'Promo',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const discountedProducts: Product[] = rawProducts.map((product) => ({
  ...product,
  category: {
    id: 1,
    name: product.category,
    slug: product.category.toLowerCase(),
    image: '/images/default-category-image.png',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
}));

const MegaPromotionDaily = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
  const cardWidth = 280 + 8;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, discountedProducts.length - visibleCount)
    );
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 236);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">Hot Deals Today</h2>
        <div className="items-center gap-4 hidden md:flex">
          <button className="text-sm text-blue-600 hover:underline font-medium">
            View All Deals
          </button>
          <button onClick={handlePrev} disabled={startIndex === 0}>
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + visibleCount >= discountedProducts.length}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden">
        {/* Banner */}
        <div className="w-full md:w-1/3 relative bg-[#f5f5f5] rounded-2xl overflow-hidden flex items-center justify-center min-h-[350px]">
          <Image
            src="/images/offer-shape.png"
            alt="Main Banner"
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-[#359fc1] opacity-50 z-10"></div>
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20">
            <Image
              src="/images/offer-img1.png"
              alt="Promo"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="z-30 text-center text-white relative pt-32 px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Mega Promotion Today!</h2>
            <p className="mb-4 text-sm">Up to 50% off on selected items</p>
            <div className="mb-4 font-semibold text-sm flex gap-2 justify-center flex-wrap">
              <span className="bg-white text-black px-3 py-1 rounded-md">
                {timeLeft.days} Days
              </span>
              <span className="bg-white text-black px-3 py-1 rounded-md">
                {timeLeft.hours} Hours
              </span>
              <span className="bg-white text-black px-3 py-1 rounded-md">
                {timeLeft.minutes} Min
              </span>
              <span className="bg-white text-black px-3 py-1 rounded-md">
                {timeLeft.seconds} Sec
              </span>
            </div>
            <button className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition text-sm">
              Shop Now →
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full md:w-2/3 overflow-x-auto md:overflow-hidden">
          <div
            className="flex md:transition-transform md:duration-300 md:ease-in-out gap-2 px-1 md:px-0"
            style={{
              transform: `translateX(-${startIndex * cardWidth}px)`,
              width: 'max-content',
            }}
          >
            {discountedProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] max-w-[280px] flex-shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaPromotionDaily;