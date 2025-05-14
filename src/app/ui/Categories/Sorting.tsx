'use client'
import { useTranslations } from "next-intl";
import { FaSortAmountDown, FaSortAmountUp, FaThList } from 'react-icons/fa'; // Import icons
import { useEffect, useState } from 'react';
import SortBy from "./SortBy";
import { CiBoxList } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import ProductCard from "../HomePage/ProductCard";
import ProductList from "./ProductList";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ProductsSkeleton from "./ProductsSkeleton";
import { useLoading } from "@/app/context/LoadingContext";
import buildQueryString from "@/app/utils/buildQueryString";
import useScreenSize from "@/app/hooks/useScreenSize";
import CategorySideDrawer from "./CategorySideDrawer";
import { FaFilter } from "react-icons/fa6";
import CategoriesFilter from "./CategoriesFilter";
export default function Sorting({ totalProducts, category, products }: { totalProducts: number, category: Category, products: Product[] }) {

    const t = useTranslations('HomePage');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isSortMobileOpen, setIsSortMobileOpen] = useState(false);
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState(t('select_sort_option'));
    const [selectedDisplayOption, setSelectedDisplayOption] = useState(t('display'));
    const [isGrid, setIsGrid] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const sort = searchParams.get('sort') || 'default';
    const display = searchParams.get('display');
    const price_min = searchParams.get('price_min');
    const price_max = searchParams.get('price_max');
    const { isLoading, setIsLoading } = useLoading();

    const sortOptions = [
        { value: 'default', label: t('default'), icon: null },
        { value: 'price_desc', label: t('price_high_to_low'), icon: <FaSortAmountDown /> },
        { value: 'price_asc', label: t('price_low_to_high'), icon: <FaSortAmountUp /> },
        { value: 'newest', label: t('newest'), icon: <FaSortAmountDown /> },
        { value: 'oldest', label: t('oldest'), icon: <FaSortAmountUp /> },
    ];

    const displayOptions = [
        { value: '50', label: 50, icon: null },
        { value: '100', label: 100, icon: null },
        { value: '150', label: 150, icon: null },
    ];

    const handleSortOptionClick = (option: { value: string, label: any, icon: React.ReactNode | null }) => {
        setIsLoading(true);
        setSelectedSortOption(option.label);
        setIsSortOpen(false);
        setIsFilterOpen(false);

        const queryParams: QueryParams = {
            sort: option.value,
            display: display || '50',
            price_min,
            price_max,
            page: searchParams.get('page')
        };
        const queryString = buildQueryString(queryParams);
        router.push(`${pathname}${queryString}`);
    };

    const handleDisplayOptionClick = (option: { value: string, label: any, icon: React.ReactNode | null }) => {
        setIsLoading(true);
        setSelectedDisplayOption(option.label);
        setIsDisplayOpen(false);

        const queryParams: QueryParams = {
            sort: sort || 'price_desc',
            display: option.value,
            price_min,
            price_max
        };

        const queryString = buildQueryString(queryParams);
        router.push(`${pathname}${queryString}`);
    };

    useEffect(() => {
        setIsLoading(true);
    }, [price_min]);


    useEffect(() => {
        setIsLoading(false);
    }, [products]);


    const screenSize = useScreenSize();
    useEffect(() => {
        if (screenSize.width < 768) {
            setIsGrid(true);
        }
    }, [screenSize]);

    return (
        <>
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">

                    <div className="block">
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-xl">{totalProducts} {t('products')}</h1>
                            <h1 className="text-xl font-bold">'{category.name}'</h1>
                        </div>

                        <div className="flex md:hidden items-center gap-2">
                            <button className="cursor-pointer flex items-center gap-2 border border-gray-300 px-3 py-1 w-full"
                                onClick={() => setIsFilterOpen(true)}>
                                {t('filter')}
                                <FaFilter />
                            </button>

                            <div className="w-[2px] h-8 bg-gray-300"></div>

                            <button className="cursor-pointer flex items-center gap-2 border border-gray-300 px-3 py-1 w-full" onClick={() => setIsSortMobileOpen(true)}>
                                {t('sort')}
                                <FaSortAmountDown />
                            </button>
                        </div>

                        <div className="hidden md:flex items-center gap-4 mb-4">
                            {/* sortby */}
                            <SortBy
                                isOpen={isSortOpen}
                                setIsOpen={setIsSortOpen}
                                selectedOption={selectedSortOption}
                                options={sortOptions}
                                handleOptionClick={handleSortOptionClick}
                                title='sort_by'
                                sort={sort}
                            />

                            {/* display */}
                            <SortBy
                                isOpen={isDisplayOpen}
                                setIsOpen={setIsDisplayOpen}
                                selectedOption={selectedDisplayOption}
                                options={displayOptions}
                                handleOptionClick={handleDisplayOptionClick}
                                title='display'
                                display={display}
                            />

                            {/* grid-list */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="sorting" className="text-md text-gray-500">{isGrid ? t('grid') : t('list')}</label>
                                <button
                                    type="button"
                                    className="cursor-pointer w-full rounded-md border border-gray-300 shadow-sm p-2 bg-white text-gray-700 hover:bg-gray-50"
                                    onClick={() => setIsGrid(!isGrid)}
                                >
                                    {isGrid ? <CiGrid41 size={20} /> : <CiBoxList size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* filter drawer in mobile */}
                        <CategorySideDrawer isOpen={isFilterOpen} setIsOpen={setIsFilterOpen}>
                            <CategoriesFilter products={products} />
                        </CategorySideDrawer>

                        {/* sort drawer in mobile */}
                        <CategorySideDrawer isOpen={isSortMobileOpen} setIsOpen={setIsSortMobileOpen}>
                            <fieldset>
                                {sortOptions.map((option: { value: string, label: any, icon: React.ReactNode | null }) => (
                                    <div key={option.value} className="flex items-center mb-4 w-fit"
                                        onClick={() => handleSortOptionClick(option)}>
                                        <input type="checkbox"
                                            id={option.value}
                                            name={option.value}
                                            className="w-4 h-4"
                                            checked={sort === option.value}
                                            onChange={() => handleSortOptionClick(option)}  // Add onChange handler
                                            readOnly
                                        />
                                        <label htmlFor={option.value} className="text-md text-gray-500 mx-3">{option.label}</label>
                                    </div>
                                ))}
                            </fieldset>
                        </CategorySideDrawer>

                    </div>
                </div>

            {/* category-list */}
            {isLoading ? <ProductsSkeleton /> : products && products.length > 0 && isGrid ?
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
                    {products.map((product: Product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div> : products && products.length > 0 && !isGrid ?
                    products.map((product: Product) => (
                        <ProductList product={product} key={product.id} />
                    )) :
                    <div className="text-2xl text-gray-500">{t('no_products_found')}</div>}
        </>
    );
}
