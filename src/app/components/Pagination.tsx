'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLoading } from '../context/LoadingContext';

interface PaginationProps {
    totalProducts: number;
    currentPage?: number;
}

export default function Pagination({
    totalProducts,
}: PaginationProps) {
    const searchParams = useSearchParams();
    const itemsPerPage = Number(searchParams.get('display')) || 50;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const currentPage = Number(searchParams.get('page')) || 1;
    const t = useTranslations('HomePage');
    const { setIsLoading } = useLoading();
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (page: number) => {
        setIsLoading(true);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('page', page.toString()); // Update the page parameter
        router.push(`${pathname}?${newParams.toString()}`);
    }

    const getVisiblePages = (currentPage: number, totalPages: number) => {
        const pages = [];
        const windowSize = 3; // Number of pages to show at once

        // Always show first page
        pages.push(1);

        // Calculate the start of the window
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, start + windowSize - 1);

        // Adjust start if we're near the end
        if (end === totalPages - 1) {
            start = Math.max(2, end - windowSize + 1);
        }

        // Add ellipsis if needed
        if (start > 2) {
            pages.push('...');
        }

        // Add the window pages
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Add ellipsis if needed
        if (end < totalPages - 1) {
            pages.push('...');
        }

        // Always show last page if there is more than one page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        totalProducts > 0 && (
            <nav aria-label="Page navigation" className='mt-6'>
                <ul className="flex items-center justify-center -space-x-px h-10 text-base">
                    {getVisiblePages(currentPage, totalPages).map((page, index) => (
                        <li key={index}>
                            {page === '...' ? (
                                <div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">
                                    ...
                                </div>
                            ) : (
                                <div
                                    onClick={() => handlePageChange(Number(page))}
                                    className={`cursor-pointer flex items-center justify-center px-4 h-10 leading-tight ${page === currentPage
                                        ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                                        }`}
                                    aria-current={page === currentPage ? 'page' : undefined}
                                >
                                    {page}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        )
    );
}
