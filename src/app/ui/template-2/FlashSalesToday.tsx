'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const salesItems = [
  {
    id: 1,
    image: '/images/sale1.png',
    additionalImage: '/images/banner-img1.png',
    link: '#',
    title: 'Sale 1',
  },
  {
    id: 2,
    image: '/images/sale3.png',
    additionalImage: '/images/banner-img1.png',
    link: '#',
    title: 'Sale 2',
  },
  {
    id: 3,
    image: '/images/sale1.png',
    additionalImage: '/images/banner-img1.png',
    link: '#',
    title: 'Sale 3',
  },
  {
    id: 4,
    image: '/images/sale3.png',
    additionalImage: '/images/banner-img1.png',
    link: '#',
    title: 'Sale 4',
  },
];

const targetDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

function getTimeLeft() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function FlashSalesToday() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const isMobile = windowWidth < 640;
  const visibleSlides = isMobile ? 1 : 2;

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isDragging && !isHovered) {
      const interval = setInterval(() => {
        goToNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isDragging, isHovered]);

  const maxIndex = salesItems.length - visibleSlides;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setCurrentTranslate(0);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setCurrentTranslate(0);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setStartPos(clientX);
  };

  const endDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientX = 'touches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = clientX - startPos;
    if (diff < -50) goToNext();
    else if (diff > 50) goToPrev();
    setCurrentTranslate(0);
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setCurrentTranslate(clientX - startPos);
  };

  const renderItem = (item: typeof salesItems[number]) => (
    <div className="relative w-full h-[200px] sm:h-[255px] rounded-3xl overflow-hidden">
      <Image
        src={item.image}
        alt={item.title || `Item ${item.id}`}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute top-6 sm:top-10 left-4 w-[200px] sm:w-[291px] h-[100px] sm:h-[147px]">
        <Image
          src={item.additionalImage}
          alt={`Product ${item.id}`}
          width={291}
          height={147}
          className="object-contain"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-end text-right px-4 gap-2 sm:gap-4">
        {item.title && (
          <div className="text-black text-base sm:text-xl font-semibold bg-white/80 px-3 py-1 sm:px-4 sm:py-2 rounded-md">
            {item.title}
          </div>
        )}
        <div className="flex gap-1 sm:gap-2 text-black text-sm sm:text-lg font-bold bg-white/80 px-3 py-1 sm:px-4 sm:py-2 rounded-md">
          {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
            <div key={unit} className="bg-white rounded-md px-2 sm:px-3 py-1 min-w-[40px] text-center">
              {timeLeft[unit as keyof typeof timeLeft]}{unit.charAt(0)}
            </div>
          ))}
        </div>
        <a
          href={item.link}
          className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-full hover:bg-[#359FC1] hover:text-white transition-colors duration-300 inline-flex items-center gap-2 w-fit"
        >
          Shop Now <span className="text-xl">→</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="w-full relative px-4 sm:px-0">
      <h2 className="text-2xl font-bold mb-6">Flash Sales Today</h2>

      <div
        ref={sliderRef}
        className="relative w-full rounded-xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        onMouseMove={onDrag}
        onTouchMove={onDrag}
        onMouseUp={endDrag}
        onTouchEnd={endDrag}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${(100 / visibleSlides) * currentIndex}% + ${currentTranslate}px))`,
          }}
        >
          {salesItems.map((item) => (
            <div
              key={item.id}
              className={`px-2 flex-shrink-0 ${
                isMobile ? 'w-full' : 'w-1/2'
              }`}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>

        {/* Show arrows only on desktop */}
        {!isMobile && (
          <>
            <button
              onClick={goToPrev}
              className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-200 transition"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white p-3 rounded-full shadow hover:bg-gray-200 transition"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
