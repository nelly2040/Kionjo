// src/pages/admin/ProductForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    materials: [''],
    images: ['', ''],
    stock: '',
    featured: false,
    artisan: {
      name: '',
      location: '',
      story: '',
      yearsExperience: ''
    },
    origin: '',
    dimensions: '',
    careInstructions: ''
  });

  const categories = [
    'jewelry', 'textiles', 'home-decor', 'sculptures', 'art',
    'accessories', 'footwear', 'musical-instruments', 'stationery',
    'toys', 'pet-accessories'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Product data:', formData);
    alert(isEditing ? 'Product updated successfully!' : 'Product added successfully!');
    navigate('/admin/products');
  };

  const handleMaterialChange = (index, value) => {
    const newMaterials = [...formData.materials];
    newMaterials[index] = value;
    setFormData({ ...formData, materials: newMaterials });
  };

  const addMaterialField = () => {
    setFormData({ ...formData, materials: [...formData.materials, ''] });
  };

  const removeMaterialField = (index) => {
    const newMaterials = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: newMaterials });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center text-kenyan-brown hover:text-kenyan-chocolate mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-charcoal">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-semibold text-charcoal mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            required
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
            placeholder="Enter product description"
          />
        </div>

        {/* Materials */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Materials
          </label>
          {formData.materials.map((material, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={material}
                onChange={(e) => handleMaterialChange(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="Enter material"
              />
              {formData.materials.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMaterialField(index)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMaterialField}
            className="bg-kenyan-brown text-white px-4 py-2 rounded-lg hover:bg-kenyan-chocolate"
          >
            Add Material
          </button>
        </div>

        {/* Artisan Information */}
        <div>
          <h2 className="text-xl font-semibold text-charcoal mb-4">Artisan Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artisan Name *
              </label>
              <input
                type="text"
                required
                value={formData.artisan.name}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  artisan: { ...formData.artisan, name: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="Enter artisan name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.artisan.location}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  artisan: { ...formData.artisan, location: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="Enter location"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artisan Story *
              </label>
              <textarea
                required
                rows="3"
                value={formData.artisan.story}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  artisan: { ...formData.artisan, story: e.target.value }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="Tell the artisan's story"
              />
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h2 className="text-xl font-semibold text-charcoal mb-4">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin *
              </label>
              <input
                type="text"
                required
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="Enter origin location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="e.g., 15cm x 20cm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Care Instructions
              </label>
              <textarea
                rows="2"
                value={formData.careInstructions}
                onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                placeholder="Enter care instructions"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div>
          <h2 className="text-xl font-semibold text-charcoal mb-4">Product Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.images.map((image, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL {index + 1} {index === 0 && '*'}
                </label>
                <input
                  type="url"
                  required={index === 0}
                  value={image}
                  onChange={(e) => {
                    const newImages = [...formData.images];
                    newImages[index] = e.target.value;
                    setFormData({ ...formData, images: newImages });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kenyan-brown"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Product */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="h-4 w-4 text-kenyan-brown focus:ring-kenyan-brown border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
            Feature this product on the homepage
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-maasai-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200 flex items-center"
          >
            <Save className="mr-2 h-5 w-5" />
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;