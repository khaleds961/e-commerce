"use client"
import { useTranslations } from "next-intl";
import { useAddToCart } from "@/app/store/addToCart";
import { useEffect, useState } from "react";
import ProductCartList from "@/app/ui/Cart/ProductCartList";
import OrderSummary from "@/app/ui/Cart/OrderSummary";
import EmptyCart from "@/app/ui/Cart/EmptyCart";
import CartLoading from "@/app/ui/Cart/CartLoading";
import { useAddToWishList } from "@/app/store/addToWishList";
import EmptyWishlist from "@/app/ui/Wishlist/EmptyWishlist";
export default function Wishlist() {

    const t = useTranslations('Wishlist');
    const { items: wishlistItems } = useAddToWishList();
    const [quantity, setQuantity] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setQuantity(wishlistItems.length > 0 ? wishlistItems.reduce((acc, item) => acc + item.quantity, 0) : 0);
        setIsLoading(false);
    }, [wishlistItems]);

    return (
        <div className="mx-auto px-4 py-8 mt-[50px]">
            {isLoading ? (
                <div>
                    <CartLoading />
                </div>
            ) : wishlistItems.length > 0 ? (
                <>
                    <div className="flex items-center mb-2">
                        <h1 className="text-2xl font-bold">{t('wishlist')} </h1>
                        <span className="text-md text-gray-500 mx-2">({quantity} {t('items')})</span>
                    </div>

                    <div className="md:grid grid-cols-6 gap-4">
                        {/* products */}
                        <div className="col-span-4">
                            {wishlistItems.map((item, index) => (
                                <ProductCartList item={item} key={index} wishlist={true} />
                            ))}
                        </div>
                    </div>

                </>
            ) : (
                <EmptyWishlist />
            )
            }
        </div >
    )
}
