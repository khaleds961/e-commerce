"use client"
import { useTranslations } from "next-intl";
import { useAddToCart } from "@/app/store/addToCart";
import { useEffect, useState } from "react";
import ProductCartList from "@/app/ui/Cart/ProductCartList";
import OrderSummary from "@/app/ui/Cart/OrderSummary";
import EmptyCart from "@/app/ui/Cart/EmptyCart";
import CartLoading from "@/app/ui/Cart/CartLoading";

export default function Cart() {
    const t = useTranslations('Cart');
    const { items } = useAddToCart();
    const [quantity, setQuantity] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setQuantity(items.length > 0 ? items.reduce((acc, item) => acc + item.quantity, 0) : 0);
        setIsLoading(false);
    }, [items]);

    return (
        <div className="mx-auto px-4 py-8 mt-[50px]">
            {isLoading ? (
                <div>
                    <CartLoading />
                </div>
            ) : items.length > 0 ? (
                <>
                    <div className="flex items-center mb-2">
                        <h1 className="text-2xl font-bold">{t('cart')} </h1>
                        <span className="text-md text-gray-500 mx-2">({t('items')} {quantity})</span>
                    </div>

                    <div className="md:grid grid-cols-6 gap-4">
                        {/* products */}
                        <div className="col-span-4">
                            {items.map((item, index) => (
                                <ProductCartList item={item} key={index} />
                            ))}
                        </div>

                        {/* order summary */}
                        <div className="col-span-2">
                            <OrderSummary />
                        </div>
                    </div>

                </>
            ) : (
                <EmptyCart />
            )
            }
        </div >
    )
}
