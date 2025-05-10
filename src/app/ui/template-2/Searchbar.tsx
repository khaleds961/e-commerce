'use client'
import { FaRegUser, FaRegHeart, FaShoppingCart, FaSearch, FaChevronDown, FaBars } from "react-icons/fa"
import Image from "next/image"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./LanguageSwitcher"
import { useSiteProperties } from "@/app/store/siteProperties"
import Link from "next/link"
import { useLocale } from 'next-intl';
import { useState } from "react";

interface SearchbarProps {
    siteProperties: {
        logo: string;
        backgroundColor: string;
        textColor: string;
    };
}

export default function Searchbar({ siteProperties }: SearchbarProps) {
    const t = useTranslations('HomePage');
    const { logo, backgroundColor, textColor } = useSiteProperties();
    const locale = useLocale();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    return (
        <div style={{ backgroundColor: backgroundColor, color: textColor }}>
            {/* Desktop Header */}
            <div style={{ backgroundColor: textColor }} className="hidden md:flex justify-between items-center py-2 px-4 lg:px-[130px]">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href={`/${locale}`}>
                        <Image
                            src={logo}
                            alt="logo"
                            width={200}
                            height={43}
                            className="w-[120px] lg:w-[200px] h-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-2xl xl:max-w-3xl mx-4 flex items-center">
                    <div className="relative flex w-full">
                        <button 
                            className="gap-2 bg-[#F3FAF2] text-gray-900 text-sm h-12 px-4 lg:px-6 rounded-l-full border border-gray-300 border-r-0 flex items-center justify-center cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                            onClick={() => setShowCategories(!showCategories)}
                        >
                            All Categories
                            <FaChevronDown className={`ml-1 transition-transform duration-300 ${showCategories ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <div className="relative flex-1 border border-gray-300 h-12 rounded-r-full">
                            <input
                                type="text"
                                placeholder={`${t("searchbarPlaceholder")}`}
                                className="bg-[#F3FAF2] text-gray-900 text-sm h-full w-full px-4 pr-10 rounded-r-full outline-none placeholder:text-sm"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-[#299e60] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                                <FaSearch size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center justify-end space-x-4">
                    <LanguageSwitcher />
                    <button className="flex whitespace-nowrap gap-2 border-x-2 border-white px-4 justify-center cursor-pointer hover:text-gray-300">
                        <span className="hidden lg:inline">{t("login")}</span>
                        <FaRegUser size={20} />
                    </button>
                    <button className="cursor-pointer hover:text-gray-300">
                        <FaRegHeart size={20} />
                    </button>
                    <button className="cursor-pointer hover:text-gray-300">
                        <FaShoppingCart size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile Header */}
            <div style={{ backgroundColor: textColor }} className="md:hidden flex justify-between items-center py-3 px-4">
                {/* Mobile Menu Button */}
                <button 
                    className="text-white"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    <FaBars size={20} />
                </button>

                {/* Mobile Logo */}
                <Link href={`/${locale}`} className="mx-auto">
                    <Image
                        src={logo}
                        alt="logo"
                        width={120}
                        height={30}
                        className="w-[120px] h-auto object-contain"
                    />
                </Link>

                {/* Mobile Cart Icon */}
                <div className="flex items-center space-x-3">
                    <button className="cursor-pointer hover:text-gray-300">
                        <FaShoppingCart size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile Search (shown below header) */}
            <div className="md:hidden px-4 py-2">
                <div className="relative flex w-full">
                    <input
                        type="text"
                        placeholder={`${t("searchbarPlaceholder")}`}
                        className="bg-[#F3FAF2] text-gray-900 text-sm h-12 w-full px-4 pr-12 rounded-full outline-none placeholder:text-sm border border-gray-300"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-[#299e60] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                        <FaSearch size={14} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {showMobileMenu && (
                <div className="md:hidden bg-gray-800 text-white px-4 py-2">
                    <div className="flex flex-col space-y-4">
                        <button className="flex items-center gap-2 py-2">
                            <FaRegUser size={18} />
                            <span>{t("login")}</span>
                        </button>
                        <button className="flex items-center gap-2 py-2">
                            <FaRegHeart size={18} />
                            <span>Wishlist</span>
                        </button>
                        <div className="py-2">
                            <LanguageSwitcher mobile />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}