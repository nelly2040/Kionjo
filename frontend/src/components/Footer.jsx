// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-maasai-red rounded-full flex items-center justify-center">
                <span className="text-kenyan-gold font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold">Kionjo</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting Kenyan artisans with the world through authentic, handcrafted products that celebrate cultural heritage.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition duration-200">All Products</Link></li>
              <li><Link to="/products?category=jewelry" className="text-gray-400 hover:text-white transition duration-200">Jewelry</Link></li>
              <li><Link to="/products?category=home-decor" className="text-gray-400 hover:text-white transition duration-200">Home Decor</Link></li>
              <li><Link to="/products?category=textiles" className="text-gray-400 hover:text-white transition duration-200">Textiles</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get updates on new products and artisan stories.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-kenyan-gold"
              />
              <button className="bg-maasai-red text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Kionjo. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;