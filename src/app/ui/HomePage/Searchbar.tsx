'use client'
import { FaRegUser } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa6"
import { FaShoppingCart } from "react-icons/fa"
import { BiCategory } from "react-icons/bi"
import { FaSearch } from "react-icons/fa"
import Image from "next/image"
import { FaRegComments } from "react-icons/fa"
import { FaPhoneAlt } from "react-icons/fa"
import { FaChevronDown } from "react-icons/fa"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./LanguageSwitcher"
import { useSiteProperties } from "@/app/store/siteProperties"
import Link from "next/link"
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';


export default function Searchbar() {
    const t = useTranslations('HomePage');
    const { logo, backgroundColor, searchbackground, textColor } = useSiteProperties();
    const locale = useLocale();



    const helpOptions = [
        {
            label: "Call Center",
            icon: <FaPhoneAlt className="text-gray-400 text-xs" />,
        },
        {
            label: "Live Chat",
            icon: <FaRegComments className="text-gray-400 text-xs" />,
        },
    ];

    const categories = [
        { name: "Electronics" },
        { name: "Fashion" },
        { name: "Home Appliances" },
        { name: "Books" },
    ];

    const Shop = [
        { name: "Shop" },
        { name: "Shop Details" },
        { name: "Shop Details Two" },
    ];

    const Home = [
        { name: "Home" },
        { name: "Home" },
        { name: "Home" },
    ];

    const Pages = [
        { name: "Cart" },
        { name: "Wishlist" },
        { name: "Checkout" },
        { name: "Become Seller" },
        { name: "Account" },
    ];

    const Vendors = [
        { name: "Cart" },
        { name: "Wishlist" },
        { name: "Checkout" },
        { name: "Become Seller" },
        { name: "Account" },
    ];

    const Blog = [
        { name: "Cart" },
        { name: "Wishlist" },
        { name: "Checkout" },
        { name: "Become Seller" },
        { name: "Account" },
    ];

    const [showCategories, setShowCategories] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const [showPages, setShowPages] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [showHome, setShowHome] = useState(false);
    const [showVendors, setShowVendors] = useState(false);
    const [showBlog, setShowBlog] = useState(false);

    return (
        <div style={{ backgroundColor: backgroundColor, color: textColor }}>
            <div className="text-white text-sm flex justify-between h-9 w-80% mx-auto items-center px-4 md:px-[130px]">
                <div className="flex space-x-2">
                    {/* link bar 1 */}
                    <button className="cursor-pointer border-gray-300 hover:underline">
                        <h4>Become A Seller</h4>
                    </button>
                    <div className="border-l h-4 border-gray-300 mx-4"></div>
                    <button className="cursor-pointer border-gray-300 hover:underline">
                        <h4>About us</h4>
                    </button>
                    <div className="border-l h-4 border-gray-300 mx-4"></div>
                    <button className="cursor-pointer border-gray-300 hover:underline">
                        <h4>Free Delivery</h4>
                    </button>
                    <div className="border-l h-4 border-gray-300 mx-4"></div>
                    <button className="cursor-pointer border-gray-300 hover:underline">
                        <h4>Returns Policy</h4>
                    </button>
                </div>

                <div className="flex space-x-4">
                    {/* link bar 2 */}
                    <div className="relative group">
                        <button className="cursor-pointer border-gray-300 hover:underline flex items-center gap-2">
                            <h4>Help Center</h4>
                            <FaChevronDown className="text-white-100 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                        </button>
                        <div className="absolute left-0 mt-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:mt-2 transition-all duration-300 ease-out bg-white border border-gray-200 rounded shadow-md z-10">
                            <ul className="text-sm text-gray-500 w-[130px]">
                                {helpOptions.map((item, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 text-gray-400 text-xs hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="border-r h-4 border-gray-300 mx-4"></div>
                    <button className="cursor-pointer border-gray-300 hover:underline">

                        <h4>Eng</h4>
                    </button>
                    <div className="border-r h-4 border-gray-300 mx-4"></div>
                    <button className="cursor-pointer border-gray-300 hover:underline">
                        <h4>USD</h4>
                    </button>
                    <div className="border-l h-4 border-gray-300 mx-4"></div>
                    <button className="cursor-pointer border-gray-300 hover:underline">
                        <h4>My Account</h4>
                    </button>
                </div>
            </div>

            <div style={{ backgroundColor: searchbackground, color: textColor }} className="flex justify-between gap-3 py-2 h-30 w-80% items-center px-4 md:px-[130px]">

                {/* logo */}
                <div>
                    <Link href={`/${locale}`}>
                        <Image
                            src={logo}
                            alt="logo"
                            width={200}
                            height={43}
                            className="w-[200px] h-auto object-contain"
                        />
                    </Link>
                </div>

                {/* searchbar */}
                <div className="w-[42.5rem] flex items-center">
                    <button className="gap-2 bg-[#F3FAF2] text-gray-900 text-sm h-12 px-6 rounded-l-full border border-gray-300 border-r-0 flex items-center justify-center cursor-pointer hover:bg-gray-100">
                        All Categories<FaChevronDown
                            className="text-white-100 transition-transform duration-300 ease-in-out group-hover:rotate-180"
                        />
                    </button>

                    <div className="relative flex-1 border border-gray-300 h-12 rounded-r-full">
                        <input
                            type="text"
                            placeholder={`${t("searchbarPlaceholder")}`}
                            className="bg-[#F3FAF2] text-gray-900 text-sm h-11 w-full px-4 pr-10 rounded-r-full outline-none placeholder:text-sm"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-[#299e60] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                            <FaSearch size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-evenly gap-3 p-2">
                    {/* language */}
                    <LanguageSwitcher />
                    {/* login */}
                    <button className="md:flex hidden whitespace-nowrap gap-2 border-x-2 border-white px-4 justify-center cursor-pointer hover:text-gray-300">
                        <h4 className="flex items-center gap-2">{t("login")} <FaRegUser size={20} /></h4>
                    </button>
                    {/* wishlist */}
                    <button className="hidden md:block cursor-pointer hover:text-gray-300">
                        <FaRegHeart size={20} />
                    </button>
                    {/* cart */}
                    <button className="hidden md:block cursor-pointer hover:text-gray-300">
                        <FaShoppingCart size={20} />
                    </button>
                </div>

            </div>
            <header
                className={`scroll-mx-130 fixed z-50 w-full flex items-center justify-start gap-6 px-4 md:px-[130px] border-y transition-all duration-250 
                    ${isScrolled ? "top-0 bg-white/95 border-gray-200" : "top-[157px] bg-white border-gray-300 "
                    }`}
            >
                {/* All Categories Dropdown */}
                <div
                    className="relative"
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                >
                    <button className="flex items-center gap-1 text-gray-700 hover:text-black border-x border-gray-300 px-4 h-15">
                        <BiCategory /> All Categories <FaChevronDown className="text-xs" />
                    </button>
                    {showCategories && (
                        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow z-20">
                            {categories.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* All Home Dropdown */}
                <div
                    className="relative"
                    onMouseEnter={() => setShowHome(true)}
                    onMouseLeave={() => setShowHome(false)}
                >
                    <button className="flex items-center gap-1 text-gray-700 hover:text-black">
                        Home <FaChevronDown className="text-xs" />
                    </button>
                    {showHome && (
                        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow z-20">
                            {Home.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Shop Dropdown */}
                <div
                    className="relative"
                    onMouseEnter={() => setShowShop(true)}
                    onMouseLeave={() => setShowShop(false)}
                >
                    <button className="flex items-center gap-1 text-gray-700 hover:text-black">
                        Shop <FaChevronDown className="text-xs" />
                    </button>
                    {showShop && (
                        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow z-20">
                            {Shop.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Pages Dropdown */}
                <div
                    className="relative"
                    onMouseEnter={() => setShowPages(true)}
                    onMouseLeave={() => setShowPages(false)}
                >
                    <button className="flex items-center gap-1 text-gray-700 hover:text-black">
                        Pages <FaChevronDown className="text-xs" />
                    </button>
                    {showPages && (
                        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow z-20">
                            {Pages.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setShowVendors(true)}
                    onMouseLeave={() => setShowVendors(false)}
                >
                    <button className="flex items-center gap-1 text-gray-700 hover:text-black">
                    Vendors <FaChevronDown className="text-xs" />
                    </button>
                    {showVendors && (
                        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow z-20">
                            {Vendors.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setShowBlog(true)}
                    onMouseLeave={() => setShowBlog(false)}
                >
                    <button className="flex items-center gap-1 text-gray-700 hover:text-black">
                    Blog <FaChevronDown className="text-xs" />
                    </button>
                    {showBlog && (
                        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow z-20">
                            {Blog.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="flex items-center gap-1 text-gray-700 hover:text-black">
                    Contact Us
                    </button>
            </header>

        </div>
    );
}