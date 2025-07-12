import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Music, Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { state, dispatch } = useApp();
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: searchInput });
    navigate('/products');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Music className="h-8 w-8" />
            <span className="text-xl font-bold">MusicStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search instruments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              {isSignedIn ? (
                <div className="flex items-center space-x-2">
                  <Link to="/orders" className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    My Orders
                  </Link>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8"
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <SignInButton mode="modal">
                    <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search instruments..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </form>
            
            <nav className="space-y-2">
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Products
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </Link>
              {isSignedIn && (
                <Link
                  to="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  My Orders
                </Link>
              )}
              {!isSignedIn && (
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <SignInButton mode="modal">
                    <button className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="block w-full text-left py-2 text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}