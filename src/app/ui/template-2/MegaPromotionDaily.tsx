'use client';

import React from 'react';
import Image from 'next/image';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define Category and Product types
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
};

// Raw data with category as string (before mapping)
const rawProducts: {
  id: number;
  title: string;
  price: number;
  discount: number;
  images: string[];
  description: string;
  slug: string;
  creationAt: string;
  updatedAt: string;
  category: string;
}[] = [
  {
    id: 1,
    title: 'Discounted Rice',
    price: 25,
    discount: 35,
    images: ['/images/offer-img1.png'],
    description: 'High-quality rice at a discounted price.',
    slug: 'discounted-rice',
    creationAt: new Date().toISOString(),
    category: 'Promo',
    updatedAt: '',
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

// Convert raw products to match Product type
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
  const [startIndex, setStartIndex] = React.useState(0);
  const visibleCount = 4; // Display 4 products at a time

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, discountedProducts.length - visibleCount)
    );
  };

  const visibleProducts = discountedProducts.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="pr-15 pl-15 pt-15">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Hot Deals Todays</h2>
        <div className="flex items-center gap-4">
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

      <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg">
        {/* Left Banner */}
        <div className="w-full md:w-1/3 relative  bg-[#f5f5f5] rounded-lg overflow-hidden flex items-center justify-center">
          {/* Background Image */}
          <Image
            src="/images/offer-shape.png"
            alt="Main Banner"
            fill
            className="object-cover z-0"
          />

          {/* Overlay Image */}
          <div className="absolute top-4 left-4 z-10">
            <Image
              src="/images/offer-img1.png"
              alt="Promo"
              width={140}
              height={140}
              className="object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="z-20 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Mega Promotion Today!</h2>
            <p className="mb-4">Up to 50% off on selected items</p>
            <button className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Shop Now →
            </button>
          </div>
        </div>

        {/* Right Carousel */}
        <div className="w-full md:w-2/3 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaPromotionDaily;
