"use client";
import Image from "next/image";
import { FaRegHeart, FaRegUser, FaShoppingCart } from "react-icons/fa";
import LanguageSwitcher from "./language-switcher";
import { useTranslation } from "react-i18next";


export default function Header() {
    const { t } = useTranslation();
    return (
        <div className="bg-[#BE1C26] p-3">
            <div className="flex items-center gap-2">
                {/* logo */}
                <Image src="/logo/logo-white.webp" alt="logo" width={130} height={32} />
                {/* searchbar */}
                <input type="text" placeholder="What are you looking for?"
                    className="bg-white rounded-sm p-2 mx-2 outline-none w-full" />

                <div className="flex items-center justify-between gap-3 p-2 bg-green-500 w-[40%]">
                    {/* language */}
                    <LanguageSwitcher />
                    {/* login */}
                    <button className="text-white flex items-center gap-2 border-x-2 border-white px-4 justify-center w-[130px]">
                        <span>{t("login")}</span>
                        <FaRegUser size={20} />
                    </button>
                    {/* wishlist */}
                    <button className="text-white">
                        <FaRegHeart size={20} />
                    </button>
                    {/* cart */}
                    <button className="text-white">
                        <FaShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
