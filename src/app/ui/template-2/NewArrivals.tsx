'use client';

import { useRef, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard2 from './ProductCard2';

// Carousel breakpoints
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1280 }, items: 6 },
  desktop: { breakpoint: { max: 1280, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

// Dummy product data
const products = [
  {
    id: 1,
    title: 'Smartphone X100',
    price: 299,
    description: 'High-performance smartphone',
    category: { id: 1, name: 'Electronics', slug: 'electronics' },
    images: ['/images/phone1.jpg'],
    slug: 'smartphone-x100',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Smartphone X100',
    price: 299,
    description: 'High-performance smartphone',
    category: { id: 1, name: 'Electronics', slug: 'electronics' },
    images: ['/images/phone1.jpg'],
    slug: 'smartphone-x100',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Smartphone X100',
    price: 299,
    description: 'High-performance smartphone',
    category: { id: 1, name: 'Electronics', slug: 'electronics' },
    images: ['/images/phone1.jpg'],
    slug: 'smartphone-x100',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Smartphone X100',
    price: 299,
    description: 'High-performance smartphone',
    category: { id: 1, name: 'Electronics', slug: 'electronics' },
    images: ['/images/phone1.jpg'],
    slug: 'smartphone-x100',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Smartphone X100',
    price: 299,
    description: 'High-performance smartphone',
    category: { id: 1, name: 'Electronics', slug: 'electronics' },
    images: ['/images/phone1.jpg'],
    slug: 'smartphone-x100',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: 'Smartphone X100',
    price: 299,
    description: 'High-performance smartphone',
    category: { id: 1, name: 'Electronics', slug: 'electronics' },
    images: ['/images/phone1.jpg'],
    slug: 'smartphone-x100',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: 'Smartphone X100',
    price: 299,
    description: 'High-performance smartphone',
    category: { id: 1, name: 'Electronics', slug: 'electronics' },
    images: ['/images/phone1.jpg'],
    slug: 'smartphone-x100',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 8,
    title: 'Smartphone X100',
    price: 299,
    description: 'High-performance smartphone',
    category: { id: 1, name: 'Electronics', slug: 'electronics' },
    images: ['/images/phone1.jpg'],
    slug: 'smartphone-x100',
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Utility to check if product is new (within 10 days)
const isNewArrival = (creationAt: string) => {
  const createdDate = new Date(creationAt);
  const today = new Date();
  const diffInDays = (today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 10;
};

// Custom arrows
const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="p-2 bg-[#359FC1] rounded-full hover:bg-[#2a8ba8] transition-colors cursor-pointer"
    aria-label="Previous products"
  >
    <ChevronLeft size={20} className="text-white" />
  </button>
);

const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="p-2 bg-[#359FC1] rounded-full hover:bg-[#2a8ba8] transition-colors cursor-pointer ml-2"
    aria-label="Next products"
  >
    <ChevronRight size={20} className="text-white" />
  </button>
);

export default function NewArrivals() {
  const carouselRef = useRef<any>(null);
  const [newArrivals, setNewArrivals] = useState<typeof products>([]);

  useEffect(() => {
    const filtered = products.filter(product => isNewArrival(product.creationAt));
    setNewArrivals(filtered);
  }, []);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">New Arrivals</h2>
        <div className="hidden md:flex">
          <CustomLeftArrow onClick={() => carouselRef.current?.previous()} />
          <CustomRightArrow onClick={() => carouselRef.current?.next()} />
        </div>
      </div>

      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        swipeable
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        containerClass="carousel-container"
        itemClass="px-2"
        arrows={false}
      >
        {newArrivals.map(product => (
          <ProductCard2 key={product.id} product={product} />
        ))}
      </Carousel>
    </section>
  );
}
