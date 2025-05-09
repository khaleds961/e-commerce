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
        <div className="flex flex-col md:flex-row gap-2 pt-20">
            {offers.map((offer) => (
                <div
                    key={offer.id}
                    className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg"
                >
                    <div className="relative h-80">
                        {/* Main Image with low opacity (z-10) */}
                        <img
                            src={offer.mainImage}
                            alt="Main Offer"
                            className="absolute inset-0 object-cover w-full h-full opacity-10 z-21"
                        />

                        {/* Overlay (z-20) */}
                        <div className="absolute inset-0 bg-[#359FC1]/70 z-20" />

                        {/* Content Over Image (z-30) */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-30">
                            {/* Left Side Image */}
                            <img
                                src={offer.leftImage}
                                alt="Left"
                                className="absolute left-4 w-50 h-50 object-contain top-50%"
                            />

                            {/* Centered Logo */}
                            <img
                                src={offer.logo}
                                alt="Logo"
                                className="w-20 h-20 object-contain bg-white rounded-full shadow-lg border border-white mb-2"
                            />

                            {/* Text and Button */}
                            <div className="items-start text-left mb-4 z-12">
                                <h2 className="text-5xl font-semibold mb-2 text-white">
                                    {offer.text}
                                </h2>
                                <p className="text-white mb-4">{offer.description}</p>
                            </div>

                            <button className="bg-blue-600 text-white px-6 py-2 rounded-4xl hover:bg-blue-700 transition ">
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
