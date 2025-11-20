// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Globe } from 'lucide-react';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Maasai Beaded Necklace",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1582142306909-195724d1a6ee?w=400&h=400&fit=crop",
      category: "jewelry",
      artisan: "Maasai Women Co-op",
      origin: "Maasai Mara"
    },
    {
      id: 2,
      name: "Handwoven Kiondo Basket",
      price: 32.50,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Kamba Weavers",
      origin: "Machakos"
    },
    {
      id: 3,
      name: "Soapstone Carved Elephant",
      price: 78.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "sculptures",
      artisan: "Kisii Stone Carvers",
      origin: "Kisii"
    },
    {
      id: 4,
      name: "Kitenge Fabric Dress",
      price: 65.75,
      image: "https://images.unsplash.com/photo-1585487000115-33b64cffd1e9?w=400&h=400&fit=crop",
      category: "clothing",
      artisan: "Nairobi Design Collective",
      origin: "Nairobi"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-kenyan-brown to-kenyan-chocolate text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Authentic Kenyan Heritage
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Delivered Worldwide
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto">
              Discover handcrafted treasures from Kenyan artisans. Each piece tells a story of tradition, skill, and cultural heritage.
            </p>
            <div className="space-x-4">
              <Link
                to="/products"
                className="bg-maasai-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200 inline-flex items-center"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/products?category=featured"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-kenyan-brown transition duration-200"
              >
                Featured Crafts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-kenyan-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-kenyan-brown" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Crafts</h3>
              <p className="text-gray-600">Direct from Kenyan artisans, ensuring authenticity and fair trade practices.</p>
            </div>
            <div className="text-center">
              <div className="bg-kenyan-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-kenyan-brown" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Worldwide Shipping</h3>
              <p className="text-gray-600">We deliver Kenyan heritage to your doorstep, no matter where you are.</p>
            </div>
            <div className="text-center">
              <div className="bg-kenyan-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-kenyan-brown" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cultural Impact</h3>
              <p className="text-gray-600">Your purchase supports traditional crafts and artisan communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Featured Crafts
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of authentic Kenyan crafts showcasing the rich cultural heritage of different communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-charcoal">{product.name}</h3>
                    <span className="text-kenyan-chocolate font-bold">${product.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">By {product.artisan}</p>
                  <p className="text-xs text-maasai-red mb-4">From {product.origin}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full bg-kenyan-brown text-white py-2 px-4 rounded-lg text-center block hover:bg-kenyan-chocolate transition duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-maasai-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 inline-flex items-center"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;