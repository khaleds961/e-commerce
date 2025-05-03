import { useState } from 'react'

export default function PriceAdjuster({ item,styling }: { item: CartItem,styling?:string }) {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className={`hidden sm:hidden md:block gap-2 h-full p-4`}>
            <div className='flex flex-col items-end justify-between h-full'>
                <h3 className="text-lg font-bold mb-2">{item.price * quantity}$</h3>

                {/* price adjuster */}
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
        </div>
    )
}
