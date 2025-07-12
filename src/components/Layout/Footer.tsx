import React, { useState } from 'react';
import { Music, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Save subscription to localStorage
      const existingSubscriptions = JSON.parse(localStorage.getItem('musicStore_subscriptions') || '[]');
      const newSubscription = {
        email,
        subscribedAt: new Date().toISOString(),
      };
      localStorage.setItem('musicStore_subscriptions', JSON.stringify([...existingSubscriptions, newSubscription]));
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">MusicStore</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your premier destination for high-quality musical instruments and equipment. 
              Serving musicians worldwide since 1995.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/shipping" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="/warranty" className="hover:text-white transition-colors">Warranty</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/products?category=guitars" className="hover:text-white transition-colors">Guitars</a></li>
              <li><a href="/products?category=drums" className="hover:text-white transition-colors">Drums</a></li>
              <li><a href="/products?category=keyboards" className="hover:text-white transition-colors">Keyboards</a></li>
              <li><a href="/products?category=amplifiers" className="hover:text-white transition-colors">Amplifiers</a></li>
              <li><a href="/products?category=audio" className="hover:text-white transition-colors">Audio Equipment</a></li>
              <li><a href="/products?category=accessories" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest products and exclusive deals.
            </p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </form>
            {subscribed && (
              <p className="text-green-400 text-sm mb-4">Successfully subscribed!</p>
            )}
            
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-MUSIC-01</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@musicstore.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Music Street, Nashville, TN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MusicStore. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}