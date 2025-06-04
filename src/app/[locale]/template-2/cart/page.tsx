'use client';

import { useState } from 'react';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      quantity: 1,
      image: '/images/headphones.webp',
      color: 'Black',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      price: 199.99,
      quantity: 2,
      image: '/images/headphones.webp',
      color: 'Silver',
      inStock: true
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      price: 59.99,
      quantity: 1,
      image: '/images/headphones.webp',
      color: 'Blue',
      inStock: true
    },
    {
      id: 4,
      name: 'Portable Bluetooth Speaker',
      price: 59.99,
      quantity: 1,
      image: '/images/headphones.webp',
      color: 'Blue',
      inStock: true
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 ">
        <div className="flex items-center gap-2 mb-8">
          <FiShoppingCart className="text-2xl text-blue-600" />
          <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FiShoppingCart className="mx-auto text-4xl text-gray-300 mb-4" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
            <Link 
              href="/template-2" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="hidden md:grid grid-cols-12 bg-[#155dfc] p-4 text-sm font-medium text-white">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <div key={item.id} className="p-4 grid grid-cols-2 md:grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 md:col-span-5 flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">Color: {item.color}</p>
                          {!item.inStock && (
                            <span className="text-xs text-red-500">Out of stock</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2 text-center">
                        <span className="md:hidden text-sm text-gray-500">Price: </span>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>

                      <div className="col-span-1 md:col-span-3 flex items-center justify-center">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus className="text-gray-600" />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                          >
                            <FiPlus className="text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 md:col-span-2 flex items-center justify-end gap-2">
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 ml-2"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Link 
                  href="/template-2" 
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </Link>
                <button 
                  onClick={() => setCartItems([])}
                  className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-sm text-gray-500">
                  <p>Free shipping on orders over $100</p>
                  <p>Estimated delivery: 2-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}