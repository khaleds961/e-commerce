'use client'

import { FaRegComments } from "react-icons/fa"
import { FaPhoneAlt } from "react-icons/fa"
import { FaChevronDown } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { useSiteProperties } from "@/app/store/siteProperties"
import { useLocale } from 'next-intl';


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
                        <button className="cursor-pointer border-gray-300 hover:underline">
                            <h4>My Account</h4>
                        </button>
                    </div>
                </div>
            </div>
        );
    }