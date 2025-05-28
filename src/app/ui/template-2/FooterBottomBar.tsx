'use client';
import React from 'react';
import Image from 'next/image';

const FooterBottomBar = () => {
    return (
        <div className="w-full bg-gray-100 border-t border-gray-200 text-sm text-gray-600">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Left Side - Always centered on mobile, left-aligned on sm+ */}
                <p className="text-center sm:text-left">
                    Marketpro eCommerce © 2024. All Rights Reserved.
                </p>

                {/* Right Side - Stacked vertically on mobile, horizontal on sm+ */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                    <span className="text-gray-500 text-center sm:text-left">We Are Accepting:</span>
                    <div className="relative w-[200px] sm:w-[277px] h-[30px] sm:h-[40px]">
                        <Image 
                            src="/images/payment-method.png" 
                            alt="Payment Methods" 
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBottomBar;