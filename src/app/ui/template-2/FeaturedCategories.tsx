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
        <section className="my-8 sm:my-10 md:my-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {featuredItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative group rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Image with responsive height */}
                        <div className="relative w-full h-[180px] xs:h-[200px] sm:h-[240px] md:h-[280px] lg:h-[332px]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                        </div>

                        {/* Text + Button Overlay - responsive positioning */}
                        <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
                            <h6 className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium sm:font-semibold drop-shadow-md max-w-[80%]">
                                {item.text}
                            </h6>
                            <a
                                href={item.link}
                                className="bg-white text-black px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-full shadow hover:bg-[#359FC1] hover:text-white transition-colors duration-300 inline-flex items-center gap-1 sm:gap-2"
                            >
                                Shop Now <span className="text-sm sm:text-base md:text-lg lg:text-xl">→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
