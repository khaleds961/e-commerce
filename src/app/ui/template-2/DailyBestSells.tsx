'use client';
import Image from 'next/image';
import ProductCardList from './ProductCardList';

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

// Mock products JSON
const mockProducts: Product[] = [
    {
        id: 1,
        title: 'Wireless Bluetooth Headphones',
        price: 59.99,
        description: 'Noise-cancelling wireless headphones with long battery life.',
        category: {
            id: 1,
            name: 'Electronics',
            slug: 'electronics',
        },
        images: ['/images/offer-img2.png'],
        slug: 'wireless-bluetooth-headphones',
        discount: 20,
        countdown: 1,
        creationAt: '',
        updatedAt: '',
    },
    {
        id: 2,
        title: 'Smart Watch Pro 2024',
        price: 129.99,
        description: 'Track your fitness, heart rate, and messages.',
        category: {
            id: 2,
            name: 'Wearables',
            slug: 'wearables',
        },
        images: ['/images/offer-img2.png'],
        slug: 'smart-watch-pro-2024',
        creationAt: '',
        updatedAt: '',
        discount: 20,
        countdown: 1,
    },
    {
        id: 3,
        title: 'USB-C Fast Charging Cable',
        price: 9.99,
        description: 'Durable braided cable for fast charging and data transfer.',
        category: {
            id: 3,
            name: 'Accessories',
            slug: 'accessories',
        },
        images: ['/images/offer-img2.png'],
        slug: 'usb-c-fast-charging-cable',
        creationAt: '',
        updatedAt: '',
        discount: 20,
        countdown: 1,
    },
    {
        id: 4,
        title: 'Portable Power Bank 20000mAh',
        price: 29.99,
        description: 'High-capacity fast-charging portable power bank.',
        category: {
            id: 3,
            name: 'Accessories',
            slug: 'accessories',
        },
        images: ['/images/offer-img2.png'],
        slug: 'portable-power-bank',
        creationAt: '',
        updatedAt: '',
        discount: 0,
        countdown: 0,
    },
];

export default function DailyBestSells() {
    return (
        <section className="w-full px-4 py-6">
            <h2 className="text-2xl font-bold text-[#102B6B] mb-6">
                🔥 Daily Best Sells
            </h2>

            <div className="flex gap-6">
                {/* Left: Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCardList product={product} />
                        </div>
                    ))}
                </div>

                {/* Right: Promo Image */}
                <div className="flex-shrink-0">
                    <Image
                        src="/images/special-snacks.png"
                        alt="Flash Sale Banner"
                        width={550}
                        height={550}
                        className="rounded-2xl object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
