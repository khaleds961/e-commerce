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
        <div className="relative h-[270px] mt-10 rounded-2xl">
            {/* Background container - rounded corners only affect the image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
                <Image
                    src={deliveryBannerData.backgroundImage}
                    alt="Delivery Banner Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Semi-transparent overlay - no overflow-hidden here */}
            <div className="absolute inset-0 bg-[#359FC1]/80 flex items-center justify-center px-4 z-10 rounded-2xl">
                {/* Left decorative image - positioned outside clipped area */}
                <div className="absolute -bottom-10 hidden md:block left-6 z-20">
                    <Image
                        src={deliveryBannerData.leftImage}
                        alt="Delivery Man"
                        width={250}
                        height={250}
                        className="object-contain w-[250px]"
                    />
                </div>

                {/* Right decorative image */}
                <div className="absolute hidden md:block right-8 z-20 bottom-0">
                    <Image
                        src={deliveryBannerData.rightImage}
                        alt="Special Snacks"
                        width={400}
                        height={180}
                        className="object-contain"
                    />
                </div>

                {/* Main content */}
                <div className="text-white text-center max-w-2xl z-30">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">
                        {deliveryBannerData.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-4">
                        {deliveryBannerData.subtitle}
                    </p>
                    <a href={deliveryBannerData.buttonLink}>
                        <button className="bg-[#1f52cc] hover:bg-[#359FC1] text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                            {deliveryBannerData.buttonText} 
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}