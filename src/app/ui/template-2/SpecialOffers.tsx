import React from "react";

const offers = [
    {
        id: 1,
        mainImage: "/images/offer-shape.png",
        logo: "/images/offer-logo.png",
        text: "Special Deal 1",
        description: "Get 50% off on your first order!",
        leftImage: "/images/offer-img2.png",
    },
    {
        id: 2,
        mainImage: "/images/offer-shape.png",
        logo: "/images/offer-logo.png",
        text: "Exclusive Offer 2",
        description: "Limited time offer only for today!",
        leftImage: "/images/offer-img2.png",
    },
];

const SpecialOfferComponent = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 pt-10 sm:pt-16 md:pt-20 px-4 sm:px-6">
            {offers.map((offer) => (
                <div
                    key={offer.id}
                    className="relative w-full md:w-1/2 rounded-xl md:rounded-2xl overflow-hidden shadow-md md:shadow-lg"
                >
                    <div className="relative h-60 sm:h-72 md:h-80">
                        {/* Main Image with low opacity */}
                        <img
                            src={offer.mainImage}
                            alt="Main Offer"
                            className="absolute inset-0 object-cover w-full h-full opacity-10"
                            loading="lazy"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-[#359FC1]/70" />

                        {/* Content Over Image */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6">
                            {/* Left Side Image - hidden on mobile */}
                            <img
                                src={offer.leftImage}
                                alt="Left"
                                className="hidden sm:block absolute left-2 sm:left-4 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 object-contain top-1/2 transform -translate-y-1/2"
                            />

                            {/* Centered Logo */}
                            <img
                                src={offer.logo}
                                alt="Logo"
                                className="w-16 sm:w-20 h-16 sm:h-20 object-contain bg-white rounded-full shadow-md sm:shadow-lg border-2 border-white mb-2 sm:mb-4"
                            />

                            {/* Text and Button */}
                            <div className="text-center sm:text-left mb-2 sm:mb-4 max-w-md mx-auto sm:mx-0">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-1 sm:mb-2 text-white">
                                    {offer.text}
                                </h2>
                                <p className="text-sm sm:text-base text-white mb-2 sm:mb-4">
                                    {offer.description}
                                </p>
                            </div>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-3xl md:rounded-4xl text-sm sm:text-base transition-colors duration-300">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SpecialOfferComponent;
