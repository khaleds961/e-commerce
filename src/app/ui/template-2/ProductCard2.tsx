'use client';
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { PiStorefrontLight } from "react-icons/pi";
import { formatProductName } from "@/app/utils/formatProductName";
import { useLocale } from "next-intl";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

// Define types
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
  rating?: number;
  reviews?: string;
  quantity?: number;
};

export default function ProductCard2({ product }: { product: Product }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const originalPrice = product.price;
  const discount = 10;
  const finalPrice = product.price;
  const rating = 4.8;
  const ratersCount = 120;
  const sold = 18;
  const total = 35;
  const progress = (sold / total) * 100;

  return (
    <Link
                    key={product.slug}
                    href={`/${locale}/template-2/products/${product.slug}`}
                    className="flex items-center rounded-lg transition-all"
                  >
      <div className="cursor-pointer relative border border-gray-300 rounded-2xl p-2 bg-white hover:border-blue-500 transition-all duration-300 w-[267px] h-[464px] flex flex-col hover:shadow-lg">

        {/* Image */}
        <div className="flex justify-center items-center w-full h-40 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={150}
            height={150}
            className="object-contain max-h-full transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-2">
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
          )}
          <span className="text-lg font-semibold text-[#102B6B]">${finalPrice}</span>/Qty
        </div>

        {/* Rating */}
        <div className="flex items-center text-sm text-yellow-500 mt-2 gap-1">
          <CiStar className="text-lg" />
          <span className="text-sm text-black">{rating}</span>
          <span className="text-sm text-gray-500">({ratersCount})</span>
        </div>

        {/* Product Name */}
        <h3 className="text-xl mt-3 font-medium line-clamp-2 text-ellipsis overflow-hidden" title={product.title}>
          {formatProductName(product.title, 40)}
        </h3>

        {/* Store Name */}
        <div className="flex items-center gap-1 text-xs mt-2 text-gray-600">
          <PiStorefrontLight />
          <span className="text-sm">MyStore</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-2">
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Row with Sold info and Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-xs text-gray-600">
            Sold: {sold}/{total}
          </p>

          <button
            className="rounded-4xl bg-[#1f52cc] hover:bg-[#359FC1] text-white px-4 py-2 flex items-center justify-center gap-2 text-sm"
          >
            Add <IoCartOutline className="text-lg" />
          </button>
        </div>
      </div>
    </Link>
  );
}
