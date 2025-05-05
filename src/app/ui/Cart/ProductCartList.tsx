import Image from "next/image";
import { useTranslations } from "next-intl";
import { GrTrash } from "react-icons/gr";
import PriceAdjuster from "./PriceAdjuster";
import PriceAdjusterMobile from "./PriceAdjusterMobile";
import { useAddToCart } from '@/app/store/addToCart';
import CustomImage from "@/app/components/CustomImage";
import { useState } from "react";
export default function ProductCartList({ item }: { item: CartItem }) {
    const t = useTranslations('Cart');
    const [loading, setLoading] = useState(false);
    const { removeItem } = useAddToCart();
    const handleRemove = async () => {
        setLoading(true); 
        removeItem(item);
        setLoading(false);
    };
    return (
        <div className="md:rounded-md mb-3">
            <div className="bg-[#F7F7FA] flex justify-between gap-4 rounded-t-md md:rounded-md">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <CustomImage src={item.image} alt={item.title} width={140} height={140} className="rounded-t-md md:rounded-md object-contain" />
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                        <span className="text-sm">{item.sku}</span>
                        <h3 className="text-md font-bold mb-2">{item.title}</h3>
                        <div className="md:block hidden">
                            <button className="cursor-pointer text-gray-500 text-sm px-2 py-1 rounded-md flex items-center gap-2 border border-gray-500 hover:text-red-500 hover:border-red-500 transition-all duration-300" 
                            onClick={handleRemove}
                            disabled={loading}>
                                <span>{t('remove')}</span>
                                <GrTrash />
                            </button>
                        </div>

                    </div>

                </div>

                <div >
                    <PriceAdjuster item={item} />
                </div>
            </div>

            <div>
                <PriceAdjusterMobile item={item} />
            </div>
        </div>
    )
}
