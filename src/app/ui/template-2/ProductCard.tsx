'use client';
import Image from "next/image";
import { LuShoppingCart } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { PiStorefrontLight } from "react-icons/pi";
import { formatProductName } from "@/app/utils/formatProductName";
import { useLocale } from "next-intl";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function ProductCard({ product }: { product: Product }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const originalPrice = 100;
  const discount = 10;
  const finalPrice = product.price;
  const rating = 4.8;
  const ratersCount = 120;
  const sold = 18;
  const total = 35;
  const progress = (sold / total) * 100;

  return (
    <Link href={`/${locale}/products/${product.id}`} className="block">
      <div className="cursor-pointer relative border border-gray-300 rounded-2xl p-2 bg-white hover:border-blue-500 transition-all duration-300 w-[267px] h-[464px] flex flex-col hover:shadow-lg">

        {/* Add to Cart */}
        <button
          className={`cursor-pointer absolute top-2 ${isRTL ? 'left-2' : 'right-2'} z-11 rounded-2xl bg-[#1f52cc] hover:bg-[#359FC1] text-white  p-2 w-[100px] flex items-center justify-center gap-2`}
        >
          Add <IoCartOutline className="text-xl" />
        </button>

        {/* Image with local group */}
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
        <div className="mt-auto">
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs mt-1 text-gray-600">
            Sold: {sold}/{total}
          </p>
        </div>
      </div>
    </Link>
  );
}
