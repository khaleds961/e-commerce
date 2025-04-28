import { useTranslations } from "next-intl";
import Image from "next/image";

export default function MegaPromotion() {
    const t = useTranslations('HomePage');
    return (
        <div className="mt-10">
            <h1 className="text-xl md:text-xl font-bold py-4 bg-primary">{t('megaPromotion')}</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {/* First column with two stacked images */}
                <div className="flex flex-col gap-2">
                    <div className="rounded-md overflow-hidden w-full flex-1 cursor-pointer">
                        <img src="/images/sale.jpg" alt="Promo 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-md overflow-hidden w-full flex-1 cursor-pointer">
                        <img src="/images/sale.jpg" alt="Promo 2" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Second column - single image on large screens, stacked on small/medium */}
                <div className="flex flex-col gap-2 lg:block">
                    <div className="rounded-md overflow-hidden w-full flex-1 lg:h-full cursor-pointer">
                        <img src="/images/sale2.jpg" alt="Promo 3" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-md overflow-hidden w-full flex-1 lg:hidden cursor-pointer">
                        <img src="/images/sale1.webp" alt="Promo 4 (small/medium only)" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Third column - only visible on large screens */}
                <div className="hidden lg:block rounded-md overflow-hidden w-full h-full cursor-pointer">
                    <img src="/images/sale1.webp" alt="Promo 4" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}
