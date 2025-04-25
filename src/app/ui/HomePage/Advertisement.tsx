import Image from "next/image";

export default function Advertisement() {
    return (
        <div className="bg-gray-100 mt-10 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                <div className="rounded-md p-4 md:p-10 flex flex-col justify-center">
                    <p className="text-md md:text-xl font-bold mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                    <p className="text-xs md:text-sm text-gray-500 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                    <button className="w-fit bg-blue-500 text-white px-4 py-2 rounded-md">Read More</button>
                </div>
                <div className="rounded-md p-4 absolute right-[20%] bottom-[-1px] hidden md:block">
                    <Image src="/images/man-shop.png" alt="Advertisement" width={200} height={250}
                     />
                </div>
            </div>
        </div>
    );
}
