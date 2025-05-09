import React from 'react';
import Image from 'next/image';

const vendors = [
    {
        id: 1,
        name: 'Maurice Moulet',
        category: 'AUTO',
        logo: '/images/offer-logo.png',
        bgColor: 'bg-red-100',
        delivery: 'Delivery by 6:15am',
        products: ['/images/vendor-img1.png', '/images/vendor-img2.png', '/images/vendor-img3.png', '/images/vendor-img4.png', '/images/vendor-img5.png'],
    },
    {
        id: 2,
        name: 'Grocery Hub',
        category: 'GROCERY',
        logo: '/images/offer-logo.png',
        bgColor: 'bg-yellow-100',
        delivery: 'Delivery by 6:15am',
        products: ['/images/vendor-img1.png', '/images/vendor-img2.png', '/images/vendor-img3.png', '/images/vendor-img4.png', '/images/vendor-img5.png'],
    },
    {
        id: 3,
        name: 'Veggie Basket',
        category: 'PRODUCE',
        logo: '/images/offer-logo.png',
        bgColor: 'bg-green-100',
        delivery: 'Delivery by 6:15am',
        products: ['/images/vendor-img1.png', '/images/vendor-img2.png', '/images/vendor-img3.png', '/images/vendor-img4.png', '/images/vendor-img5.png'],
    },
    {
        id: 4,
        name: 'Daily Needs',
        category: 'ESSENTIALS',
        logo: '/images/offer-logo.png',
        bgColor: 'bg-blue-100',
        delivery: 'Delivery by 6:15am',
        products: ['/images/vendor-img1.png', '/images/vendor-img2.png', '/images/vendor-img3.png', '/images/vendor-img4.png', '/images/vendor-img5.png'],
    },
    {
        id: 5,
        name: 'Organic Mart',
        category: 'ORGANIC',
        logo: '/images/offer-logo.png',
        bgColor: 'bg-purple-100',
        delivery: 'Delivery by 6:15am',
        products: ['/images/vendor-img1.png', '/images/vendor-img2.png', '/images/vendor-img3.png', '/images/vendor-img4.png', '/images/vendor-img5.png'],
    },
    {
        id: 6,
        name: 'Farm Fresh',
        category: 'FARM',
        logo: '/images/offer-logo.png',
        bgColor: 'bg-pink-100',
        delivery: 'Delivery by 6:15am',
        products: ['/images/vendor-img1.png', '/images/vendor-img2.png', '/images/vendor-img3.png', '/images/vendor-img4.png', '/images/vendor-img5.png'],
    },
    {
        id: 7,
        name: 'Healthy Bites',
        category: 'HEALTH',
        logo: '/images/offer-logo.png',
        bgColor: 'bg-orange-100',
        delivery: 'Delivery by 6:15am',
        products: ['/images/vendor-img1.png', '/images/vendor-img2.png', '/images/vendor-img3.png', '/images/vendor-img4.png', '/images/vendor-img5.png'],
    },
    {
        id: 8,
        name: 'Quick Basket',
        category: 'QUICK',
        logo: '/images/offer-logo.png',
        bgColor: 'bg-teal-100',
        delivery: 'Delivery by 6:15am',
        products: ['/images/vendor-img1.png', '/images/vendor-img2.png', '/images/vendor-img3.png', '/images/vendor-img4.png', '/images/vendor-img5.png'],
    },
];
const TopVendors = () => {
    return (
        <div className="pt-16 pb-16 ">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 pb-10">Weekly Top Vendors</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                {vendors.map((vendor) => (
                    <div key={vendor.id} className="relative flex flex-col items-center">
                        {/* Card */}
                        <div className={`w-full rounded-2xl p-4 pt-20 flex flex-col items-center text-center ${vendor.bgColor}`}>

                            {/* Floating Logo with reverse round */}
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                                <div className={`w-20 h-20 ${vendor.bgColor} flex items-center justify-center rounded-full relative`}>
                                    <Image
                                        src={vendor.logo}
                                        alt={vendor.name}
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            {/* Vendor Name/Category */}
                            <div className="mt-2 mb-3">
                                <p className="text-sm font-bold uppercase tracking-wider">{vendor.category}</p>
                                <p className="text-lg font-medium">{vendor.name}</p>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">{vendor.delivery}</p>

                            <button className="px-4 py-1 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition mb-4">
                                View Offers
                            </button>

                            <div className="flex gap-2 justify-center flex-wrap">
                                {vendor.products.map((product, index) => (
                                    <div
                                        key={index}
                                        className="w-16 h-16 rounded-full bg-white p-1 flex items-center justify-center shadow"
                                    >
                                        <Image
                                            src={product}
                                            alt={`product-${index}`}
                                            width={27}
                                            height={52}
                                            className="object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopVendors;
