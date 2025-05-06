'use client'
import { useTranslations } from "next-intl";
import { FaSortAmountDown, FaSortAmountUp, FaThList } from 'react-icons/fa'; // Import icons
import { useState } from 'react';
import SortBy from "./SortBy";
import { CiBoxList } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";


export default function Sorting({ totalProducts, category }: { totalProducts: number, category: Category }) {
    const t = useTranslations('HomePage');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState(t('select_sort_option'));
    const [selectedDisplayOption, setSelectedDisplayOption] = useState(t('display'));
    const [isGrid, setIsGrid] = useState(false);

    const sortOptions = [
        { value: 'price_high_to_low', label: t('price_high_to_low'), icon: <FaSortAmountDown /> },
        { value: 'price_low_to_high', label: t('price_low_to_high'), icon: <FaSortAmountUp /> },
        { value: 'newest', label: t('newest'), icon: <FaSortAmountDown /> },
        { value: 'oldest', label: t('oldest'), icon: <FaSortAmountUp /> },
    ];

    const displayOptions = [
        { value: '50', label: 50, icon: null },
        { value: '100', label: 100, icon: null },
        { value: '150', label: 150, icon: null },
    ];

    const handleSortOptionClick = (option: { value: string, label: any, icon: React.ReactNode | null }) => {
        setSelectedSortOption(option.label);
        setIsSortOpen(false);
        // Handle sorting logic here
    };

    const handleDisplayOptionClick = (option: { value: string, label: any, icon: React.ReactNode | null }) => {
        setSelectedDisplayOption(option.label);
        setIsDisplayOpen(false);
        // Handle display logic here
    };

    return (
        <div className="hidden md:block">
            <div className="flex items-center gap-2 mb-4">
                <h1 className="text-xl">{totalProducts} {t('products')}</h1>
                <h1 className="text-xl font-bold">'{category.name}'</h1>
            </div>

            <div className="flex items-center gap-4 mb-4">
                {/* sortby */}
                <SortBy
                    isOpen={isSortOpen}
                    setIsOpen={setIsSortOpen}
                    selectedOption={selectedSortOption}
                    options={sortOptions}
                    handleOptionClick={handleSortOptionClick}
                    title='sort_by'
                />

                {/* display */}
                <SortBy
                    isOpen={isDisplayOpen}
                    setIsOpen={setIsDisplayOpen}
                    selectedOption={selectedDisplayOption}
                    options={displayOptions}
                    handleOptionClick={handleDisplayOptionClick}
                    title='display'
                />

                {/* grid-list */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="sorting" className="text-md text-gray-500">{isGrid ? 'Grid' : 'List'}</label>
                    <button
                        type="button"
                        className="cursor-pointer w-full rounded-md border border-gray-300 shadow-sm p-2 bg-white text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsGrid(!isGrid)}
                    >
                        {isGrid ? <CiGrid41 size={20} /> : <CiBoxList size={20} />}
                    </button>
                </div>
            </div>

        </div>
    );
}
