import { useEffect, useState } from 'react'
import { useAddToCart } from '@/app/store/addToCart';
export default function PriceAdjuster({ item }: { item: CartItem }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const { addItem } = useAddToCart();
    const updateQuantity = (newQuantity: number) => {
        setQuantity(newQuantity);
        addItem({ ...item, quantity: newQuantity, adjusted: true }); // Update the item in the cart
    };
    return (
        <div className={`hidden sm:hidden md:block gap-2 h-full p-4`}>
            <div className='flex flex-col items-end justify-between h-full'>
                <h3 className="text-lg font-bold mb-2">{item.price * quantity}$</h3>

                {/* price adjuster */}
                <div className="flex items-center justify-between border border-gray-300 rounded bg-gray-100">
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
        </div>
    )
}
