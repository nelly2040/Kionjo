// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['jewelry', 'home-decor', 'sculptures', 'clothing', 'footwear', 'textiles']
  },
  images: [{
    type: String,
    required: true
  }],
  artisan: {
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    story: {
      type: String,
      required: true
    },
    yearsExperience: {
      type: Number,
      default: 0
    }
  },
  materials: [{
    type: String,
    required: true
  }],
  origin: {
    type: String,
    required: true
  },
  dimensions: String,
  careInstructions: String,
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text', category: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;