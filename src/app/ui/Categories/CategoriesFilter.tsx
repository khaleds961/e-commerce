'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {useState } from "react";
import { useLoading } from "@/app/context/LoadingContext";
import { useTranslations } from "next-intl";
import buildQueryString from "@/app/utils/buildQueryString";

export default function CategoriesFilter({ products }: { products: Product[] }) {
    const t = useTranslations('HomePage');

    const PRICE_RANGE = {
        min: 10,
        max: 110
    };

    const [isClear, setIsClear] = useState(false);
  
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    const currentParams = {
        sort: searchParams.get('sort'),
        display: searchParams.get('display'),
        price_min: searchParams.get('price_min'),
        price_max: searchParams.get('price_max'),
        page: searchParams.get('page'),
    };

    const [price, setPrice] = useState(
        currentParams.price_min ? Number(currentParams.price_min) : PRICE_RANGE.min
    );

    const { setIsLoading } = useLoading();

    const handlePriceChange = (newPrice: number) => {
        setIsLoading(true);
        setPrice(newPrice);
        setIsClear(true);
        const queryParams:QueryParams = {
            ...currentParams,
            price_min: newPrice,
            price_max: PRICE_RANGE.max,
            page: currentParams.page
        };
        
        // Remove null/undefined values
        Object.keys(queryParams).forEach(key => {
            if (queryParams[key] === null || queryParams[key] === undefined) {
                delete queryParams[key];
            }
        });

        const queryString = buildQueryString(queryParams);
        router.push(`${pathname}${queryString}`);
    };

    // Handle price input change
    const filterPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = Math.round(Number(e.target.value));
        handlePriceChange(newPrice);
    };

    return (
        <div className="bg-white rounded-lg p-4">
            <h2 className="text-md font-semibold mb-4">{t('category_filters')}</h2>

            <h2 className="text-md mb-1">{t('price_range')}</h2>
            {isClear && (
                <div className="flex justify-end">
                    <span className="text-sm text-gray-500 cursor-pointer border border-gray-300 hover:bg-gray-50 hover:border-blue-500 rounded-md p-1 mb-2" onClick={() => handlePriceChange(PRICE_RANGE.min)}>{t('clear')}</span>
                </div>
            )}
            <div className="space-y-2">
                <input 
                    className="w-full" 
                    type="range"
                    min={PRICE_RANGE.min}
                    max={PRICE_RANGE.max}
                    step="1"
                    value={price}
                    onChange={filterPrice}
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${price}</span>
                    <span>${PRICE_RANGE.max}</span>
                </div>
            </div>
        </div>
    );
}
