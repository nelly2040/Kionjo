// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const productCategories = [
    { category: 'jewelry', label: 'Jewelry' },
    { category: 'home-decor', label: 'Home Decor' },
    { category: 'textiles', label: 'Textiles' },
    { category: 'sculptures', label: 'Sculptures' }
  ];

  return (
    <nav className="bg-kenyan-brown text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-maasai-red rounded-full flex items-center justify-center">
              <span className="text-kenyan-gold font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold">Kionjo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-kenyan-gold transition duration-200 ${
                  isActiveLink(link.path) ? 'text-kenyan-gold font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Products Dropdown */}
            <div className="relative group">
              <button className="hover:text-kenyan-gold transition duration-200 flex items-center">
                Categories
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.category}
                    to={`/products?category=${cat.category}`}
                    className="block px-4 py-2 text-charcoal hover:bg-cream hover:text-kenyan-brown transition duration-200"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
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

            <Link 
              to="/cart" 
              className="relative p-2 hover:text-kenyan-gold transition duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-maasai-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            <Link 
              to="/login" 
              className="p-2 hover:text-kenyan-gold transition duration-200"
            >
              <User className="h-6 w-6" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:text-kenyan-gold transition duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-kenyan-chocolate py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-kenyan-gold transition duration-200 ${
                    isActiveLink(link.path) ? 'text-kenyan-gold font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-kenyan-chocolate">
                <p className="text-kenyan-gold font-semibold mb-2">Categories</p>
                <div className="flex flex-col space-y-2 pl-4">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.category}
                      to={`/products?category=${cat.category}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-kenyan-gold transition duration-200"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;