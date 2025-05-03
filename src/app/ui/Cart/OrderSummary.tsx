import { useAddToCart } from "@/app/store/addToCart";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
export default function OrderSummary() {
    const { items } = useAddToCart();
    const [subtotal, setSubtotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const t = useTranslations('Cart');
    useEffect(() => {
        setSubtotal(items.reduce((acc, item) => acc + item.price * item.quantity, 0));
        setQuantity(items.reduce((acc, item) => acc + item.quantity, 0));
    }, [items]);
    return (
        <div className="bg-white border border-gray-200 rounded-md p-4">
            <h1 className="text-lg font-bold mb-4">{t('orderSummary')}</h1>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 mb-4">
                    <h2>{t('subtotal')} ({quantity} {t('items')})</h2>
                    <p>{subtotal}$</p>
            </div>
            <div className="flex justify-between items-center pb-2 ">
                <h2>{t('total')}</h2>
                <p>{subtotal}$</p>
            </div>
        </div>
    )
}
