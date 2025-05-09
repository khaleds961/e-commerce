import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Advertisement() {
    const t = useTranslations('HomePage');
    return (
        <div className="bg-gray-100 my-[70px] rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                <div className="rounded-md p-4 md:p-10 flex flex-col justify-center">
                    <p className="text-md md:text-xl font-bold mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                    <p className="text-xs md:text-sm text-gray-500 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                    <button className="cursor-pointer w-fit bg-blue-500 text-white px-4 py-2 rounded-4xl">{t("readMore")}</button>
                </div>
                <div className="rounded-md p-4 relative hidden md:block">
                    <Image src="/images/man-shop.png" alt="Advertisement" width={250} height={250}
                        className="absolute right-[20%] top-[-15%] lg:top-[-25%]" />
                </div>
            </div>
        </div>
    );
}
