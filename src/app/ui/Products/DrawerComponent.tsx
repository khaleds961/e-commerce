import { useAddToCart } from '@/app/store/addToCart';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function DrawerComponent({ isOpen }: { isOpen: boolean }) {

    const locale = useLocale();
    const isRTL = locale === 'ar';
    const drawerRef = useRef<HTMLDivElement>(null);
    const { items } = useAddToCart();
    const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const lastItem = items.length > 0 ? items[items.length - 1] : null;
    const t = useTranslations('SideDrawer');

    return (
        <div
            ref={drawerRef}
            tabIndex={-1} // Needed to make the div focusable
            className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} z-50 h-screen p-4 overflow-y-auto transition-all duration-300 ease-in-out transform 
            ${isOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')} bg-white w-100 shadow-lg dark:bg-gray-800 outline-none`}
            aria-labelledby="drawer-label"
        >
            {lastItem && (
                <div key={lastItem.id} className='flex items-center justify-between mb-2 w-full gap-4'>
                    <Image src={lastItem.image} alt={lastItem.title} width={100} height={100} className='rounded-md' />
                    <div className='flex flex-col gap-2'>
                        <h5 className='text-md font-bold'>{lastItem.title}</h5>
                        <p className='text-sm text-green-600'>{t('addedToBasket')}</p>
                    </div>
                </div>
            )}

            {/* checkout or continue shopping */}
            <div className='flex flex-col gap-2'>
                <p className='text-lg font-bold'>{t('total')}: ${totalPrice}</p>
                <div className='flex items-center gap-2'>
                    <button className='cursor-pointer bg-blue-500 text-white p-2 rounded-md'>{t('checkout')}</button>
                    <button className='cursor-pointer bg-white text-blue-700 p-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300'>{t('continueShopping')}</button>
                </div>
            </div>

            {/* cart items */}
            <div className='mt-7 border-t border-gray-200 pt-4'>
                {items.length > 0 && items.map((item) => (
                    <div key={item.id} className='flex mb-2 w-full gap-4'>
                        <Image src={item.image} alt={item.title} width={100} height={100} className='rounded-md' />
                        <div>
                            <h5 className='text-md'>{item.title}</h5>
                            <p className='text-sm font-bold'>
                                ${item.quantity * item.price}
                                <span className='text-sm'> ({item.quantity} {t('items')})</span>
                            </p>
                            <p className='text-sm'>
                                <span>{item.size && (t('size') + ' ' + item.size)}  </span>
                                <span className='mx-2text-sm capitalize'>,{item.color && item.color}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
