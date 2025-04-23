'use client'
import { FaRegUser } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa6"
import { FaShoppingCart } from "react-icons/fa"
import Image from "next/image"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./language-switcher"

export default function Searchbar() {
    const t = useTranslations('HomePage');
    return (
        <div className="flex items-center gap-2">
            {/* logo */}
            <Image src="/logo/logo-white.webp" alt="logo" width={130} height={32} />
            {/* searchbar */}
            <input type="text" placeholder={`${t("searchbarPlaceholder")}`}
                className="bg-white rounded-sm p-2 mx-2 outline-none w-full" />

            <div className="flex items-center justify-evenly gap-3 p-2">
                {/* language */}
                <LanguageSwitcher />
                {/* login */}
                <button className="whitespace-nowrap text-white flex items-center gap-2 border-x-2 border-white px-4 justify-center w-fit cursor-pointer hover:text-gray-300">
                    <h4>{t("login")}</h4>
                    <FaRegUser size={20} />
                </button>
                {/* wishlist */}
                <button className="text-white cursor-pointer hover:text-gray-300">
                    <FaRegHeart size={20} />
                </button>
                {/* cart */}
                <button className="text-white cursor-pointer hover:text-gray-300">
                    <FaShoppingCart size={20} />
                </button>
            </div>

        </div>
    );
}