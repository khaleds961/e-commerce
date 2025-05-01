import { useSiteProperties } from "@/app/store/siteProperties";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SideDrawer from "../SideDrawer";
import { handleAddToCart } from '@/app/utils/addToCart';


interface OrderDetailsProps {
    product: Product;   
    selectedSize: string;
    selectedColor: string;
}

export default function OrderDetails({ product, selectedSize, selectedColor }: OrderDetailsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

    const t = useTranslations('Product');
    const { backgroundColor, textColor } = useSiteProperties();

    const onAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const cartItem = handleAddToCart(product, quantity, selectedSize, selectedColor, t);
        if (cartItem && cartItem.length > 0) {
            setIsSideDrawerOpen(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
        setIsLoading(false);

    };
    
    return (
        <div className='mt-4 p-2 border border-gray-300 rounded-md'>
                    <h2 className='text-lg font-bold border-b border-gray-300 pb-2'>{t('orderDetails')}</h2>
                    <div className='mt-3'>
                        {/* Quantity */}
                        <div className='mb-7 flex sm:flex md:block xl:flex justify-between items-center '>
                            <h2 className='text-md font-bold mb-2'>{t('quantity')}</h2>
                            <div className="flex items-center justify-between border border-gray-300 rounded bg-gray-100">
                                <button
                                    className="cursor-pointer px-3 py-1 bg-white rounded m-1 hover:bg-gray-50 transition-colors"
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-15 text-center bg-transparent border-none focus:outline-none focus:ring-0"
                                />
                                <button
                                    className="cursor-pointer px-3 py-1 bg-white rounded m-1 hover:bg-gray-50 transition-colors"
                                    onClick={() => setQuantity(prev => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* price */}
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className='text-lg text-gray-500 font-bold'>{t('price')}</h2>
                            <p className='text-lg font-bold'>${product.price}</p>
                        </div>

                        {/* total */}
                        <div className='flex justify-between items-center border-t border-gray-300 pt-2'>
                            <h2 className='text-md font-bold'>{t('total')}</h2>
                            <p className='text-xl font-bold'>${product.price * quantity}</p>
                        </div>

                        {/* add to cart */}
                        <div className='mt-6'>
                            <button className='cursor-pointer rounded-md p-2 text-center w-full'
                                style={{ backgroundColor: backgroundColor, color: textColor }}
                                onClick={onAddToCart}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="loader mx-auto"></div>
                                ) : (
                                    <p className='text-md'>{t('addToCart')}</p>
                                )}
                            </button>
                        </div>

                        {/* Side Drawer */}
                        <SideDrawer onAddProduct={isSideDrawerOpen} setOnAddProduct={setIsSideDrawerOpen} />

                    </div>
                </div>
    )
}
