import React from 'react';
import { Filter, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories, brands } from '../data/mockData';

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductFilters({ isOpen, onClose }: ProductFiltersProps) {
  const { state, dispatch } = useApp();

  const handleCategoryChange = (category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category === state.selectedCategory ? '' : category });
  };

  const handleBrandChange = (brand: string) => {
    dispatch({ type: 'SET_BRAND', payload: brand === state.selectedBrand ? '' : brand });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: [min, max] });
  };

  const clearAllFilters = () => {
    dispatch({ type: 'SET_CATEGORY', payload: '' });
    dispatch({ type: 'SET_BRAND', payload: '' });
    dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 5000] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <FilterContent
            state={state}
            categories={categories}
            brands={brands}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onPriceRangeChange={handlePriceRangeChange}
            onClearAll={clearAllFilters}
          />
        </div>
      </div>
    </div>
  );
}

export function DesktopFilters() {
  const { state, dispatch } = useApp();

  const handleCategoryChange = (category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category === state.selectedCategory ? '' : category });
  };

  const handleBrandChange = (brand: string) => {
    dispatch({ type: 'SET_BRAND', payload: brand === state.selectedBrand ? '' : brand });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: [min, max] });
  };

  const clearAllFilters = () => {
    dispatch({ type: 'SET_CATEGORY', payload: '' });
    dispatch({ type: 'SET_BRAND', payload: '' });
    dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 5000] });
  };

  return (
    <div className="hidden lg:block w-64 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>

      <FilterContent
        state={state}
        categories={categories}
        brands={brands}
        onCategoryChange={handleCategoryChange}
        onBrandChange={handleBrandChange}
        onPriceRangeChange={handlePriceRangeChange}
        onClearAll={clearAllFilters}
      />
    </div>
  );
}

function FilterContent({
  state,
  categories,
  brands,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onClearAll,
}: any) {
  const priceRanges = [
    { label: 'Under $500', min: 0, max: 500 },
    { label: '$500 - $1,000', min: 500, max: 1000 },
    { label: '$1,000 - $2,000', min: 1000, max: 2000 },
    { label: '$2,000 - $3,000', min: 2000, max: 3000 },
    { label: 'Over $3,000', min: 3000, max: 5000 },
  ];

  return (
    <div className="space-y-6">
      {/* Clear All */}
      <button
        onClick={onClearAll}
        className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        Clear All Filters
      </button>

      {/* Categories */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category: string) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={state.selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand: string) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={state.selectedBrand === brand}
                onChange={() => onBrandChange(brand)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={state.priceRange[0] === range.min && state.priceRange[1] === range.max}
                onChange={() => onPriceRangeChange(range.min, range.max)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}