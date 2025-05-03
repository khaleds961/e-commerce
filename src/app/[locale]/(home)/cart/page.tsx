"use client"
import { useTranslations } from "next-intl";
import { useAddToCart } from "@/app/store/addToCart";
import { useEffect, useState } from "react";
import ProductCartList from "@/app/ui/Cart/ProductCartList";
import OrderSummary from "@/app/ui/Cart/OrderSummary";

export default function Cart() {
    const t = useTranslations('Cart');
    const { items } = useAddToCart();
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        setQuantity(items.length > 0 ? items.reduce((acc, item) => acc + item.quantity, 0) : 0);
    }, [items]);

    return (
        <div className="mx-auto px-4 py-8 mt-[50px]">

            <div className="flex items-center mb-2">
                <h1 className="text-2xl font-bold">{t('cart')} </h1>
                <span className="text-md text-gray-500 mx-2">({t('items')} {quantity})</span>
            </div>

            <div className="md:grid grid-cols-4 gap-4">
                {/* products */}
                <div className="col-span-3">
                {items.length > 0 && (
                    items.map((item, index) => (
                        <ProductCartList item={item} key={index} />
                    ))
                    )}
                </div>

                {/* order summary */}
                <div className="col-span-1">
                    <OrderSummary />
                </div>
            </div>
        </div>
    )
}
