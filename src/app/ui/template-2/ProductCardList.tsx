'use client';
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { PiStorefrontLight } from "react-icons/pi";
import { formatProductName } from "@/app/utils/formatProductName";
import { useLocale } from "next-intl";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

// Types
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
  discount?: number;
  countdown?: number;
};

// Countdown hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

export default function ProductCardList({ product }: { product: Product }) {
  const locale = useLocale();

  const originalPrice = 100;
  const discount = product.discount ?? 0;
  const finalPrice = product.price;
  const rating = 4.8;
  const ratersCount = 120;
  const sold = 18;
  const total = 35;
  const progress = (sold / total) * 100;

  const showCountdown = discount > 0 && product.countdown === 1;
  const countdown = useCountdown(new Date(new Date().getTime() + 11 * 60 * 60 * 1000)); // 11 hrs from now

  return (
    <Link href={`/${locale}/products/${product.id}`} className="block">
      <div
        className="relative flex flex-row items-start gap-4 p-4 border border-gray-200 rounded-2xl hover:border-blue-500 bg-white hover:shadow transition-all duration-300"
        style={{ width: '537px', height: '267px' }}
      >
        {/* Image Section */}
        <div className="w-[160px] h-full flex flex-col justify-start items-center overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={160}
            height={160}
            className="object-contain max-h-[200px] hover:scale-105 transition-transform duration-300"
          />
          {/* Countdown */}
          {showCountdown && (
            <div className="text-sm text-red-600 font-semibold mt-2 text-center">
              {countdown.hours} Hours {countdown.minutes} Min {countdown.seconds} Sec
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between h-full overflow-hidden">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold line-clamp-2" title={product.title}>
              {formatProductName(product.title, 60)}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm">
              {discount > 0 && (
                <span className="text-gray-400 line-through">${originalPrice}</span>
              )}
              <span className="text-[#102B6B] font-semibold text-base">${finalPrice}</span>/Qty
            </div>

            <div className="flex items-center text-sm text-yellow-500 mt-1 gap-1">
              <CiStar className="text-lg" />
              <span className="text-black">{rating}</span>
              <span className="text-gray-500">({ratersCount})</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <PiStorefrontLight />
              <span>MyStore</span>
            </div>
          </div>

          <div className="mt-2">
            <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs mt-1 text-gray-600">
              Sold: {sold}/{total}
            </p>

            {/* Add to Cart Button */}
            <div className="mt-2 flex justify-end">
              <button className="rounded-2xl bg-[#1f52cc] hover:bg-[#359FC1] text-white px-6 py-2 flex items-center gap-2 mr-10 ml-10">
                Add <IoCartOutline className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
