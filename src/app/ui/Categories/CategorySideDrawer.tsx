import { useLocale } from 'next-intl';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function CategorySideDrawer({ children, isOpen, setIsOpen }: { children: React.ReactNode, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {

    // const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const drawerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('SideDrawer');

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Backdrop overlay */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-10 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-25' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleDrawer}
            />

            <div
                ref={drawerRef}
                tabIndex={-1} // Needed to make the div focusable
                className={`fixed top-0 
                ${isRTL ? 'right-0' : 'left-0'} 
                z-50 h-screen p-4 overflow-y-auto transition-all duration-300 ease-in-out transform 
                ${isOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')} 
                bg-gray-100 w-[90%] outline-none `}
                aria-labelledby="drawer-label"
            >
                {children}

            </div>
        </>
    )
}
