export default function Loading() {
    return (
        <div className="mx-2 md:mx-10 mt-[100px]">
            {/* Categories Skeleton */}
            <div className="animate-pulse">
                <div className="h-8 w-48 bg-gray-200 rounded mb-5"></div>
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="bg-gray-200 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded mt-2"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Products Skeleton */}
            <div className="animate-pulse mt-10">
                <div className="h-8 w-48 bg-gray-200 rounded mb-5"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="bg-gray-100 rounded-md p-4">
                            <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mega Promotion Skeleton */}
            <div className="animate-pulse mt-10">
                <div className="h-8 w-48 bg-gray-200 rounded mb-5"></div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <div className="h-40 bg-gray-200 rounded-md"></div>
                        <div className="h-40 bg-gray-200 rounded-md"></div>
                    </div>
                    <div className="h-80 bg-gray-200 rounded-md"></div>
                    <div className="h-80 bg-gray-200 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}
