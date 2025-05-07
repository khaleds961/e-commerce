'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';

const categories = [
    'All',
    'Grocery',
    'Fruits',
    'Juices',
    'Vegetables',
    'Snacks',
    'Organic Foods',
];

// Update JSON to match expected ProductCard format
const productData: Record<string, any[]> = {
    Grocery: [
        { id: 1, title: 'Rice Bag', price: 20, images: ['/images/offer-img1.png'] },
        { id: 2, title: 'Cooking Oil', price: 10, images: ['/images/offer-img1.png'] },
        { id: 3, title: 'Rice Bag', price: 20, images: ['/images/offer-img1.png'] },
        { id: 4, title: 'Cooking Oil', price: 10, images: ['/images/offer-img1.png'] },
        { id: 5, title: 'Rice Bag', price: 20, images: ['/images/offer-img1.png'] },
        { id: 6, title: 'Cooking Oil', price: 10, images: ['/images/offer-img1.png'] },
        { id: 7, title: 'Rice Bag', price: 20, images: ['/images/offer-img1.png'] },
        { id: 8, title: 'Cooking Oil', price: 10, images: ['/images/offer-img1.png'] },
    ],
    Fruits: [
        { id: 9, title: 'Apple', price: 2, images: ['/images/offer-img1.png'] },
        { id: 10, title: 'Banana', price: 1, images: ['/images/offer-img1.png'] },
        { id: 11, title: 'Apple', price: 2, images: ['/images/offer-img1.png'] },
        { id: 12, title: 'Banana', price: 1, images: ['/images/offer-img1.png'] },
        { id: 13, title: 'Apple', price: 2, images: ['/images/offer-img1.png'] },
        { id: 14, title: 'Banana', price: 1, images: ['/images/offer-img1.png'] },
        { id: 15, title: 'Apple', price: 2, images: ['/images/offer-img1.png'] },
        { id: 16, title: 'Banana', price: 1, images: ['/images/offer-img1.png'] },
    ],
    Juices: [
        { id: 17, title: 'Orange Juice', price: 3, images: ['/images/offer-img1.png'] },
        { id: 18, title: 'Mango Juice', price: 4, images: ['/images/offer-img1.png'] },
        { id: 19, title: 'Apple Juice', price: 3.5, images: ['/images/offer-img1.png'] },
        { id: 20, title: 'Orange Juice', price: 3, images: ['/images/offer-img1.png'] },
        { id: 21, title: 'Mango Juice', price: 4, images: ['/images/offer-img1.png'] },
        { id: 22, title: 'Apple Juice', price: 3.5, images: ['/images/offer-img1.png'] },
        { id: 23, title: 'Orange Juice', price: 3, images: ['/images/offer-img1.png'] },
        { id: 24, title: 'Mango Juice', price: 4, images: ['/images/offer-img1.png'] },
        { id: 25, title: 'Apple Juice', price: 3.5, images: ['/images/offer-img1.png'] },
        { id: 26, title: 'Orange Juice', price: 3, images: ['/images/offer-img1.png'] },
        { id: 27, title: 'Mango Juice', price: 4, images: ['/images/offer-img1.png'] },
        { id: 28, title: 'Apple Juice', price: 3.5, images: ['/images/offer-img1.png'] },
    ],
    Vegetables: [
        { id: 29, title: 'Carrot', price: 2, images: ['/images/offer-img1.png'] },
        { id: 30, title: 'Tomato', price: 1.5, images: ['/images/offer-img1.png'] },
        { id: 31, title: 'Carrot', price: 2, images: ['/images/offer-img1.png'] },
        { id: 32, title: 'Tomato', price: 1.5, images: ['/images/offer-img1.png'] },
        { id: 33, title: 'Carrot', price: 2, images: ['/images/offer-img1.png'] },
        { id: 34, title: 'Tomato', price: 1.5, images: ['/images/offer-img1.png'] },
        { id: 35, title: 'Carrot', price: 2, images: ['/images/offer-img1.png'] },
        { id: 36, title: 'Tomato', price: 1.5, images: ['/images/offer-img1.png'] },
        { id: 37, title: 'Carrot', price: 2, images: ['/images/offer-img1.png'] },
        { id: 38, title: 'Tomato', price: 1.5, images: ['/images/offer-img1.png'] },
    ],
    Snacks: [
        { id: 39, title: 'Chips', price: 1.2, images: ['/images/offer-img1.png'] },
        { id: 40, title: 'Biscuits', price: 2.5, images: ['/images/offer-img1.png'] },
        { id: 41, title: 'Chips', price: 1.2, images: ['/images/offer-img1.png'] },
        { id: 42, title: 'Biscuits', price: 2.5, images: ['/images/offer-img1.png'] },
        { id: 43, title: 'Chips', price: 1.2, images: ['/images/offer-img1.png'] },
        { id: 44, title: 'Biscuits', price: 2.5, images: ['/images/offer-img1.png'] },
        { id: 45, title: 'Chips', price: 1.2, images: ['/images/offer-img1.png'] },
        { id: 46, title: 'Biscuits', price: 2.5, images: ['/images/offer-img1.png'] },
        { id: 47, title: 'Chips', price: 1.2, images: ['/images/offer-img1.png'] },
        { id: 48, title: 'Biscuits', price: 2.5, images: ['/images/offer-img1.png'] },
        { id: 49, title: 'Chips', price: 1.2, images: ['/images/offer-img1.png'] },
        { id: 50, title: 'Biscuits', price: 2.5, images: ['/images/offer-img1.png'] },
    ],
    'Organic Foods': [
        { id: 51, title: 'Organic Honey', price: 8, images: ['/images/offer-img1.png'] },
        { id: 52, title: 'Organic Eggs', price: 6, images: ['/images/offer-img1.png'] },
        { id: 53, title: 'Organic Honey', price: 8, images: ['/images/offer-img1.png'] },
        { id: 54, title: 'Organic Eggs', price: 6, images: ['/images/offer-img1.png'] },
        { id: 55, title: 'Organic Honey', price: 8, images: ['/images/offer-img1.png'] },
        { id: 56, title: 'Organic Eggs', price: 6, images: ['/images/offer-img1.png'] },
        { id: 57, title: 'Organic Honey', price: 8, images: ['/images/offer-img1.png'] },
        { id: 58, title: 'Organic Eggs', price: 6, images: ['/images/offer-img1.png'] },
        { id: 59, title: 'Organic Honey', price: 8, images: ['/images/offer-img1.png'] },
        { id: 60, title: 'Organic Eggs', price: 6, images: ['/images/offer-img1.png'] },
        { id: 61, title: 'Organic Honey', price: 8, images: ['/images/offer-img1.png'] },
        { id: 62, title: 'Organic Eggs', price: 6, images: ['/images/offer-img1.png'] },

    ],
};

const RecommendedForYou = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const getFilteredProducts = () => {
        if (selectedCategory === 'All') {
            return Object.values(productData).flat();
        }
        return productData[selectedCategory] || [];
    };

    const products = getFilteredProducts();

    return (
        <div className="p-4 pr-15 pl-15 pt-15">
            <h2 className="text-3xl font-bold mb-4">Recommended for you</h2>

            <div className="flex flex-wrap justify-end gap-2 mb-6">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full  ${selectedCategory === cat
                                ? 'bg-[#359FC1] text-white'
                                : 'text-gray-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {products.slice(0, 12).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedForYou;
