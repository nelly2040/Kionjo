// src/pages/admin/Products.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Maasai Beaded Bracelets",
      price: 25.99,
      category: "jewelry",
      stock: 50,
      featured: true,
      status: "active"
    },
    {
      id: 2,
      name: "Maasai Shuka",
      price: 35.50,
      category: "textiles",
      stock: 30,
      featured: true,
      status: "active"
    },
    {
      id: 3,
      name: "Leso (Khanga)",
      price: 18.75,
      category: "textiles",
      stock: 100,
      featured: false,
      status: "active"
    },
    {
      id: 4,
      name: "Kiondo Baskets",
      price: 42.00,
      category: "home-decor",
      stock: 25,
      featured: true,
      status: "active"
    },
    {
      id: 5,
      name: "Soapstone Animal Carvings",
      price: 85.00,
      category: "sculptures",
      stock: 15,
      featured: true,
      status: "active"
    },
    {
      id: 6,
      name: "Wooden Utensils",
      price: 28.50,
      category: "home-decor",
      stock: 40,
      featured: false,
      status: "active"
    },
    {
      id: 7,
      name: "Beaded Dog Collars",
      price: 32.99,
      category: "pet-accessories",
      stock: 35,
      featured: false,
      status: "active"
    },
    {
      id: 8,
      name: "Calabash Gourds (Mbeve)",
      price: 22.75,
      category: "home-decor",
      stock: 20,
      featured: false,
      status: "active"
    },
    {
      id: 9,
      name: "Recycled Flip-Flop Animals",
      price: 45.00,
      category: "sculptures",
      stock: 28,
      featured: true,
      status: "active"
    },
    {
      id: 10,
      name: "Tingatinga Paintings",
      price: 120.00,
      category: "art",
      stock: 12,
      featured: false,
      status: "active"
    },
    {
      id: 11,
      name: "Banana Fiber Crafts",
      price: 35.25,
      category: "home-decor",
      stock: 45,
      featured: false,
      status: "active"
    },
    {
      id: 12,
      name: "Akala (Leather Sandals)",
      price: 38.50,
      category: "footwear",
      stock: 30,
      featured: false,
      status: "active"
    },
    {
      id: 13,
      name: "Wire Art Sculptures",
      price: 55.00,
      category: "sculptures",
      stock: 22,
      featured: true,
      status: "active"
    },
    {
      id: 14,
      name: "Coconut Shell Crafts",
      price: 19.99,
      category: "home-decor",
      stock: 60,
      featured: false,
      status: "active"
    },
    {
      id: 15,
      name: "Maasai Beaded Necklaces",
      price: 65.00,
      category: "jewelry",
      stock: 18,
      featured: true,
      status: "active"
    },
    {
      id: 16,
      name: "Wooden Masks",
      price: 75.50,
      category: "art",
      stock: 15,
      featured: false,
      status: "active"
    },
    {
      id: 17,
      name: "Sisal Mats",
      price: 48.00,
      category: "home-decor",
      stock: 25,
      featured: false,
      status: "active"
    },
    {
      id: 18,
      name: "Kikoy Fabric",
      price: 29.75,
      category: "textiles",
      stock: 80,
      featured: false,
      status: "active"
    },
    {
      id: 19,
      name: "Embroidered Textiles",
      price: 52.00,
      category: "textiles",
      stock: 35,
      featured: false,
      status: "active"
    },
    {
      id: 20,
      name: "Bone Crafts",
      price: 41.25,
      category: "jewelry",
      stock: 28,
      featured: false,
      status: "active"
    },
    {
      id: 21,
      name: "Horn Crafts",
      price: 67.00,
      category: "home-decor",
      stock: 20,
      featured: false,
      status: "active"
    },
    {
      id: 22,
      name: "Traditional Drums",
      price: 150.00,
      category: "musical-instruments",
      stock: 8,
      featured: true,
      status: "active"
    },
    {
      id: 23,
      name: "Beaded Belts",
      price: 45.50,
      category: "accessories",
      stock: 32,
      featured: false,
      status: "active"
    },
    {
      id: 24,
      name: "Pottery (Clay Pots)",
      price: 38.00,
      category: "home-decor",
      stock: 40,
      featured: false,
      status: "active"
    },
    {
      id: 25,
      name: "Handmade Paper Crafts",
      price: 22.99,
      category: "stationery",
      stock: 75,
      featured: false,
      status: "active"
    },
    {
      id: 26,
      name: "Carved Wooden Walking Sticks",
      price: 55.75,
      category: "accessories",
      stock: 18,
      featured: false,
      status: "active"
    },
    {
      id: 27,
      name: "Musical Instruments",
      price: 95.00,
      category: "musical-instruments",
      stock: 12,
      featured: false,
      status: "active"
    },
    {
      id: 28,
      name: "Beaded Coasters",
      price: 28.50,
      category: "home-decor",
      stock: 50,
      featured: false,
      status: "active"
    },
    {
      id: 29,
      name: "Fabric Dolls",
      price: 32.25,
      category: "toys",
      stock: 35,
      featured: false,
      status: "active"
    },
    {
      id: 30,
      name: "Recycled Metal Art Sculptures",
      price: 88.00,
      category: "sculptures",
      stock: 15,
      featured: true,
      status: "active"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [
    'all', 'jewelry', 'textiles', 'home-decor', 'sculptures', 'art',
    'accessories', 'footwear', 'musical-instruments', 'stationery',
    'toys', 'pet-accessories'
  ];

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryDisplayName = (category) => {
    return category === 'all' ? 'All Categories' : category.replace('-', ' ');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Manage Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-maasai-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Product
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryDisplayName(category)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-kenyan-brown text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-charcoal">{product.name}</div>
                        {product.featured && (
                          <span className="inline-block bg-maasai-red text-white text-xs px-2 py-1 rounded-full mt-1">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 capitalize">{product.category.replace('-', ' ')}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-kenyan-chocolate">${product.price}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${
                      product.stock > 20 ? 'text-green-600' : 
                      product.stock > 5 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="text-kenyan-brown hover:text-kenyan-chocolate flex items-center"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-cream rounded-lg p-8 max-w-md mx-auto">
              <p className="text-gray-600 text-lg mb-4">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                }}
                className="bg-maasai-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-kenyan-chocolate">{products.length}</div>
          <div className="text-sm text-gray-600">Total Products</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {products.filter(p => p.featured).length}
          </div>
          <div className="text-sm text-gray-600">Featured Products</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {products.filter(p => p.stock < 10).length}
          </div>
          <div className="text-sm text-gray-600">Low Stock</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-charcoal">
            {categories.length - 1}
          </div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
      </div>
    </div>
  );
};

export default Products;