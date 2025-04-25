import { FcHome } from "react-icons/fc";
import { TbCategory2 } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";


export default function MobileNavbar() {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <button type="button" className="inline-flex flex-col items-center justify-center px-5">
                    <FcHome size={25} className="mb-1" />
                    <span className="text-sm text-gray-500">Home</span>
                </button>
                <button type="button" className="inline-flex flex-col items-center justify-center px-5">
                    <TbCategory2 size={25} className="mb-1" />
                    <span className="text-sm text-gray-500">Categories</span>
                </button>
                <button type="button" className="inline-flex flex-col items-center justify-center px-5">
                    <FaCartShopping size={25} className="mb-1" />
                    <span className="text-sm text-gray-500">Cart</span>
                </button>
                <button type="button" className="inline-flex flex-col items-center justify-center px-5">
                    <FaUserCircle size={25} className="mb-1" />
                    <span className="text-sm text-gray-500">Profile</span>
                </button>
            </div>
        </div>

    )
}
