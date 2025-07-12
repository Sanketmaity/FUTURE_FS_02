import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch, state } = useApp();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const isInCart = state.cart.some(item => item.product.id === product.id);

  return (
    // <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
    //   <div className="relative overflow-hidden">
    //     <img
    //       src={product.image}
    //       alt={product.name}
    //       className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
    //     />
    //     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
    //     {product.inStock < 5 && (
    //       <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
    //         Only {product.inStock} left
    //       </div>
    //     )}
    //   </div>
      
    //   <div className="p-6">
    //     <div className="mb-2">
    //       <span className="text-sm text-blue-600 font-medium">{product.brand}</span>
    //       <span className="text-gray-400 mx-2">•</span>
    //       <span className="text-sm text-gray-600">{product.category}</span>
    //     </div>
        
    //     <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
    //     <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
    //     <div className="flex items-center mb-3">
    //       <div className="flex items-center">
    //         {[...Array(5)].map((_, i) => (
    //           <Star
    //             key={i}
    //             className={`h-4 w-4 ${
    //               i < Math.floor(product.rating)
    //                 ? 'text-yellow-400 fill-current'
    //                 : 'text-gray-300'
    //             }`}
    //           />
    //         ))}
    //       </div>
    //       <span className="text-sm text-gray-600 ml-2">
    //         {product.rating} ({product.reviews} reviews)
    //       </span>
    //     </div>
        
    //     <div className="flex items-center justify-between">
    //       <div className="text-2xl font-bold text-gray-900">
    //         ${product.price.toLocaleString()}
    //       </div>
          
    //       <button
    //         onClick={handleAddToCart}
    //         disabled={product.inStock === 0}
    //         className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
    //           product.inStock === 0
    //             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
    //             : isInCart
    //             ? 'bg-green-600 hover:bg-green-700 text-white'
    //             : 'bg-blue-600 hover:bg-blue-700 text-white'
    //         }`}
    //       >
    //         <ShoppingCart className="h-4 w-4" />
    //         <span>
    //           {product.inStock === 0
    //             ? 'Out of Stock'
    //             : isInCart
    //             ? 'Added'
    //             : 'Add to Cart'
    //           }
    //         </span>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col">
  {/* Image Section */}
  <div className="relative overflow-hidden">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
    {product.inStock < 5 && (
      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
        Only {product.inStock} left
      </div>
    )}
  </div>

  {/* Content Section */}
  <div className="flex flex-col justify-between flex-1 p-6">
    <div>
      {/* Title and category */}
      <div className="mb-2">
        <span className="text-sm text-blue-600 font-medium">{product.brand}</span>
        <span className="text-gray-400 mx-2">•</span>
        <span className="text-sm text-gray-600">{product.category}</span>
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-2">
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>
    </div>

    {/* Price and Button aligned bottom */}
    <div className="flex items-center justify-between mt-4">
      <div className="text-2xl font-bold text-gray-900">
        ${product.price.toLocaleString()}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={product.inStock === 0}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          product.inStock === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : isInCart
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        <ShoppingCart className="h-4 w-4" />
        <span>
          {product.inStock === 0
            ? 'Out of Stock'
            : isInCart
            ? 'Added'
            : 'Add to Cart'}
        </span>
      </button>
    </div>
  </div>
</div>

  );
}