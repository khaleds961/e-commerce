'use client'

import { FaRegComments, FaPhoneAlt, FaChevronDown } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { useSiteProperties } from "@/app/store/siteProperties"
import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from "react";
import Link from 'next/link'

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
    const [showHelpDropdownDesktop, setShowHelpDropdownDesktop] = useState(false);
    const [showHelpDropdownMobile, setShowHelpDropdownMobile] = useState(false);
    
    const desktopDropdownRef = useRef<HTMLDivElement>(null);
    const mobileDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
                setShowHelpDropdownDesktop(false);
            }
            if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
                setShowHelpDropdownMobile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const helpOptions = [
        {
            label: "Call Center",
            icon: <FaPhoneAlt className="text-gray-400 text-xs" />,
            onClick: () => console.log("Call Center clicked")
        },
        {
            label: "Live Chat",
            icon: <FaRegComments className="text-gray-400 text-xs" />,
            onClick: () => console.log("Live Chat clicked")
        },
    ];

    const mainLinks = [
        { label: "Become A Seller", onClick: () => console.log("Become A Seller clicked") },
        { label: "About us", onClick: () => console.log("About us clicked") },
        { label: "Free Delivery", onClick: () => console.log("Free Delivery clicked") },
        { label: "Returns Policy", onClick: () => console.log("Returns Policy clicked") }
    ];

    const rightLinks = [
        { label: "Eng", onClick: () => console.log("Language clicked") },
        { label: "USD", onClick: () => console.log("Currency clicked") },
        { label: "My Account", href: "/template-2/account" }
    ];

    return (
        <div style={{ backgroundColor: backgroundColor, color: textColor }}>
            {/* Desktop Version */}
            <div className="hidden md:block">
                <div className="text-white text-sm flex justify-between h-9 w-full max-w-[1800px] mx-auto items-center px-4 lg:px-[130px]">
                    <div className="flex space-x-2">
                        {mainLinks.map((link, index) => (
                            <div key={index} className="flex items-center">
                                <button 
                                    className="cursor-pointer hover:underline whitespace-nowrap px-2 py-1 rounded hover:bg-white/10 transition-colors"
                                    onClick={link.onClick}
                                >
                                    <h4>{link.label}</h4>
                                </button>
                                {index < mainLinks.length - 1 && (
                                    <div className="border-l h-4 border-gray-300 mx-2"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex space-x-4 items-center">
                        <div
                            className="relative group"
                            ref={desktopDropdownRef}
                        >
                            <button
                                className="cursor-pointer hover:underline flex items-center gap-1 whitespace-nowrap px-2 py-1 rounded hover:bg-white/10 transition-colors"
                                type="button"
                                onClick={() => setShowHelpDropdownDesktop(!showHelpDropdownDesktop)}
                                aria-expanded={showHelpDropdownDesktop}
                                aria-haspopup="true"
                            >
                                <h4>Help Center</h4>
                                <FaChevronDown
                                    className={`text-white transition-transform duration-300 ease-in-out ${
                                        showHelpDropdownDesktop ? 'rotate-180' : ''
                                    }`}
                                    size={12}
                                />
                            </button>

                            {showHelpDropdownDesktop && (
                                <div
                                    className="absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-10 w-[150px]"
                                    role="menu"
                                >
                                    <ul className="text-sm text-gray-500">
                                        {helpOptions.map((item, index) => (
                                            <li key={index}>
                                                <button
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                    onClick={item.onClick}
                                                    role="menuitem"
                                                >
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                        <div className="border-r h-4 border-gray-300"></div>
                        
                        {rightLinks.map((link, index) => (
    link.href ? (
        <Link 
            key={index}
            href={`/${locale}${link.href}`}
            className="cursor-pointer hover:underline whitespace-nowrap px-2 py-1 rounded hover:bg-white/10 transition-colors"
        >
            <h4>{link.label}</h4>
        </Link>
    ) : (
        <button 
            key={index} 
            className="cursor-pointer hover:underline whitespace-nowrap px-2 py-1 rounded hover:bg-white/10 transition-colors"
            onClick={link.onClick}
        >
            <h4>{link.label}</h4>
        </button>
    )
))}
                    </div>
                </div>
            </div>

            {/* Mobile Version */}
            <div className="md:hidden">
                <div className="flex justify-between items-center h-12 px-4">
                    <button
                        className="text-white p-2 rounded hover:bg-white/10"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        aria-label="Toggle mobile menu"
                        aria-expanded={showMobileMenu}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {showMobileMenu && (
                    <div className="bg-gray-800 text-white px-4 py-2" ref={mobileDropdownRef}>
                        <div className="flex flex-col space-y-3">
                            {mainLinks.map((link, index) => (
                                <button 
                                    key={index} 
                                    className="cursor-pointer hover:underline text-left py-2 px-2 rounded hover:bg-white/10"
                                    onClick={link.onClick}
                                >
                                    <h4>{link.label}</h4>
                                </button>
                            ))}

                            <div className="pt-2 border-t border-gray-700">
                                <button
                                    className="cursor-pointer hover:underline flex items-center justify-between w-full py-2 px-2 rounded hover:bg-white/10"
                                    onClick={() => setShowHelpDropdownMobile(!showHelpDropdownMobile)}
                                    type="button"
                                    aria-expanded={showHelpDropdownMobile}
                                >
                                    <h4>Help Center</h4>
                                    <FaChevronDown
                                        className={`transition-transform duration-300 ease-in-out ${
                                            showHelpDropdownMobile ? 'rotate-180' : ''
                                        }`}
                                        size={12}
                                    />
                                </button>
                                {showHelpDropdownMobile && (
                                    <div className="pl-4 space-y-2 mt-1">
                                        {helpOptions.map((item, index) => (
                                            <button
                                                key={index}
                                                className="w-full text-left flex items-center gap-2 py-2 px-2 rounded hover:bg-white/10"
                                                onClick={item.onClick}
                                            >
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="pt-2 border-t border-gray-700 space-y-2">
                                {rightLinks.map((link, index) => (
                                    <button 
                                        key={index} 
                                        className="cursor-pointer hover:underline w-full text-left py-2 px-2 rounded hover:bg-white/10"
                                        onClick={link.onClick}
                                    >
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