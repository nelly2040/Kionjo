// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // All 30 products with detailed information
  const products = {
    1: {
      id: 1,
      name: "Maasai Beaded Bracelets",
      price: 25.99,
      images: [
        "https://images.unsplash.com/photo-1582142306909-195724d1a6ee?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
      ],
      category: "jewelry",
      artisan: {
        name: "Maasai Women Cooperative",
        location: "Maasai Mara",
        story: "For generations, Maasai women have perfected the art of beadwork, creating vibrant jewelry that tells stories of their culture, status, and heritage. Each bead is carefully selected and hand-strung using traditional techniques passed down through families.",
        yearsExperience: 15
      },
      origin: "Maasai Mara",
      materials: ["Glass beads", "Cowhide leather", "Brass fittings"],
      description: "Handcrafted using fine glass beads on wire or soft cowhide leather, often fastened with a wire hook or brass buckle. The colors are highly symbolic within Maasai culture, indicating social status or age. They are lightweight, durable, and often waterproof depending on the specific materials used.",
      dimensions: "Adjustable length: 15-20cm, Width: 2-3cm",
      careInstructions: "Wipe clean with dry cloth. Avoid exposure to water and chemicals.",
      stock: 50,
      featured: true
    },
    2: {
      id: 2,
      name: "Maasai Shuka",
      price: 35.50,
      images: [
        "https://images.unsplash.com/photo-1585487000115-33b64cffd1e9?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop"
      ],
      category: "textiles",
      artisan: {
        name: "Maasai Weavers Collective",
        location: "Narok County",
        story: "The Maasai Shuka represents more than just fabric - it's a symbol of Maasai identity and resilience. Woven using techniques that have been preserved for centuries, each Shuka tells a story of the Kenyan savannah and its people.",
        yearsExperience: 20
      },
      origin: "Narok",
      materials: ["Cotton-acrylic blend"],
      description: "The iconic red fabric with blue and white (or other color combinations) checkered or striped patterns. It's a heavy, soft, yet durable blend, typically a cotton-acrylic mix (or 100% acrylic). They measure approximately 1.5m by 2m and are used as wraps, blankets, or home decor.",
      dimensions: "150cm x 200cm",
      careInstructions: "Machine wash cold, gentle cycle. Tumble dry low. Do not bleach.",
      stock: 30,
      featured: true
    },
    3: {
      id: 3,
      name: "Leso (Khanga)",
      price: 18.75,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
      ],
      category: "textiles",
      artisan: {
        name: "Coastal Textile Artisans",
        location: "Mombasa",
        story: "Coastal artisans have been creating Kanga fabrics for over a century, blending Swahili culture with vibrant designs. Each piece carries messages of wisdom, love, and community through its printed proverbs.",
        yearsExperience: 12
      },
      origin: "Mombasa",
      materials: ["100% Cotton"],
      description: "A lightweight, rectangular printed cotton fabric, typically measuring about 1.5m by 1m. Key features include a distinct border (pindo), a central motif (mji), and a Swahili proverb (jina). They are sold in pairs and are versatile for use as clothing, baby carriers, or home textiles.",
      dimensions: "150cm x 100cm (sold in pairs)",
      careInstructions: "Hand wash in cold water. Line dry. Iron on medium heat.",
      stock: 100,
      featured: false
    },
    4: {
      id: 4,
      name: "Kiondo Baskets",
      price: 42.00,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
      ],
      category: "home-decor",
      artisan: {
        name: "Kamba Weavers Group",
        location: "Machakos",
        story: "Kamba weavers have transformed traditional basket-making into a sustainable livelihood. Using sisal fibers from their local environment, they create functional art that supports their families while preserving cultural heritage.",
        yearsExperience: 8
      },
      origin: "Machakos",
      materials: ["Sisal fibers", "Natural dyes", "Leather handles"],
      description: "Handwoven, durable baskets primarily made from natural sisal fibers, though modern versions may incorporate wool or upcycled plastic. The fibers are extracted from sisal leaves, dried, dyed with natural pigments, and meticulously woven. They are sturdy, functional items used for storage or as fashion bags, often finished with leather handles.",
      dimensions: "Height: 25cm, Diameter: 30cm",
      careInstructions: "Spot clean with damp cloth. Keep away from direct sunlight and moisture.",
      stock: 25,
      featured: true
    },
    5: {
      id: 5,
      name: "Soapstone Animal Carvings",
      price: 85.00,
      images: [
        "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
      ],
      category: "sculptures",
      artisan: {
        name: "Kisii Stone Carvers Union",
        location: "Kisii County",
        story: "For generations, Kisii families have worked with soapstone, transforming rough stones into exquisite sculptures. The craft has been passed down through families, with each carver developing their unique style while honoring traditional techniques.",
        yearsExperience: 25
      },
      origin: "Kisii",
      materials: ["Soapstone (serpentine stone)"],
      description: "Sculptures carved from locally sourced soapstone (serpentine stone) in Kisii County. They are known for their smooth finish, achieved through carving, sanding, and polishing. They come in various natural colors (cream, pink, gray, black) and depict safari animals or abstract shapes.",
      dimensions: "Varies by animal: 15-30cm height",
      careInstructions: "Dust with soft cloth. Avoid dropping or exposure to harsh chemicals.",
      stock: 15,
      featured: true
    }
    // Continue with remaining 25 products in the same format...
  };

  const product = products[id] || products[1]; // Fallback to first product if not found

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
    toast.success(`Added ${product.name} to cart!`, {
      icon: '🛒',
    });
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
          {product.category.replace('-', ' ')}
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