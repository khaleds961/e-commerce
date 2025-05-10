'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const productData = [
    {
        id: 1,
        name: 'Taylor Farms Broccoli',
        rating: 4.8,
        reviews: '17k',
        price: 15.00,
        originalPrice: 18.00,
        image: '/images/offer-img2.png',
        isfeatured: 1,
        istopselling: 1,
        isonsale: 0,
        istoprated: 0,
    },
    {
        id: 2,
        name: 'Almonds Pack',
        rating: 4.8,
        reviews: '17k',
        price: 12.50,
        originalPrice: 15.00,
        image: '/images/offer-img2.png',
        isfeatured: 0,
        istopselling: 1,
        isonsale: 0,
        istoprated: 0,
    },
    {
        id: 3,
        name: 'Kale Greens',
        rating: 4.8,
        reviews: '17k',
        price: 8.99,
        originalPrice: 10.50,
        image: '/images/offer-img2.png',
        isfeatured: 0,
        istopselling: 1,
        isonsale: 1,
        istoprated: 0,
    },
    {
        id: 4,
        name: 'Avocado Duo',
        rating: 4.8,
        reviews: '17k',
        price: 5.25,
        originalPrice: 6.00,
        image: '/images/offer-img2.png',
        isfeatured: 0,
        istopselling: 1,
        isonsale: 1,
        istoprated: 1,
    },
    {
        id: 5,
        name: 'Organic Carrots',
        rating: 4.7,
        reviews: '12k',
        price: 4.50,
        originalPrice: 5.00,
        image: '/images/offer-img2.png',
        isfeatured: 0,
        istopselling: 1,
        isonsale: 1,
        istoprated: 1,
    },
    {
        id: 6,
        name: 'Blueberries Pint',
        rating: 4.9,
        reviews: '23k',
        price: 6.75,
        originalPrice: 7.50,
        image: '/images/offer-img2.png',
        isfeatured: 1,
        istopselling: 1,
        isonsale: 1,
        istoprated: 1,
    },
    {
        id: 7,
        name: 'Strawberries',
        rating: 4.5,
        reviews: '5k',
        price: 3.99,
        originalPrice: 4.50,
        image: '/images/offer-img2.png',
        isfeatured: 1,
        istopselling: 0,
        isonsale: 1,
        istoprated: 1,
    },
    {
        id: 8,
        name: 'Cucumbers',
        rating: 4.7,
        reviews: '8k',
        price: 2.50,
        originalPrice: 3.00,
        image: '/images/offer-img2.png',
        isfeatured: 1,
        istopselling: 1,
        isonsale: 0,
        istoprated: 1,
    },
    {
        id: 9,
        name: 'Pineapple Pack',
        rating: 5.0,
        reviews: '10k',
        price: 10.00,
        originalPrice: 12.00,
        image: '/images/offer-img2.png',
        isfeatured: 1,
        istopselling: 0,
        isonsale: 1,
        istoprated: 1,
    },
    {
        id: 10,
        name: 'Cherries',
        rating: 4.9,
        reviews: '20k',
        price: 7.00,
        originalPrice: 8.00,
        image: '/images/offer-img2.png',
        isfeatured: 1,
        istopselling: 1,
        isonsale: 0,
        istoprated: 1,
    },
    {
        id: 11,
        name: 'Avocado Pack',
        rating: 4.6,
        reviews: '6k',
        price: 4.75,
        originalPrice: 5.50,
        image: '/images/offer-img2.png',
        isfeatured: 1,
        istopselling: 0,
        isonsale: 1,
        istoprated: 0,
    },
    {
        id: 12,
        name: 'Mangoes Box',
        rating: 4.9,
        reviews: '13k',
        price: 5.00,
        originalPrice: 6.00,
        image: '/images/offer-img2.png',
        isfeatured: 1,
        istopselling: 0,
        isonsale: 1,
        istoprated: 1,
    },
];

const ProductList = ({ title, products }: { title: string; products: typeof productData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const productsPerPage = 4;
    const totalSlides = Math.ceil(products.length / productsPerPage);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const getVisibleProducts = () => {
        const start = currentIndex * productsPerPage;
        return products.slice(start, start + productsPerPage);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 8000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative w-full bg-white rounded-2xl shadow-md min-h-[630px]">
            {/* Header */}
            <div className="flex justify-between items-center p-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 cursor-default">{title}</h2>
                    <div className="h-1 bg-[#359FC1] w-1/2 mt-2" />
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={prevSlide}
                        className="p-2 bg-[#359FC1] rounded-full hover:bg-[#2a8ba8] transition-colors cursor-pointer"
                        aria-label="Previous products"
                    >
                        <ChevronLeft size={20} className="text-white" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-2 bg-[#359FC1] rounded-full hover:bg-[#2a8ba8] transition-colors cursor-pointer"
                        aria-label="Next products"
                    >
                        <ChevronRight size={20} className="text-white" />
                    </button>
                </div>
            </div>

            {/* Carousel wrapper */}
            <div className="relative h-[600px] overflow-hidden rounded-lg">
                {/* Slides */}
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            className="w-full flex-shrink-0 grid grid-cols-1"
                        >
                            {products
                                .slice(slideIndex * productsPerPage, slideIndex * productsPerPage + productsPerPage)
                                .map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-all"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                                        />
                                        <div className="ml-6 flex-1 min-w-0">
                                            <div className="flex items-center text-lg text-gray-600">
                                                {product.rating} <Star className="mx-2 text-yellow-500" size={18} fill="#f59e0b" /> ({product.reviews})
                                            </div>
                                            <h3 className="font-semibold text-xl text-gray-800 truncate">{product.name}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-green-600 font-bold text-xl">${product.price.toFixed(2)}</span>
                                                {product.price < product.originalPrice && (
                                                    <span className="line-through text-gray-400 text-lg">${product.originalPrice.toFixed(2)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Slider indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#359FC1]' : 'bg-gray-300'}`}
                        aria-current={currentIndex === index}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

const FourPartCarousels = () => {
    const featuredProducts = productData.filter(p => p.isfeatured === 1);
    const topSellingProducts = productData.filter(p => p.istopselling === 1);
    const onSaleProducts = productData.filter(p => p.isonsale === 1);
    const topRatedProducts = productData.filter(p => p.istoprated === 1);

    return (
        <div className="w-full px-1 py-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 cursor-pointer">
                <ProductList title="Featured Products" products={featuredProducts} />
                <ProductList title="Top Selling Products" products={topSellingProducts} />
                <ProductList title="On-sale Products" products={onSaleProducts} />
                <ProductList title="Top Rated Products" products={topRatedProducts} />
            </div>
        </div>
    );
};

export default FourPartCarousels;
