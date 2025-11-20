// src/pages/Products.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';

const Products = () => {
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const realProducts = [
    {
      id: 1,
      name: "Maasai Beaded Necklace",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1582142306909-195724d1a6ee?w=400&h=400&fit=crop",
      category: "jewelry",
      artisan: "Maasai Women Co-op",
      origin: "Maasai Mara",
      materials: ["Glass beads", "Leather", "Brass"],
      description: "Vibrant traditional Maasai necklace handcrafted by women artisans."
    },
    {
      id: 2,
      name: "Handwoven Kiondo Basket",
      price: 32.50,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Kamba Weavers",
      origin: "Machakos",
      materials: ["Sisal fiber", "Dyed yarn"],
      description: "Traditional Kenyan basket perfect for storage or as decorative piece."
    },
    {
      id: 3,
      name: "Soapstone Carved Elephant",
      price: 78.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "sculptures",
      artisan: "Kisii Stone Carvers",
      origin: "Kisii",
      materials: ["Kisii soapstone"],
      description: "Exquisitely carved elephant sculpture from Kisii soapstone."
    },
    {
      id: 4,
      name: "Kitenge Fabric Dress",
      price: 65.75,
      image: "https://images.unsplash.com/photo-1585487000115-33b64cffd1e9?w=400&h=400&fit=crop",
      category: "clothing",
      artisan: "Nairobi Design Collective",
      origin: "Nairobi",
      materials: ["Cotton kitenge", "Synthetic blend"],
      description: "Beautiful dress made from vibrant Kenyan kitenge fabric."
    },
    {
      id: 5,
      name: "Wooden Akamba Carving Set",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "sculptures",
      artisan: "Akamba Carvers",
      origin: "Machakos",
      materials: ["Mango wood", "Ebony"],
      description: "Set of traditional animal carvings from the Akamba community."
    },
    {
      id: 6,
      name: "Beaded Leather Sandals",
      price: 55.25,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      category: "footwear",
      artisan: "Maasai Craftsmen",
      origin: "Narok",
      materials: ["Leather", "Glass beads", "Rubber sole"],
      description: "Comfortable sandals with traditional Maasai beadwork."
    },
    {
      id: 7,
      name: "Hand-painted Calabash Bowl",
      price: 28.99,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Coastal Artisans",
      origin: "Lamu",
      materials: ["Calabash", "Natural dyes"],
      description: "Traditional bowl made from calabash with hand-painted designs."
    },
    {
      id: 8,
      name: "Silver Ethiopian Cross Pendant",
      price: 89.50,
      image: "https://images.unsplash.com/photo-1582142306909-195724d1a6ee?w=400&h=400&fit=crop",
      category: "jewelry",
      artisan: "Silver Smiths Co-op",
      origin: "Nairobi",
      materials: ["Sterling silver"],
      description: "Intricate traditional cross pendant handcrafted in silver."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'sculptures', name: 'Sculptures' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'footwear', name: 'Footwear' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? realProducts 
    : realProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Kenyan Crafts</h1>
          <p className="text-gray-600 mt-2">
            Discover authentic handmade products from Kenyan artisans
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 bg-white rounded-lg border p-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex bg-white rounded-lg border overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 ${view === 'grid' ? 'bg-kenyan-brown text-white' : 'text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 ${view === 'list' ? 'bg-kenyan-brown text-white' : 'text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={
        view === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "grid grid-cols-1 gap-6"
      }>
        {filteredProducts.map((product) => (
          <div key={product.id} className={
            `bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 ${
              view === 'list' ? 'flex' : ''
            }`
          }>
            <img
              src={product.image}
              alt={product.name}
              className={
                view === 'list' 
                  ? "w-48 h-48 object-cover flex-shrink-0"
                  : "w-full h-48 object-cover"
              }
            />
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-charcoal">{product.name}</h3>
                <span className="text-kenyan-chocolate font-bold">${product.price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">By {product.artisan}</p>
              <p className="text-xs text-maasai-red mb-2">From {product.origin}</p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-kenyan-gold text-kenyan-brown px-2 py-1 rounded">
                  {product.category}
                </span>
                <Link
                  to={`/product/${product.id}`}
                  className="bg-kenyan-brown text-white py-2 px-4 rounded-lg text-sm hover:bg-kenyan-chocolate transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Products;