'use client'
import { useTranslations } from "next-intl";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { useEffect, useState } from "react";
import { handleAddToCart } from "@/app/utils/addToCart";
import CustomImage from "@/app/components/CustomImage";
import LoadingIndicator from "@/app/[locale]/(home)/loading-indicator";
import Link from "next/link";
import { useAddToCart } from "@/app/store/addToCart";
import { formatProductName } from "@/app/utils/formatProductName";
import { handleAddToWishlist } from "@/app/utils/addToWishlist";
import { useAddToWishList } from "@/app/store/addToWishList";

export default function ProductList({ product }: { product: Product }) {
    const t = useTranslations('Cart');
    const [isLoading, setIsLoading] = useState(false);
    const [checkItemQ, setCheckItemQ] = useState(false);
    const { items } = useAddToCart();
    const checkItem = items.find((item) => item.id === product.id);
    const quantity = checkItem ? checkItem.quantity : 0;
    const lorem = 'Lorem ipsum dolor sit amet consectetur ';

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
        handleAddToWishlist(product, 1, '14', 'red', t);
    }

    return (
        <div className="md:rounded-md mb-3">
            <Link href={`/products/${product.slug}`} prefetch={false}>
                <div className="bg-[#F7F7FA] h-[180px] max-h-[180px] flex justify-between gap-4 rounded-t-md md:rounded-md">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 relative">
                            <CustomImage src={product.images[0]} alt={product.title} width={180} height={180} className="rounded-t-md md:rounded-md object-cover" />
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <LoadingIndicator />
                            </div>
                            {!checkWishlistItem && (
                                <button className="absolute top-2 right-2" onClick={(e) => onAddToWishlist(e)}>
                                    <IoMdHeartEmpty size={30} className="cursor-pointer text-white bg-[#363842] rounded-full p-1 hover:bg-[#808080]" />
                                </button>
                            )}
                        </div>
                        <article className="p-4 flex flex-col overflow-hidden">
                            <span className="text-sm">{product.sku}</span>
                            <h3 className="text-md font-bold mb-2">{formatProductName(product.title, 20)}</h3>
                            <p className="text-sm mb-1">{formatProductName(product.description + lorem, 500)}</p>
                        </article>

                    </div>

                    <div>
                        <div className='gap-2 h-full p-4'>
                            <div className='flex flex-col items-end justify-between h-full'>
                                <h3 className="text-lg font-bold mb-2">{product.price}$</h3>

                                {/* price adjuster */}
                                <div className="flex items-center justify-between bg-gray-100">
                                    <button className={`cursor-pointer bg-[#2667ff] text-white rounded-md p-2`}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
