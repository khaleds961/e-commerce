export default function Loading() {
    return (
        <main className="mx-auto px-4 py-8 mt-[50px] animate-pluse">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-200 rounded-lg shadow-md p-4 col-span-1">
                </div>
                <div className="col-span-3">
                    {/* display-sort-count */}
                    <div className="bg-gray-200 rounded-lg shadow-md p-4 mb-4">
                    </div>
                    {/* category-list */}
                    <div className="bg-gray-200 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="bg-gray-200 rounded-lg shadow-md p-4">
                                <div className="w-full h-48 bg-gray-300 rounded-md"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
