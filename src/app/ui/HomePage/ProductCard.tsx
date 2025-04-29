import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { formatProductName } from "@/app/utils/formatProductName";
import { useLocale } from 'next-intl';
import Link from "next/link";

export default function ProductCard({product}: {product: Product}) {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    return (
        <Link href={`/${locale}/products/${product.slug}`}>
        <div className="bg-[#F7F8F7] rounded-md relative w-[100%] max-w-[200px] flex flex-col my-5 cursor-pointer hover:scale-105 transition-all duration-300">
            <div className="absolute top-2 right-2">                        
                <IoMdHeartEmpty size={30} className="cursor-pointer text-white bg-[#363842] rounded-full p-1" />
            </div>
            <div className="m-0 p-0 flex items-center justify-center w-full h-auto">
                <Image 
                    src={product.images[0]} 
                    alt="perfume-product" 
                    width={200} 
                    height={200} 
                    className="rounded-t-md object-contain w-full h-full" 
                />
            </div>
            <h3 className="px-2 text-sm font-[300] mt-2 h-[50px]" title={product.title}>{formatProductName(product.title,25)}</h3>
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
            <button className={`cursor-pointer absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} bg-[#2667ff] text-white rounded-md p-2`}>
                <LuShoppingCart className="text-xl xl:text-2xl" />
            </button>
        </div>
        </Link>
    )
}
