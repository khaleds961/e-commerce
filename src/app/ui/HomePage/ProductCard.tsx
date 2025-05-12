'use client'
import { useTranslations } from "next-intl";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { formatProductName } from "@/app/utils/formatProductName";
import { useLocale } from 'next-intl';
import Link from "next/link";
import { useEffect, useState } from "react";
import { handleAddToCart } from "@/app/utils/addToCart";
import { handleAddToWishlist } from "@/app/utils/addToWishlist";
import CustomImage from "@/app/components/CustomImage";
import LoadingIndicator from "@/app/[locale]/(home)/loading-indicator";
import { useAddToCart } from "@/app/store/addToCart";
import { useAddToWishList } from "@/app/store/addToWishList";

export default function ProductCard({ product }: { product: Product }) {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const t = useTranslations('Product');
    const [isLoading, setIsLoading] = useState(false);

    const [checkItemQ, setCheckItemQ] = useState(false);
    const { items } = useAddToCart();
    const checkItem = items.find((item) => item.id === product.id);
    const quantity = checkItem ? checkItem.quantity : 0;

    const { items: wishlistItems } = useAddToWishList();
    const checkWishlistItem = wishlistItems.find((item: CartItem) => item.id === product.id);

    const onAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        handleAddToCart(product, 1, '14', 'red', t);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    useEffect(() => {
        if (quantity > 0) {
            setCheckItemQ(true);
        }
    }, [quantity])

    const onAddToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // setIsLoading(true);
        handleAddToWishlist(product, 1, '14', 'red', t);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    return (

        <div className="bg-[#F7F8F7] rounded-md relative w-[100%] max-w-[200px] flex flex-col cursor-pointer hover:scale-105 transition-all duration-300">
            <Link href={`/products/${product.slug}`} prefetch={false}>
                <div className="m-0 p-0 flex items-center justify-center w-full h-auto">
                    <CustomImage
                        src={product.images[0]}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="rounded-t-md object-contain w-full h-full"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <LoadingIndicator />
                    </div>
                </div>
                <h3 className="px-2 text-sm font-[300] mt-2 h-[50px]" title={product.title}>{formatProductName(product.title, 25)}</h3>
                <div className="p-2 flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CiStar key={index} className="text-yellow-500" />
                    ))}
                </div>
                <div className="px-2 flex items-center">
                    <p className="p-1 bg-[#F0FFFF] text-[#102B6B] rounded-md font-[300] line-through">$100</p>
                    <span className="p-1 bg-[#F0FFFF] text-[#102B6B] rounded-md mx-2">10%</span>
                </div>
                <div className="p-2 font-bold text-xl md:text-2xl">
                    <p>${product.price}</p>
                </div>
                <button className={`cursor-pointer absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} bg-[#2667ff] text-white rounded-md p-2`}
                    onClick={onAddToCart}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="spinner"></div>
                    ) : (
                        checkItemQ ? (
                            <div className="relative">
                                <LuShoppingCart className="text-xl xl:text-2xl" />
                                <span className="absolute top-[-10px] right-[-15px] bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                                    {quantity}
                                </span>
                            </div>
                        ) : (
                            <LuShoppingCart className="text-xl xl:text-2xl" />
                        )
                    )}
                </button>
            </Link>
            {!checkWishlistItem && (
                <button className="absolute top-2 right-2 bg-[#363842] hover:bg-[#808080] rounded-full p-1" onClick={(e) => onAddToWishlist(e)}>
                    <IoMdHeartEmpty size={30} className="cursor-pointer text-white rounded-full p-1" />
                </button>
            )}
        </div >
    )
}
