'use client';
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { PiStorefrontLight } from "react-icons/pi";
import { formatProductName } from "@/app/utils/formatProductName";
import { useLocale } from "next-intl";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

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
  originalPrice?: number;
  rating?: number;
  reviews?: string;
  quantity?: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Calculate progress based on quantity (if available)
  const total = product.quantity || 35;
  const sold = Math.floor(total * 0.7); // Simulate 70% sold
  const progress = (sold / total) * 100;

  return (
    <Link href={`/${locale}/template-2/products/${product.slug}`}>
      <div className="
        relative 
        w-[200px] h-[370px] p-2
        border border-gray-300 rounded-2xl bg-white flex flex-col 
        hover:border-blue-500 hover:shadow-lg transition-all duration-300 mx-auto
        sm:w-[280px] sm:h-[460px] sm:p-4
      ">
        {/* Image */}
        <div className="flex justify-center items-center w-full h-[120px] overflow-hidden sm:h-40">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.title}
            width={120}
            height={120}
            className="object-contain max-h-full transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-1 text-sm sm:gap-2 sm:text-base">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through sm:text-sm">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="font-semibold text-[#102B6B]">
            ${product.price.toFixed(2)}
          </span>
          /Qty
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center text-yellow-500 mt-1 gap-1 text-xs sm:text-sm">
            <CiStar className="text-base" />
            <span className="text-black">{product.rating}</span>
            <span className="text-gray-500">({product.reviews})</span>
          </div>
        )}

        {/* Product Name */}
        <h3
          className="text-lg mt-2 font-medium line-clamp-2 overflow-hidden text-ellipsis"
          title={product.title}
        >
          {formatProductName(product.title, 40)}
        </h3>

        {/* Store Name */}
        <div className="flex items-center gap-1 text-xs mt-1 text-gray-600 sm:text-sm">
          <PiStorefrontLight className="text-sm" />
          <span>MyStore</span>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4 flex justify-center">
          <button 
            className="w-24 absolute top-2 right-2 z-10 rounded-full bg-[#1f52cc] hover:bg-[#359FC1] text-white p-2 text-sm flex justify-center items-center gap-1 shadow-md"
            onClick={(e) => {
              e.preventDefault();
              // Handle add to cart logic here
            }}
          >
            Add <IoCartOutline className="text-lg" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="bg-gray-200 h-1.5 rounded-full overflow-hidden sm:h-2">
            <div
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs mt-1 text-gray-600 sm:text-sm">
            Sold: {sold}/{total}
          </p>
        </div>
      </div>
    </Link>
  );
}