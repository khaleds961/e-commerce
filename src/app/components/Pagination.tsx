'use client'
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLoading } from '../context/LoadingContext';

interface PaginationProps {
    totalProducts: number;
    currentPage?: number;
    itemsPerPage?: number;
}

export default function Pagination({
    totalProducts,
    itemsPerPage = 1

}: PaginationProps) {
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const t = useTranslations('HomePage');
    const { setIsLoading } = useLoading();
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (page: number) => {
        setIsLoading(true);
        // router.push(`${pathname}?page=${page}`);
        // Create a new URLSearchParams object to retain existing parameters
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('page', page.toString()); // Update the page parameter

        // Navigate to the new URL with updated parameters
        router.push(`${pathname}?${newParams.toString()}`);
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="flex items-center justify-center -space-x-px h-10 text-base">
                <li>
                    <div
                        className={`cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <span className="sr-only">{t('previous')}</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </div>
                </li>
                {pages.map((page) => (
                    <li key={page}>
                        <div
                            onClick={() => handlePageChange(page)}
                            className={`cursor-pointer flex items-center justify-center px-4 h-10 leading-tight ${page === currentPage
                                    ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                }`}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </div>
                    </li>
                ))}
                <li>
                    <div
                        className={`cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <span className="sr-only">{t('next')}</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </div>
                </li>
            </ul>
        </nav>
    );
}
