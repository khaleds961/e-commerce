'use client'

import { FaRegComments, FaPhoneAlt, FaChevronDown } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { useSiteProperties } from "@/app/store/siteProperties"
import { useLocale } from 'next-intl';
import { useState } from "react";

interface TopmenuProps {
    siteProperties: {
        color: string;
        fontFamily: string;
        backgroundColor: string;
        logo: string;
    };
}

export default function Topmenu({ siteProperties }: TopmenuProps) {
    const t = useTranslations('HomePage');
    const { logo, backgroundColor, textColor } = useSiteProperties();
    const locale = useLocale();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showHelpDropdown, setShowHelpDropdown] = useState(false);

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

    const mainLinks = [
        { label: "Become A Seller" },
        { label: "About us" },
        { label: "Free Delivery" },
        { label: "Returns Policy" }
    ];

    const rightLinks = [
        { label: "Eng" },
        { label: "USD" },
        { label: "My Account" }
    ];

    return (
        <div style={{ backgroundColor: backgroundColor, color: textColor }}>
            {/* Desktop Version */}
            <div className="hidden md:block">
                <div className="text-white text-sm flex justify-between h-9 w-full max-w-[1800px] mx-auto items-center px-4 lg:px-[130px]">
                    <div className="flex space-x-2">
                        {mainLinks.map((link, index) => (
                            <div key={index} className="flex items-center">
                                <button className="cursor-pointer hover:underline whitespace-nowrap">
                                    <h4>{link.label}</h4>
                                </button>
                                {index < mainLinks.length - 1 && (
                                    <div className="border-l h-4 border-gray-300 mx-4"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex space-x-4 items-center">
                        <div className="relative group">
                            <button 
                                className="cursor-pointer hover:underline flex items-center gap-2 whitespace-nowrap"
                                onMouseEnter={() => setShowHelpDropdown(true)}
                                onMouseLeave={() => setShowHelpDropdown(false)}
                            >
                                <h4>Help Center</h4>
                                <FaChevronDown className="text-white-100 transition-transform duration-300 ease-in-out" />
                            </button>
                            {showHelpDropdown && (
                                <div 
                                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md z-10"
                                    onMouseEnter={() => setShowHelpDropdown(true)}
                                    onMouseLeave={() => setShowHelpDropdown(false)}
                                >
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
                            )}
                        </div>
                        <div className="border-r h-4 border-gray-300"></div>
                        {rightLinks.map((link, index) => (
                            <button key={index} className="cursor-pointer hover:underline whitespace-nowrap">
                                <h4>{link.label}</h4>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Version */}
            <div className="md:hidden">
                <div className="flex justify-between items-center h-12 px-4">
                    <button 
                        className="text-white"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {showMobileMenu && (
                    <div className="bg-gray-800 text-white px-4 py-2">
                        <div className="flex flex-col space-y-3">
                            {mainLinks.map((link, index) => (
                                <button key={index} className="cursor-pointer hover:underline text-left py-1">
                                    <h4>{link.label}</h4>
                                </button>
                            ))}
                            
                            <div className="pt-2 border-t border-gray-700">
                                <button 
                                    className="cursor-pointer hover:underline flex items-center justify-between w-full py-1"
                                    onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                                >
                                    <h4>Help Center</h4>
                                    <FaChevronDown className={`transition-transform duration-300 ${showHelpDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showHelpDropdown && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {helpOptions.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 py-1"
                                            >
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="pt-2 border-t border-gray-700 space-y-2">
                                {rightLinks.map((link, index) => (
                                    <button key={index} className="cursor-pointer hover:underline w-full text-left py-1">
                                        <h4>{link.label}</h4>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}