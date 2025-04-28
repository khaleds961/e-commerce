'use client'
import { FaRegUser } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa6"
import { FaSearch, FaShoppingCart } from "react-icons/fa"
import Image from "next/image"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./LanguageSwitcher"
import { useSiteProperties } from "@/app/store/siteProperties"

export default function Searchbar() {
    const t = useTranslations('HomePage');
    const { logo, backgroundColor, textColor } = useSiteProperties();

    return (
        <div style={{ backgroundColor: backgroundColor, color: textColor }}>
        <div className="flex items-center justify-between gap-3 py-2 px-2 md:px-[40px]">
            {/* logo */}
            <div>
                <Image
                    src={logo}
                    alt="logo"
                    width={100}
                    height={64}
                    className="w-[100px] h-auto object-contain"
                />
            </div>
            
            {/* searchbar */}
            <div className="w-full relative">
                <input type="text" placeholder={`${t("searchbarPlaceholder")}`}
                    className="bg-white text-gray-500 rounded-sm p-2 mx-2 outline-none w-full placeholder:text-sm" />
            </div>

            <div className="flex items-center justify-evenly gap-3 p-2">
                {/* language */}
                <LanguageSwitcher />
                {/* login */}
                <button className="hidden md:block whitespace-nowrap flex gap-2 border-x-2 border-white px-4 justify-center cursor-pointer hover:text-gray-300">
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
        </div>
    );
}