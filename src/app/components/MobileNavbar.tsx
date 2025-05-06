"use client";
import { TbCategory2 } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import ScrollAwareComponent from "@/app/components/ScrollAware";
import { IoHomeOutline } from "react-icons/io5";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteProperties } from "../store/siteProperties";
import { useEffect, useState } from "react";
import { useAddToCart } from "../store/addToCart";

export default function MobileNavbar() {
    const t = useTranslations('HomePage');
    const pathname = usePathname();
    const locale = useLocale();
    const { backgroundColor, textColor } = useSiteProperties();
    const { items } = useAddToCart();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(items.length > 0 ? items.reduce((acc, item) => acc + item.quantity, 0) : 0);
    }, [items]);

    const isActive = (path: string) => pathname === path;
    return (
        <ScrollAwareComponent className="fixed bottom-0 left-0 w-full z-50">
            <div className="w-full h-16 bg-white border-t border-gray-200 md:hidden">
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    <Link href="/" className="inline-flex flex-col items-center justify-center px-5" prefetch={false}>
                        <IoHomeOutline size={25} className="mb-1" style={{ color: isActive(`/${locale}`) ? backgroundColor : 'text-gray-500' }} />
                        <span className="text-sm text-gray-500">{t('home')}</span>
                    </Link>
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5">
                        <TbCategory2 size={25} className="mb-1" />
                        <span className="text-sm text-gray-500">{t('categories')}</span>
                    </button>
                    <Link type="button" href="/cart" prefetch={false} className="inline-flex flex-col items-center justify-center px-5 relative">
                        <FaCartShopping size={25} className='mb-1' style={{ color: isActive(`/${locale}/cart`) ? backgroundColor : 'text-gray-500' }} />
                        {quantity > 0 && (
                            <span className="absolute top-[12px] right-[30px] inline-flex items-center justify-center w-[20px] h-[20px] text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                            >
                                {quantity}
                            </span>
                        )}
                        <span className="text-sm text-gray-500">{t('cart')}</span>
                    </Link>
                    <Link type="button" href="/profile" prefetch={false}
                        className="inline-flex flex-col items-center justify-center px-5"
                        style={{ color: isActive(`/${locale}/profile`) ? backgroundColor : 'text-gray-500' }}
                    >
                        <FaUserCircle size={25} className="mb-1" />
                        <span className="text-sm text-gray-500">{t('profile')}</span>
                    </Link>
                </div>
            </div>
        </ScrollAwareComponent>

    )
}
