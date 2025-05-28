'use client';
import Image from 'next/image';

const deliveryBannerData = {
    backgroundImage: '/images/delivery-bg.png',
    leftImage: '/images/delivery-man.png',
    rightImage: '/images/special-snacks-img.png',
    title: 'We Deliver on Next Day from 10:00 AM to 08:00 PM',
    subtitle: 'For Orders Starting from $100',
    buttonText: 'Shop Now →',
    buttonLink: '/shop',
};

export default function DeliveryBanner() {
    return (
        <div className="relative h-[180px] sm:h-[220px] md:h-[270px] mt-6 md:mt-10 rounded-xl md:rounded-2xl">
            {/* Background container */}
            <div className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden z-0">
                <Image
                    src={deliveryBannerData.backgroundImage}
                    alt="Delivery Banner Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-[#359FC1]/80 flex items-center justify-center px-4 z-10 rounded-xl md:rounded-2xl">
                {/* Left decorative image - hidden on mobile */}
                <div className="absolute -bottom-6 md:-bottom-10 left-2 md:left-6 z-20 hidden sm:block">
                    <Image
                        src={deliveryBannerData.leftImage}
                        alt="Delivery Man"
                        width={150}
                        height={150}
                        className="object-contain w-[120px] sm:w-[150px] md:w-[200px] lg:w-[250px]"
                    />
                </div>

                {/* Right decorative image - hidden on mobile */}
                <div className="absolute right-2 md:right-8 z-20 bottom-0 hidden sm:block">
                    <Image
                        src={deliveryBannerData.rightImage}
                        alt="Special Snacks"
                        width={300}
                        height={135}
                        className="object-contain w-[180px] sm:w-[220px] md:w-[300px] lg:w-[400px]"
                    />
                </div>

                {/* Main content */}
                <div className="text-white text-center max-w-xs sm:max-w-sm md:max-w-2xl z-30 px-2 sm:px-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                        {deliveryBannerData.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-4">
                        {deliveryBannerData.subtitle}
                    </p>
                    <a href={deliveryBannerData.buttonLink}>
                        <button className="bg-[#1f52cc] hover:bg-[#359FC1] text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base rounded-full font-semibold transition-colors duration-300">
                            {deliveryBannerData.buttonText}
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}