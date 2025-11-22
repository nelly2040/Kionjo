// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: [
      'jewelry', 'textiles', 'home-decor', 'sculptures', 'art',
      'accessories', 'footwear', 'musical-instruments', 'stationery',
      'toys', 'pet-accessories'
    ]
  },
  images: [{
    type: String,
    required: [true, 'At least one product image is required']
  }],
  artisan: {
    name: {
      type: String,
      required: [true, 'Artisan name is required']
    },
    location: {
      type: String,
      required: [true, 'Artisan location is required']
    },
    story: {
      type: String,
      required: [true, 'Artisan story is required']
    },
    yearsExperience: {
      type: Number,
      min: 0
    }
  },
  origin: {
    type: String,
    required: [true, 'Product origin is required']
  },
  materials: [{
    type: String,
    required: [true, 'At least one material is required']
  }],
  dimensions: String,
  careInstructions: String,
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ 
  name: 'text', 
  description: 'text', 
  'artisan.name': 'text',
  materials: 'text'
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.originalPrice || this.originalPrice <= this.price) return 0;
  return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

const Product = mongoose.model('Product', productSchema);

export default Product;