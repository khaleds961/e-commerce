import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { formatProductName } from "@/app/utils/formatProductName";


export default function ProductCard({product}: {product: Product}) {
    return (
        <div className="bg-[#F7F8F7] rounded-md relative w-[200px] max-w-[200px] flex flex-col my-5">
            <div className="absolute top-2 right-2">                        
                <IoMdHeartEmpty size={30} className="cursor-pointer text-white bg-[#363842] rounded-full p-1" />
            </div>
            <div className="m-0 p-0 flex items-center justify-center">
                <Image src={product.images[0]} alt="perfume-product" width={200} height={200} className="rounded-t-md object-contain max-w-[200px] w-auto h-auto" />
            </div>
            <h3 className="p-2 text-sm font-[300] mt-4 mb-1" title={product.title}>{formatProductName(product.title)}</h3>
            <div className="p-2 flex items-center gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CiStar key={index} className="text-yellow-500" />
                ))}
            </div>
            <div className="p-2 mb-2 flex items-center">
                <p className="p-1 bg-[#F0FFFF] text-[#102B6B] rounded-md font-[300] line-through">$100</p>
                <span className="p-1 bg-[#F0FFFF] text-[#102B6B] rounded-md mx-2">10%</span>
            </div>
            <div className="p-2 font-bold text-2xl">
                <p>${product.price}</p>
            </div>
            <button className="cursor-pointer absolute bottom-2 right-2 bg-[#2667ff] text-white rounded-md p-2">
                <LuShoppingCart className="text-2xl" />
            </button>
        </div>
    )
}
