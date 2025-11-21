// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-maasai-red rounded-full flex items-center justify-center">
                <span className="text-kenyan-gold font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold">Kionjo</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting Kenyan artisans with the world through authentic, handcrafted products that celebrate cultural heritage.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@kionjo.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
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
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition duration-200">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelry" className="text-gray-400 hover:text-white transition duration-200">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/products?category=home-decor" className="text-gray-400 hover:text-white transition duration-200">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/products?category=sculptures" className="text-gray-400 hover:text-white transition duration-200">
                  Sculptures
                </Link>
              </li>
              <li>
                <Link to="/products?category=textiles" className="text-gray-400 hover:text-white transition duration-200">
                  Textiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Artisan Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Careers
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-3">
                Get updates on new products and artisan stories.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-kenyan-gold text-sm"
                />
                <button className="bg-maasai-red text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition duration-200 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 Kionjo. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Preserving Kenyan heritage, one craft at a time.
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-200">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center space-x-1">
              <span>🛡️</span>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🌱</span>
              <span>Eco-Friendly Packaging</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🤝</span>
              <span>Fair Trade Certified</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🚚</span>
              <span>Worldwide Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;