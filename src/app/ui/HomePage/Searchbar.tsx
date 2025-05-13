'use client'
import { FaRegUser } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa6"
import { FaShoppingCart } from "react-icons/fa"
import Image from "next/image"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./LanguageSwitcher"
import { useSiteProperties } from "@/app/store/siteProperties"
import Link from "next/link"
import { useAddToCart } from "@/app/store/addToCart"
import { useEffect, useRef, useState } from "react"
import { SEARCH_PRODUCTS } from "@/app/lib/api/products"
import SearchBarResults from "./SearchBarResults"
import { useDebounce } from 'use-debounce';
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useAddToWishList } from "@/app/store/addToWishList"
import LoadingIndicator from "@/app/[locale]/(home)/loading-indicator"

export default function Searchbar() {
    const t = useTranslations('HomePage');
    const { logo, backgroundColor, textColor } = useSiteProperties();
    const { items } = useAddToCart();
    const { items: wishlistItems } = useAddToWishList();
    const [quantity, setQuantity] = useState<number>(0);
    const [wishlistQuantity, setWishlistQuantity] = useState<number>(0);
    const [searchResults, setSearchResults] = useState<Array<Product>>([]);
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue] = useDebounce(searchValue, 500);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = async (value: string) => {
        if (value.length > 2) {
            try {
                setIsLoading(true);
                const products = await SEARCH_PRODUCTS(value);
                const limitedProducts = products.data.slice(0, 7);
                setSearchResults(limitedProducts);
            } catch (error) {
                console.error("Search failed:", error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }

        } else {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        handleSearch(debouncedSearchValue);
    }, [debouncedSearchValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !(searchRef.current as HTMLElement).contains(event.target as Node)) {
                setSearchResults([]);
                setSearchValue('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prevIndex =>
                prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prevIndex =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            const selectedProduct = searchResults[selectedIndex];
            // Handle navigation or selection
            console.log('Selected product:', selectedProduct);
            setSearchResults([]); // Clear results after selection
            setSearchValue(''); // Clear input after selection
            router.push(`/products/${selectedProduct.slug}`);
        } else if (e.key === 'Escape') {
            setSearchResults([]); // Clear results on escape
            setSearchValue(''); // Clear input on escape
        }
    };

    const handleProductClick = (e: React.MouseEvent, slug: string) => {
        console.log('clicked');
        router.push(`/products/${slug}`);
    };

    useEffect(() => {
        setQuantity(items.length > 0 ? items.reduce((acc, item) => acc + item.quantity, 0) : 0);
        setWishlistQuantity(wishlistItems.length > 0 ? wishlistItems.reduce((acc, item) => acc + item.quantity, 0) : 0);
    }, [items, wishlistItems]);

    return (
        <div style={{ backgroundColor: backgroundColor, color: textColor }}>
            <div className="flex items-center justify-between gap-3 py-2 px-2 md:px-[40px]">
                {/* logo */}
                <div>
                    <Link href='/'>
                        <Image
                            src={logo}
                            alt="logo"
                            width={100}
                            height={64}
                            className="w-[100px] h-auto object-contain"
                        />
                    </Link>
                </div>

                {/* searchbar */}
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder={`${t("searchbarPlaceholder")}`}
                        className="bg-white text-gray-500 rounded-sm p-2 mx-2 outline-none w-full placeholder:text-sm"
                        onChange={handleInputChange}
                        value={searchValue}
                        ref={searchRef}
                        onKeyDown={handleKeyDown}
                    />
                    {isLoading && (
                        <div className="absolute top-[30%] right-0 text-gray-500 animate-spin">
                            <ImSpinner2 />
                        </div>
                    )}
                    {searchResults.length > 0 && (
                        <SearchBarResults searchResults={searchResults} selectedIndex={selectedIndex} handleKeyDown={handleKeyDown}
                            onClick={handleProductClick} />
                    )}
                </div>

                <div className="flex items-center justify-evenly gap-3 p-2">
                    {/* language */}
                    <LanguageSwitcher />
                    {/* login */}
                    <button className="hidden md:block whitespace-nowrap flex gap-2 border-x-2 border-white px-4 justify-center cursor-pointer hover:text-gray-300">
                        <h4 className="flex items-center gap-2">{t("login")} <FaRegUser size={20} /></h4>
                    </button>
                    {/* wishlist */}
                    <button className="hidden md:block cursor-pointer hover:text-gray-300 relative mx-3">
                        <Link href="/wishlist">
                            <FaRegHeart size={20} />
                            {wishlistQuantity > 0 && (
                                <span className="absolute top-[-7px] right-[-10px] bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{wishlistQuantity}</span>
                            )}
                        </Link>
                    </button>
                    {/* cart */}
                    <button className="hidden md:block cursor-pointer hover:text-gray-300 relative">
                        <Link href="/cart">
                            <FaShoppingCart size={20} />
                            {quantity > 0 && (
                                <span className="absolute top-[-7px] right-[-10px] bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{quantity}</span>
                            )}
                        </Link>

                    </button>
                </div>

            </div>
        </div>
    );
}