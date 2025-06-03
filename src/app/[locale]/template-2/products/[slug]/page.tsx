'use client';

import { notFound } from 'next/navigation';
import { Star, Check, Truck, Shield } from 'lucide-react';
import { productData, Product } from '@/data/product';
import Topmenu from "@/app/ui/template-2/Topmenu";
import Searchbar from "@/app/ui/template-2/Searchbar";
import MainMenu from "@/app/ui/template-2/Mainmenu";
import { useState } from 'react';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

const siteProperties = {
  color: '#BE1C26',
  fontFamily: 'Poppins',
  backgroundColor: '#F7F8F7',
  logo: '/images/logo.png',
  textColor: '#000000',
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = productData.find((p) => p.slug === params.slug);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topmenu siteProperties={siteProperties} />
      <Searchbar siteProperties={siteProperties} />
      <MainMenu siteProperties={siteProperties} />

      <div className="mx-2 md:mx-10 px-0 md:px-10 mt-5 md:mt-20">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          <span className="hover:text-[#359FC1] cursor-pointer">Home</span>
          <span className="mx-2">›</span>
          <span className="hover:text-[#359FC1] cursor-pointer">Grocery</span>
          <span className="mx-2">›</span>
          <span className="hover:text-[#359FC1] cursor-pointer">Organic</span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="md:flex">
            {/* Product Gallery - Left Side */}
            <div className="md:w-2/5 p-4 lg:p-6">
              <div className="sticky top-24">
                <div className="h-80 w-full bg-gray-50 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[product.image, '/images/offer-img2.png', '/images/offer-img3.png', '/images/offer-img4.png'].map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`flex-shrink-0 w-16 h-16 rounded border overflow-hidden ${selectedImage === img ? 'border-[#359FC1]' : 'border-gray-200'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info - Middle */}
            <div className="md:w-2/5 p-4 lg:p-6 border-l border-r border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>

              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <a href="#reviews" className="text-[#359FC1] text-sm hover:underline ml-1">
                  {product.reviews} ratings
                </a>
                <span className="mx-2 text-gray-400">|</span>
                <a href="#qna" className="text-[#359FC1] text-sm hover:underline">
                  12 answered questions
                </a>
              </div>

              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="text-sm text-gray-500 mb-1">Price:</div>
                {product.price < product.originalPrice ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="line-through text-gray-400">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <div className="text-xs text-green-700 mt-1">$3.98 shipping</div>
                <div className="text-xs text-gray-500 mt-2">Available at a lower price from other sellers</div>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">About this item</h2>
                <ul className="text-sm text-gray-700 space-y-1 pl-4">
                  {product.details.split(',').map((detail, i) => (
                    <li key={i} className="list-disc">
                      {detail.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                <span className="font-medium">Note:</span> Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination.
              </div>
            </div>

            {/* Buy Box - Right Side */}
            <div className="md:w-1/5 p-4 lg:p-6">
              <div className="border border-gray-200 rounded-lg p-4 sticky top-24">
                <div className="text-xl font-bold text-gray-900 mb-2">
                  ${(product.price * quantity).toFixed(2)}
                  {quantity > 1 && (
                    <span className="text-sm text-gray-500 ml-2">
                      (${product.price.toFixed(2)} each)
                    </span>
                  )}
                </div>
                <div className="text-xs text-green-700 mb-2 flex items-center">
                  <Truck size={14} className="mr-1" />
                  FREE delivery <span className="font-medium ml-1">Friday, May 31</span>
                </div>
                <div className="text-xs text-green-700 mb-4">
                  Or fastest delivery <span className="font-medium">Tomorrow, May 28</span>. Order within <span className="font-medium">10 hrs 56 mins</span>
                </div>

                <div className="text-sm text-gray-700 mb-2 flex items-center">
                  <Check size={14} className="text-green-600 mr-1" />
                  <span>In Stock</span>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-gray-700 block mb-1">Quantity:</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= product.quantity) {
                          setQuantity(val);
                        }
                      }}
                      className="w-14 border border-gray-300 rounded p-2 text-sm text-center"
                      min={1}
                      max={product.quantity}
                    />
                    <button
                      onClick={() => setQuantity(prev => Math.min(product.quantity, prev + 1))}
                      className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                      disabled={quantity >= product.quantity}
                    >
                      +
                    </button>
                  </div>
                  {product.quantity > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {product.quantity} available
                    </div>
                  )}
                </div>

                <button className="w-full bg-[#1f52cc] hover:bg-[#359FC1] border border-[#359FC1] rounded-full py-2 text-sm font-medium mb-2 text-white">
                  Add to Cart
                </button>
                <button className="w-full bg-[#359FC1] hover:bg-[#1f52cc] border border-[#359FC1] rounded-full py-2 text-sm font-medium text-white">
                  Buy Now
                </button>

                <div className="text-xs text-gray-500 mt-4 flex items-start">
                  <input type="checkbox" id="gift" className="mr-2 mt-1" />
                  <label htmlFor="gift">Add a gift receipt for easy returns</label>
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4 text-xs">
                  <div className="flex items-center text-[#359FC1] mb-2">
                    <Shield size={14} className="mr-1" />
                    <span className="font-medium">Add Protection Plan</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Delivery</span>
                    <span className="font-medium">Friday, May 31</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sold by</span>
                    <span className="text-[#359FC1] hover:underline cursor-pointer">OrganicMarket</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'description' ? 'text-[#359FC1] border-b-2 border-[#359FC1]' : 'text-gray-600'}`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'details' ? 'text-[#359FC1] border-b-2 border-[#359FC1]' : 'text-gray-600'}`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'reviews' ? 'text-[#359FC1] border-b-2 border-[#359FC1]' : 'text-gray-600'}`}
              >
                Customer Reviews
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Product Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              )}
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Product Details</h3>
                  <table className="text-sm text-gray-700">
                    <tbody>
                      <tr>
                        <td className="font-medium py-1 pr-4">Product Dimensions</td>
                        <td className="py-1">5 x 5 x 5 inches; 1.2 Pounds</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 pr-4">Item Weight</td>
                        <td className="py-1">1.2 pounds</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 pr-4">Manufacturer</td>
                        <td className="py-1">Organic Farms Co.</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 pr-4">ASIN</td>
                        <td className="py-1">B08XYZ1234</td>
                      </tr>
                      <tr>
                        <td className="font-medium py-1 pr-4">Country of Origin</td>
                        <td className="py-1">USA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Customer Reviews</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{product.rating} out of 5</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-4">{product.reviews} global ratings</div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center">
                        <span className="text-xs w-10">{star} star</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mx-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${(star === 5 ? 72 : star === 4 ? 15 : star === 3 ? 8 : star === 2 ? 3 : 2)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-[#359FC1] hover:underline cursor-pointer">
                          {star === 5 ? '72%' : star === 4 ? '15%' : star === 3 ? '8%' : star === 2 ? '3%' : '2%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Frequently bought together */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently bought together</h3>
          <div className="flex flex-wrap items-center gap-4">
            {productData.slice(0, 3).map((related) => (
              <div key={related.id} className="flex items-center">
                <div className="w-20 h-20 bg-gray-100 rounded border border-gray-200 p-2">
                  <img src={related.image} alt={related.name} className="w-full h-full object-contain" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-[#359FC1] hover:underline cursor-pointer">{related.name}</div>
                  <div className="text-sm font-bold">${related.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
            <div className="border-l border-gray-200 pl-4 ml-4">
              <div className="text-sm mb-2">Total price: <span className="font-bold">${(product.price + productData[0].price + productData[1].price).toFixed(2)}</span></div>
              <button className="text-xs bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-1 px-3 font-medium">
                Add all three to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Customers who viewed this item also viewed</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {productData.slice(0, 5).map((related) => (
              <div key={related.id} className="group">
                <Link href={`/template-2/products/${related.slug}`}>
                  <div className="h-40 bg-gray-100 p-4 rounded-t-lg flex items-center justify-center">
                    <img src={related.image} alt={related.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-2 border border-t-0 border-gray-200 rounded-b-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{related.name}</h4>
                    <div className="flex items-center mb-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-xs text-gray-600">{related.rating} ({related.reviews})</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      ${related.price.toFixed(2)}
                      {related.price < related.originalPrice && (
                        <span className="ml-1 text-xs text-gray-400 line-through">${related.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="text-xs text-green-700 mt-1">Prime</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}