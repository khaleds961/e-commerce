'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSiteProperties } from '@/app/store/siteProperties';
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
    FaSearch,
} from 'react-icons/fa';

// 🔗 JSON links object
const footerLinks = [
    {
        title: 'Information',
        items: [
            'Become a Vendor',
            'Affiliate Program',
            'Privacy Policy',
            'Our Suppliers',
            'Extended Plan',
            'Community',
        ],
    },
    {
        title: 'Customer Support',
        items: [
            'Help Center',
            'Contact Us',
            'Report Abuse',
            'Submit and Dispute',
            'Policies & Rules',
            'Online Shopping',
        ],
    },
    {
        title: 'My Account',
        items: [
            'My Account',
            'Order History',
            'Shopping Cart',
            'Compare',
            'Help Ticket',
            'Wishlist',
        ],
    },
    {
        title: 'Daily Groceries',
        items: [
            'Dairy & Eggs',
            'Meat & Seafood',
            'Breakfast Food',
            'Household Supplies',
            'Bread & Bakery',
            'Pantry Staples',
        ],
    },
];

const Footer = () => {
    const { logo } = useSiteProperties();
    const locale = 'en';

    const socialIcons = [
        { icon: <FaFacebookF />, name: 'Facebook' },
        { icon: <FaTwitter />, name: 'Twitter' },
        { icon: <FaLinkedinIn />, name: 'LinkedIn' },
        { icon: <FaPinterestP />, name: 'Pinterest' },
        { icon: <FaSearch />, name: 'Search' },
    ];

    return (
        <footer className="text-gray-800 w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10">
                    {/* Company Info */}
                    <div className="xs:col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col items-center lg:items-start">
                        <Link href={`/${locale}`} className="mb-4 sm:mb-5">
                            <Image
                                src={logo}
                                alt="logo"
                                width={140}
                                height={30}
                                className="w-[120px] lg:w-[140px] h-auto object-contain"
                                priority
                            />
                        </Link>
                        <p className="mb-4 text-sm sm:text-base text-gray-500 text-center lg:text-left max-w-xs">
                            We're Grocery Shop, an innovative team of food suppliers.
                        </p>
                        <div className="not-italic mb-4 text-sm sm:text-base text-gray-600 text-center lg:text-left">
                            <div className="flex items-center mb-2">
                                <FaMapMarkerAlt className="mr-2 text-green-600" />
                                <p>789 Inner Lane, Blyse park, California, USA</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaPhoneAlt className="mr-2 text-green-600" />
                                <p>+00 123 456 789 or +00 887 654 012</p>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="mr-2 text-green-600" />
                                <a
                                    href="mailto:support24@marketpro.com"
                                    className="text-gray-600 hover:text-blue-600 font-medium hover: text-sm sm:text-base"
                                >
                                    support24@marketpro.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Link Sections */}
                    {footerLinks.map(({ title, items }) => (
                        <div key={title} className="text-center sm:text-left">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
                            <ul className="space-y-3">
                                {items.map(item => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-gray-600 hover:text-blue-600 hover: transition-colors text-sm sm:text-base"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* App Store & Social */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Shop on The Go</h3>
                        <p className="mb-4 text-sm text-gray-500 max-w-xs ">
                            Marketpro App is available. Get it now
                        </p>
                        <div className="flex flex-col xs:flex-row gap-3 w-full max-w-[100px] sm:max-w-[100px] mx-auto sm:mx-0 mb-6">
                            <Link href="#" className="flex-1 min-w-[120px] hover:opacity-90 transition-opacity">
                                <Image
                                    src="/images/store-img1.png"
                                    alt="Download on App Store"
                                    width={135}
                                    height={40}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </Link>
                            <Link href="#" className="flex-1 min-w-[120px] hover:opacity-90 transition-opacity">
                                <Image
                                    src="/images/store-img2.png"
                                    alt="Get it on Google Play"
                                    width={135}
                                    height={40}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </Link>
                        </div>
                        <div className="flex space-x-3 justify-center sm:justify-start">
                            {socialIcons.map(({ icon, name }) => (
                                <Link
                                    key={name}
                                    href="#"
                                    aria-label={name}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition-colors text-green-700"
                                >
                                    {icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
