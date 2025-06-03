import React from 'react';

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-1">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const ShopFilterSidebar = () => {
  return (
    <aside className="w-full p-6 border rounded-xl shadow-sm bg-white text-sm text-gray-700">
      {/* Product Category */}
      <FilterSection title="Product Category">
        {['Electronics', 'Smart Watch', 'Storage', 'Portable Devices', 'Action Camera'].map(
          (category, index) => (
            <label key={index} className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" />
              <span>{category}</span>
            </label>
          )
        )}
      </FilterSection>

      {/* Filter by Price */}
      <FilterSection title="Filter by Price">
        <input type="range" min="0" max="1000" className="w-full accent-blue-500" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span>$1000</span>
        </div>
        <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition">
          Apply Filter
        </button>
      </FilterSection>

      {/* Filter by Rating */}
      <FilterSection title="Filter by Rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <label key={star} className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <input type="radio" name="rating" className="accent-blue-500" />
            <span className="text-yellow-500">{'★'.repeat(star)}{'☆'.repeat(5 - star)}</span>
          </label>
        ))}
      </FilterSection>

      {/* Filter by Color */}
      <FilterSection title="Filter by Color">
        {['Black', 'Blue', 'Gray', 'Green', 'Red', 'White', 'Purple'].map((color) => (
          <label key={color} className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <input type="radio" name="color" className="accent-blue-500" />
            <span>{color}</span>
          </label>
        ))}
      </FilterSection>

      {/* Filter by Brand */}
      <FilterSection title="Filter by Brand">
        {['Apple', 'Samsung', 'Microsoft', 'HP', 'DELL', 'Redmi'].map((brand, index) => (
          <label key={index} className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
            <input type="checkbox" className="accent-blue-500" />
            <span>{brand}</span>
          </label>
        ))}
      </FilterSection>
    </aside>
  );
};

export default ShopFilterSidebar;
