// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, fetch from API
  const product = {
    id: 1,
    name: "Maasai Beaded Necklace",
    price: 45.99,
    images: [
      "https://images.unsplash.com/photo-1582142306909-195724d1a6ee?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop"
    ],
    category: "jewelry",
    artisan: {
      name: "Maasai Women Co-operative",
      location: "Maasai Mara",
      story: "For generations, Maasai women have perfected the art of beadwork, creating vibrant jewelry that tells stories of their culture, status, and heritage. Each piece is meticulously handcrafted using traditional techniques passed down through families.",
      yearsExperience: 15
    },
    origin: "Maasai Mara",
    materials: ["Glass beads", "Leather cord", "Brass fittings"],
    description: "This stunning Maasai beaded necklace is a masterpiece of traditional craftsmanship. Each bead is carefully selected and hand-strung to create patterns that represent Maasai cultural symbols and stories. The necklace features vibrant red beads, symbolizing bravery and unity, combined with other colors that represent aspects of Maasai life and the Kenyan landscape.",
    dimensions: "Length: 45cm, Pendant: 8cm x 5cm",
    careInstructions: "Keep away from moisture and chemicals. Wipe clean with dry cloth.",
    stock: 15,
    featured: true
  };

  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-kenyan-brown">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-kenyan-brown">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-kenyan-brown capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg border overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-maasai-red' : 'border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">{product.name}</h1>
              <p className="text-maasai-red font-semibold">From {product.origin}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-kenyan-chocolate">${product.price}</span>
            <span className="ml-2 text-sm text-gray-600">USD</span>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Artisan Story */}
          <div className="bg-cream rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg mb-2">Artisan Story</h3>
            <p className="text-gray-700 mb-2">{product.artisan.story}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-kenyan-brown font-semibold">
                Crafted by {product.artisan.name}
              </span>
              <span className="text-gray-600">
                {product.artisan.yearsExperience} years of experience
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Materials</h4>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span
                    key={index}
                    className="bg-kenyan-gold text-kenyan-brown px-3 py-1 rounded-full text-sm"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Dimensions:</span>
                <p className="text-gray-600">{product.dimensions}</p>
              </div>
              <div>
                <span className="font-semibold">Care:</span>
                <p className="text-gray-600">{product.careInstructions}</p>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="border-t pt-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {product.stock} available
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-maasai-red text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {product.stock === 0 && (
              <p className="text-red-600 text-center mt-2">Out of Stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;