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
      hours: hours < 10 ? `0${hours}` : hours.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const originalPrice = 100;
  const discount = product.discount ?? 0;
  const finalPrice = product.price;
  const rating = 4.8;
  const ratersCount = 120;
  const sold = 18;
  const total = 35;
  const progress = (sold / total) * 100;

  const showCountdown = discount > 0 && product.countdown === 1;
  const countdown = useCountdown(new Date(new Date().getTime() + 11 * 60 * 60 * 1000));

  return (
    <Link href={`/${locale}/template-2/products/${product.id}`}>
      <div className={`
        relative flex flex-col sm:flex-row items-start border border-gray-200 rounded-2xl 
        hover:border-blue-500 bg-white hover:shadow transition-all duration-300
        w-full sm:w-[538px] h-auto sm:h-[265px]
      `}>
        {/* Image Section */}
        <div className="w-full sm:w-1/2 h-48 sm:h-full flex flex-col justify-center items-center overflow-hidden p-2">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={isMobile ? 120 : 160}
            height={isMobile ? 120 : 160}
            className="object-contain max-h-[120px] sm:max-h-[160px] hover:scale-105 transition-transform duration-300"
          />
          {/* Countdown */}
          {showCountdown && (
            <div className="flex items-center justify-center gap-1 mt-2 text-xs sm:text-sm font-medium">
              <span className="bg-gray-100 text-black px-2 sm:px-3 py-1 rounded-full">
                {countdown.hours}H
              </span>
              <span className="bg-gray-100 text-black px-2 sm:px-3 py-1 rounded-full">
                {countdown.minutes}M
              </span>
              <span className="bg-gray-100 text-black px-2 sm:px-3 py-1 rounded-full">
                {countdown.seconds}S
              </span>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full sm:w-1/2 h-auto sm:h-full flex flex-col justify-between p-3 sm:p-4 overflow-hidden">
          <div className="flex flex-col gap-1">
            <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm">
              {discount > 0 && (
                <span className="text-gray-400 line-through">${originalPrice}</span>
              )}
              <span className="text-[#102B6B] font-semibold text-sm sm:text-base">
                ${finalPrice}
              </span>/Qty
            </div>

            <div className="flex items-center text-xs sm:text-sm text-yellow-500 mt-1 gap-1">
              <CiStar className="text-base sm:text-lg" />
              <span className="text-black">{rating}</span>
              <span className="text-gray-500">({ratersCount})</span>
            </div>

            <h3 
              className="text-sm sm:text-base font-semibold line-clamp-2" 
              title={product.title}
            >
              {formatProductName(product.title, isMobile ? 40 : 60)}
            </h3>

            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-1">
              <PiStorefrontLight />
              <span>MyStore</span>
            </div>
          </div>

          <div className="mt-2 sm:mt-2">
            <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs mt-1 text-gray-600">
              Sold: {sold}/{total}
            </p>

            <div className="mt-2 sm:mt-2 flex">
              <button className="w-full rounded-3xl bg-[#1f52cc] hover:bg-[#359FC1] text-white px-4 sm:px-6 py-1 sm:py-2 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base">
                Add <IoCartOutline className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}