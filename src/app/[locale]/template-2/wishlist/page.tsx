'use client';

import { useState } from 'react';
import { FiHeart, FiShoppingCart, FiTrash2, FiX } from 'react-icons/fi';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      image: '/images/headphones.webp',
      color: 'Black',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      price: 199.99,
      image: '/images/headphones.webp',
      color: 'Silver',
      inStock: true
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      price: 59.99,
      image: '/images/headphones.webp',
      color: 'Blue',
      inStock: false
    },
    {
      id: 4,
      name: 'Noise Cancelling Headphones',
      price: 149.99,
      image: '/images/headphones.webp',
      color: 'White',
      inStock: true
    }
  ]);

  const removeItem = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const moveAllToCart = () => {
    // Implement your "Move all to cart" logic here
    console.log('Moving all items to cart');
    setWishlistItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center gap-2 mb-8">
          <FiHeart className="text-2xl text-red-500" />
          <h1 className="text-2xl font-bold">Your Wishlist</h1>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FiHeart className="mx-auto text-4xl text-gray-300 mb-4" />
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your wishlist yet</p>
            <Link 
              href="/template-2" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Wishlist Items */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
              <div className="hidden md:grid grid-cols-12 bg-[#155dfc] p-4 text-sm font-medium text-white">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Stock Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              <div className="divide-y divide-gray-200">
                {wishlistItems.map(item => (
                  <div key={item.id} className="p-4 grid grid-cols-2 md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-2 md:col-span-6 flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-center">
                      <span className="md:hidden text-sm text-gray-500">Price: </span>
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-center">
                      <span className="md:hidden text-sm text-gray-500">Status: </span>
                      {item.inStock ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-500">Out of Stock</span>
                      )}
                    </div>

                    <div className="col-span-2 md:col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
                        <FiShoppingCart />
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Link 
                href="/template-2" 
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center"
              >
                Continue Shopping
              </Link>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setWishlistItems([])}
                  className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Clear Wishlist
                </button>
                <button 
                  onClick={moveAllToCart}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Move All to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}