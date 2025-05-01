import { useAddToCart } from '@/app/store/addToCart';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import DrawerComponent from './DrawerComponent';

interface SideDrawerProps {
    onAddProduct: boolean;
    setOnAddProduct: (value: boolean) => void;
}

export default function SideDrawer({ onAddProduct, setOnAddProduct }: SideDrawerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const drawerRef = useRef<HTMLDivElement>(null);
    const { items } = useAddToCart();
    const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const lastItem = items.length > 0 ? items[items.length - 1] : null;
    const t = useTranslations('SideDrawer');

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setOnAddProduct(false); // Set onAddProduct to false when closing
        }
    };

    // Close drawer when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isOpen) {
                setIsOpen(false);
                setOnAddProduct(false);
            }
        };

        // Focus the drawer when it opens
        if (isOpen && drawerRef.current) {
            drawerRef.current.focus();
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    useEffect(() => {
        if (onAddProduct) {
            setIsOpen(true); // Open the drawer
        }
    }, [onAddProduct]);

    return (
        <>
            <div className="text-center">
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                    onClick={toggleDrawer}
                >
                    Show drawer
                </button>
            </div>

            {/* Backdrop overlay */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-10 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-25' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleDrawer}
            />

            {/* Drawer component */}
            <DrawerComponent isOpen={isOpen} />
        </>
    );
}
