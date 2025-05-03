'use client'
import { FaRegUser } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa6"
import { FaShoppingCart } from "react-icons/fa"
import { FaSearch } from "react-icons/fa"
import Image from "next/image"
import { FaChevronDown } from "react-icons/fa"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./LanguageSwitcher"
import { useSiteProperties } from "@/app/store/siteProperties"
import Link from "next/link"
import { useLocale } from 'next-intl';


    interface SearchbarProps {
        siteProperties: {
            logo: string;
            backgroundColor: string;
            textColor: string;
        };
    }

    export default function Searchbar({ siteProperties }: SearchbarProps){
    const t = useTranslations('HomePage');
    const { logo, backgroundColor, textColor } = useSiteProperties();
    const locale = useLocale();
    return (
        <div style={{ backgroundColor: backgroundColor, color: textColor }}>

            <div style={{ backgroundColor: textColor }} className="flex justify-between gap-3 py-2 h-30 w-80% items-center px-4 md:px-[130px]">

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


        </div>
    );
}