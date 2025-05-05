
import { useState } from 'react'
import { GrTrash } from 'react-icons/gr';
import { useTranslations } from 'next-intl';
import { useAddToCart } from '@/app/store/addToCart';
export default function PriceAdjusterMobile({ item }: { item: CartItem }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const t = useTranslations('Cart');
    const { removeItem,addItem } = useAddToCart();
    const updateQuantity = (newQuantity: number) => {
        setQuantity(newQuantity);
        addItem({ ...item, quantity: newQuantity, adjusted: true }); // Update the item in the cart
    };
    return (
        <div className='block sm:block md:hidden pt-2 bg-[#F7F7FA] rounded-b-md'>
            <div className='flex justify-between items-center'>
                <div className='flex sm:flex md:block xl:flex justify-between items-center'>
                    <div className="flex items-center justify-between border border-gray-300 rounded bg-gray-100 mb-2">
                        <button
                            className="cursor-pointer px-3 py-1 bg-white rounded m-1 hover:bg-gray-50 transition-colors"
                            onClick={() => updateQuantity(Math.max(1, quantity - 1))}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => updateQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-15 text-center bg-transparent border-none focus:outline-none focus:ring-0"
                        />
                        <button
                            className="cursor-pointer px-3 py-1 bg-white rounded m-1 hover:bg-gray-50 transition-colors"
                            onClick={() => updateQuantity(Math.max(1, quantity + 1))}
                        >
                            +
                        </button>
                    </div>
                </div>

                <h3 className="text-lg font-bold">{item.price * quantity}$</h3>


                <div className='p-2'>
                    <button className="cursor-pointer text-gray-500 text-sm px-2 py-1 rounded-md flex items-center gap-2 border border-gray-500 hover:text-red-500 hover:border-red-500 transition-all duration-300" onClick={() => removeItem(item)}>
                        <GrTrash />
                    </button>
                </div>
            </div>
        </div>
    )
}