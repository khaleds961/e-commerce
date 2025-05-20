"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Brand = {
  id: string;
  name: string;
  image: string;
  slug: string;
};

const brands: Brand[] = [
  { id: "1", name: "Nike", image: "/images/brand-img1.png", slug: "nike" },
  { id: "2", name: "Adidas", image: "/images/brand-img2.png", slug: "adidas" },
  { id: "3", name: "Puma", image: "/images/brand-img3 (1).png", slug: "puma" },
  { id: "4", name: "Reebok", image: "/images/brand-img1.png", slug: "reebok" },
  { id: "5", name: "Under Armour", image: "/images/brand-img2.png", slug: "under-armour" },
  { id: "6", name: "New Balance", image: "/images/brand-img3 (1).png", slug: "new-balance" },
  { id: "7", name: "Asics", image: "/images/brand-img1.png", slug: "asics" },
  { id: "8", name: "Converse", image: "/images/brand-img2.png", slug: "converse" },
  { id: "9", name: "Vans", image: "/images/brand-img2.png", slug: "vans" },
  { id: "10", name: "Skechers", image: "/images/brand-img2.png", slug: "skechers" },
  { id: "11", name: "Fila", image: "/images/brand-img2.png", slug: "fila" },
  { id: "12", name: "Jordan", image: "/images/brand-img2.png", slug: "jordan" },
];

export default function ShopByBrand() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState({ left: false, right: true });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (el) {
      setShowArrows({
        left: el.scrollLeft > 0,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 5,
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    const scrollAmount = el?.clientWidth ? el.clientWidth * 0.8 : 300;

    if (el) {
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 500); // Recheck after smooth scroll
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollPosition();
    el.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      el.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      scroll("right");
    }, 3000);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, []);

  return (
    <div className="relative bg-[#e0e8eb] py-6 px-4 sm:px-6 lg:px-10 rounded-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Shop by Brand</h2>
        <div className="flex items-center gap-4">
          <Link
            href="/deals"
            className="text-sm md:text-base text-[#299e60] font-semibold hover:underline whitespace-nowrap"
          >
            View All Deals
          </Link>
          {!isTouchDevice && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!showArrows.left}
                className={`p-2 rounded-full shadow-md transition"
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!showArrows.right}
                className={`p-2 rounded-full shadow-md transition ${
                  showArrows.right ? "bg-white hover:bg-gray-100" : "bg-gray-300 cursor-not-allowed"
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 sm:gap-4 py-2 px-1 scroll-smooth no-scrollbar"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {brands.slice(0, 8).map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col items-center flex-shrink-0 w-[100px] xs:w-[110px] sm:w-[130px] md:w-[150px] lg:w-[180px]"
          >
            <Link
              href={`/brands/${brand.slug}`}
              className="w-full h-32 sm:h-36 md:h-40 flex items-center justify-center"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={100}
                height={100}
                className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <p className="mt-2 text-xs sm:text-sm text-center font-medium capitalize">
              {brand.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
