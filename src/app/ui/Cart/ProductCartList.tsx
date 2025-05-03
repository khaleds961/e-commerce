import Image from "next/image";
import { useTranslations } from "next-intl";
import { GrTrash } from "react-icons/gr";
import PriceAdjuster from "./PriceAdjuster";
import PriceAdjusterMobile from "./PriceAdjusterMobile";
export default function ProductCartList({ item }: { item: CartItem }) {
    const t = useTranslations('Cart');
    return (
        <div className="rounded-md mb-3">
            {/* bg-[#F7F7FA] */}
            <div className="bg-[#F7F7FA] flex justify-between gap-4 rounded-md">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <Image 
                            src={item.image} 
                            alt={item.title} 
                            // layout="responsive"
                            width={140} 
                            height={140} 
                            className="rounded-md object-contain"
                        />
                        {/* <PriceAdjusterMobile item={item} /> */}
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                        <span className="text-sm">{item.sku}</span>
                        <h3 className="text-md font-bold mb-2">{item.title}</h3>
                        <div className="md:block hidden">
                            <button className="cursor-pointer text-gray-500 text-sm px-2 py-1 rounded-md flex items-center gap-2 border border-gray-500 hover:text-red-500 hover:border-red-500 transition-all duration-300">
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
