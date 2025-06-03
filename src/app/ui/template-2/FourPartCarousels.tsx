'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { productData, Product } from '@/data/product';



const ProductList = ({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) => {
  const pathname = usePathname();

  // Extract locale from path (assumes locale is first segment, e.g. /en/...)
  const locale = pathname?.split('/')[1] || 'en';

  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4;
  const totalSlides = Math.ceil(products.length / productsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
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
                  <Link
                    key={product.slug}
                    href={`/${locale}/template-2/products/${product.slug}`}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                    />
                    <div className="ml-6 flex-1 min-w-0">
                      <div className="flex items-center text-lg text-gray-600">
                        {product.rating}
                        <Star className="mx-2 text-yellow-500" size={18} fill="#f59e0b" />
                        ({product.reviews})
                      </div>
                      <h3 className="font-semibold text-xl text-gray-800 truncate">{product.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-green-600 font-bold text-xl">${product.price.toFixed(2)}</span>
                        {product.price < product.originalPrice && (
                          <span className="line-through text-gray-400 text-lg">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
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
  const featuredProducts = productData.filter((p) => p.isfeatured === 1);
  const topSellingProducts = productData.filter((p) => p.istopselling === 1);
  const onSaleProducts = productData.filter((p) => p.isonsale === 1);
  const topRatedProducts = productData.filter((p) => p.istoprated === 1);

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
