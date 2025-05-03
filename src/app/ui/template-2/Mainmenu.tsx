'use client';

import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect, JSX } from 'react';
import { BiCategory } from "react-icons/bi";




// Define the MainMenuProps type
interface MainMenuProps {
    siteProperties: any;
}

export default function MainMenu({ siteProperties }: MainMenuProps): JSX.Element {
    const categories = [
        { name: "Electronics" },
        { name: "Fashion" },
        { name: "Home Appliances" },
        { name: "Books" },
    ];

    const Shop = [
        { name: "Shop" },
        { name: "Shop Details" },
        { name: "Shop Details Two" },
    ];

    const Home = [
        { name: "Home" },
        { name: "Home" },
        { name: "Home" },
    ];

    const Pages = [
        { name: "Cart" },
        { name: "Wishlist" },
        { name: "Checkout" },
        { name: "Become Seller" },
        { name: "Account" },
    ];

    const Vendors = [...Pages];
    const Blog = [...Pages];

    const [showCategories, setShowCategories] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showPages, setShowPages] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [showHome, setShowHome] = useState(false);
    const [showVendors, setShowVendors] = useState(false);
    const [showBlog, setShowBlog] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`scroll-mx-130 fixed z-50 w-full font-medium flex items-center justify-start gap-6 px-4 md:px-[130px] border-y transition-all duration-250 
            ${isScrolled ? "top-0 bg-white/95 border-gray-200" : "top-[157px] bg-white border-gray-300"}`}
        >
            {/* All Categories Dropdown with side borders */}
            <div className="border-x border-gray-300 h-full">
                <Dropdown
                    title="All Categories"
                    icon={<BiCategory />}
                    items={categories}
                    show={showCategories}
                    setShow={setShowCategories}
                    buttonClass="h-15 px-4 text-gray-700 hover:text-black"
                />
            </div>

            {/* Other Dropdowns */}
            <Dropdown title="Home" items={Home} show={showHome} setShow={setShowHome} />
            <Dropdown title="Shop" items={Shop} show={showShop} setShow={setShowShop} />
            <Dropdown title="Pages" items={Pages} show={showPages} setShow={setShowPages} />
            <Dropdown title="Vendors" items={Vendors} show={showVendors} setShow={setShowVendors} />
            <Dropdown title="Blog" items={Blog} show={showBlog} setShow={setShowBlog} />

            {/* Contact Button */}
            <button className="flex items-center gap-1 text-[#999] hover:text-black">
                Contact Us
            </button>
        </div>
    );
}

// Reusable Dropdown component
function Dropdown({ title, icon = null as React.ReactNode, items, show, setShow, buttonClass = "" }: { title: string; icon?: React.ReactNode; items: { name: string }[]; show: boolean; setShow: React.Dispatch<React.SetStateAction<boolean>>; buttonClass?: string }) {
    return (
        <div
            className="relative"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <button className={`text-[#999] flex items-center gap-1 hover:text-black  px-4 h-15 ${buttonClass}`}>
                {icon && icon} {title} <FaChevronDown className="text-xs" />
            </button>
            {show && (
                <ul className="absolute left-0 mt-2 w-48 bg-white rounded shadow z-20">
                    {items.map((item, i) => (
                        <li
                            key={i}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}