'use client';

import { Star } from 'lucide-react';
import Link from 'next/link';

interface ProductProps {
  id: number;
  image: string;
  name: string;
  rating: number;
  reviews: string;
  sold: string;
  soldPercent: number;
  oldPrice: string;
  newPrice: string;
  categorySlug: string;
}

export default function ShopByCategoryProduct({
  id,
  image,
  name,
  rating,
  reviews,
  sold,
  soldPercent,
  oldPrice,
  newPrice,
  categorySlug,
}: ProductProps) {
  return (
    <article 
      className="w-80 rounded-xl border border-gray-200 p-4 shadow-sm relative hover:shadow-md transition-shadow duration-300"
      aria-labelledby={`product-${id}-title`}
    >
      {/* Badge with aria-hidden since it's decorative */}
      <div 
        className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
        aria-hidden="true"
      >
        Best Sale
      </div>

      {/* Product Link with proper semantic HTML */}
      <Link 
        href={`/categories/${categorySlug}/${id}`} 
        className="flex flex-col h-full"
        aria-label={`View details for ${name}`}
      >
        {/* Image with alt text */}
        <div className="flex justify-center mt-4 flex-1">
          <img
            src={image}
            alt={name}
            className="h-48 object-contain"
            loading="lazy"
          />
        </div>

        {/* Title with proper heading level */}
        <h3 
          id={`product-${id}-title`}
          className="mt-4 text-base font-semibold text-gray-800 line-clamp-2"
        >
          {name}
        </h3>

        {/* Rating with aria-label */}
        <div 
          className="flex items-center gap-1 mt-1 text-sm text-gray-600"
          aria-label={`Rating: ${rating} out of 5 stars from ${reviews} reviews`}
        >
          <span className="text-orange-500">{rating}</span>
          <Star size={14} className="text-orange-500 fill-orange-500" />
          <span>({reviews})</span>
        </div>

        {/* Progress Bar with aria attributes */}
        <div className="mt-2 text-xs text-gray-600">
          <div className="flex justify-between mb-1">
            <span id={`sold-${id}`}>Sold: {sold}</span>
          </div>
          <div 
            className="w-full h-1 bg-gray-200 rounded-full"
            role="progressbar"
            aria-valuenow={soldPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-labelledby={`sold-${id}`}
          >
            <div
              className="h-1 bg-orange-500 rounded-full"
              style={{ width: `${soldPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Price with screen reader text */}
        <div className="mt-3 flex items-center space-x-2">
          <span className="line-through text-gray-400 text-sm" aria-hidden="true">
            {oldPrice}
          </span>
          <span className="text-lg font-bold text-gray-800">
            {newPrice}
            <span className="sr-only">Current price</span>
          </span>
          <span className="text-sm text-gray-500">/Qty</span>
        </div>
      </Link>

      {/* Button with proper aria-label */}
      <button 
        className="mt-4 w-full bg-gray-100 text-sm font-medium text-gray-800 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition"
        aria-label={`Add ${name} to cart`}
      >
        Add To Cart <span aria-hidden="true">🛒</span>
      </button>
    </article>
  );
}