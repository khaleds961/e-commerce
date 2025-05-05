import React from 'react';

const CartLoading: React.FC = () => {
    return (
        <div className="animate-pulse">
            <div className="flex items-center mb-2">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded ml-2"></div>
            </div>

            <div className="md:grid grid-cols-6 gap-4">
                {/* Products Skeleton */}
                <div className="col-span-4">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                            <div className="flex items-center">
                                <div className="h-20 w-20 bg-gray-300 rounded"></div>
                                <div className="ml-4 flex-grow">
                                    <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Skeleton */}
                <div className="col-span-2">
                    <div className="p-4 border rounded">
                        <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>
                        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartLoading;