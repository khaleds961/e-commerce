// src/app/components/ScreenLoader.tsx
'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSiteProperties } from '../store/siteProperties';
export default function ScreenLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const { logo} = useSiteProperties();

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleStop = () => setIsLoading(false);

        // Show loader on navigation start
        window.addEventListener('beforeunload', handleStart);
        // Hide loader when page is loaded
        window.addEventListener('load', handleStop);

        return () => {
            window.removeEventListener('beforeunload', handleStart);
            window.removeEventListener('load', handleStop);
        };
    }, [pathname, searchParams]);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
            <div className="flex flex-col items-center gap-4">
                {/* Logo Image */}
                <div className="relative w-32 h-32">
                    <Image
                        src={logo}  // Add your logo path here
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                
                {/* Loading Animation */}
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}