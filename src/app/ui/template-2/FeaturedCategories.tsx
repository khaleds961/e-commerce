'use client';
import Image from 'next/image';

const featuredItems = [
    {
        id: 1,
        title: 'Fragrances',
        image: '/images/f-c-1.png',
        text: 'Everyday Fresh Meat',
        link: '#',
    },
    {
        id: 2,
        title: 'Skincare',
        image: '/images/f-c-2.png',
        text: 'Daily Fresh Vegetables',
        link: '#',
    },
    {
        id: 3,
        title: 'Makeup',
        image: '/images/f-c-3.png',
        text: 'Everyday Fresh Milk.',
        link: '#',
    },
    {
        id: 4,
        title: 'Haircare',
        image: '/images/f-c-4.png',
        text: 'Everyday Fresh Fruits',
        link: '#',
    },
];

export default function FeaturedCategories() {
    return (
        <section className="my-12">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-12">
                {featuredItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative group rounded-lg overflow-hidden shadow-lg"
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={400}
                            height={300}
                            className="w-full h-[332px] object-cover"
                        />

                        {/* Text + Button Overlay at Left-Center */}
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-10">
                            <h6 className="text-black text-3xl drop-shadow-md w-50">
                                {item.text}
                            </h6>
                            <a
                                href={item.link}
                                className="bg-white text-black px-6 py-3 text-base font-semibold rounded-full shadow hover:bg-[#359FC1] hover:text-white transition-colors duration-300 inline-flex items-center gap-2"
                            >
                                Shop Now <span className="text-xl">→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
