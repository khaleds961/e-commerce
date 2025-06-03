'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { categoryData, productData } from '../../../../../data/product';
import ProductCard from '@/app/ui/template-2/ProductCard';
import Topmenu from '@/app/ui/template-2/Topmenu';
import Searchbar from '@/app/ui/template-2/Searchbar';
import MainMenu from '@/app/ui/template-2/Mainmenu';
import ShopFilterSidebar from '../../../../ui/template-2/ShopFilterSidebar';

const siteProperties = {
  color: '#BE1C26',
  fontFamily: 'Poppins',
  backgroundColor: '#F7F8F7',
  logo: '/images/logo.png',
  textColor: '#000000',
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;
  const locale = params?.locale;

  const [showFilters, setShowFilters] = useState(false);

  const category = categoryData.find(c => c.slug === slug);

  if (!category) {
    return <p className="p-8 text-center text-lg">Category not found.</p>;
  }

  const filteredProducts = productData.filter(product =>
    Array.isArray(product.category_id)
      ? product.category_id.includes(category.id)
      : product.category_id === category.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Topmenu siteProperties={siteProperties} />
      <Searchbar siteProperties={siteProperties} />
      <MainMenu siteProperties={siteProperties} />

      <div className="w-full px-4 sm:px-6 md:px-10 py-6 md:py-10 flex flex-col md:flex-row gap-6 mt-10">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4">
          <button
            className="w-full bg-white border border-gray-300 text-sm px-4 py-3 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            onClick={() => setShowFilters(prev => !prev)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            w-full md:w-64 flex-shrink-0
            ${showFilters ? 'block' : 'hidden'} 
            md:block
            transform transition-all duration-300 ease-in-out
            ${showFilters ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100'}
            absolute md:static top-0 left-0 h-full md:h-auto z-20 md:z-auto bg-gray-50 md:bg-transparent p-4 md:p-0
          `}
          // Added a click handler to hide sidebar when clicking outside (on mobile)
          onClick={() => { if(showFilters && window.innerWidth < 768) setShowFilters(false); }}
        >
          <ShopFilterSidebar />
        </aside>

        {/* Overlay for mobile sidebar */}
        {showFilters && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setShowFilters(false)}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">{category.name}</h1>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    description: product.description,
                    category: {
                      id: category.id,
                      name: category.name,
                      slug: category.slug,
                    },
                    images: [product.image],
                    slug: product.slug,
                    creationAt: '', // Populate if available from product data
                    updatedAt: '', // Populate if available from product data
                    originalPrice: product.originalPrice,
                    rating: product.rating,
                    reviews: product.reviews,
                    quantity: product.quantity,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No products found in this category.</p>
              <p className="text-sm text-gray-400 mt-2">Category: {category.name}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}