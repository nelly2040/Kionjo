// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { getCartItemsCount } = useCart();

  return (
    <nav className="bg-kenyan-brown text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-maasai-red rounded-full flex items-center justify-center">
              <span className="text-kenyan-gold font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold">Kionjo</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-kenyan-gold transition duration-200">
              Home
            </Link>
            <Link to="/products" className="hover:text-kenyan-gold transition duration-200">
              Products
            </Link>
            <Link to="/about" className="hover:text-kenyan-gold transition duration-200">
              About
            </Link>
            <Link to="/contact" className="hover:text-kenyan-gold transition duration-200">
              Contact
            </Link>
            <Link to="/products?category=jewelry" className="hover:text-kenyan-gold transition duration-200">
              Jewelry
            </Link>
            <Link to="/products?category=home-decor" className="hover:text-kenyan-gold transition duration-200">
              Home Decor
            </Link>
            <Link to="/products?category=textiles" className="hover:text-kenyan-gold transition duration-200">
              Textiles
            </Link>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search crafts..."
                className="bg-kenyan-chocolate text-white placeholder-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-kenyan-gold w-64"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-300" />
            </div>

            <Link to="/cart" className="relative p-2 hover:text-kenyan-gold transition duration-200">
              <ShoppingCart className="h-6 w-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-maasai-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* User Section */}
            <Link to="/login" className="p-2 hover:text-kenyan-gold transition duration-200">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;