import Image from "next/image";

export default function MegaPromotion() {
    return (
        <div className="bg-gray-100 mt-10 px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center py-4">Mega Promotion</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left column with two stacked images */}
                <div className="flex flex-col gap-4">
                    <div className="bg-green-500 rounded-md overflow-hidden w-full aspect-[6/5]">
                        {/* Place Image here */}
                        <img src="/images/sale.jpg" alt="Promo 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-green-500 rounded-md overflow-hidden w-full aspect-[6/5]">
                        <img src="/images/sale.jpg" alt="Promo 2" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Middle full-height image */}
                <div className="bg-green-500 rounded-md overflow-hidden w-full aspect-[6/10]">
                    <img src="/images/sale2.jpg" alt="Promo 3" className="w-full h-full object-cover" />
                </div>

                {/* Right full-height image */}
                <div className="bg-green-500 rounded-md overflow-hidden w-full aspect-[6/10]">
                    <img src="/images/sale1.webp" alt="Promo 4" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>

    );
}
