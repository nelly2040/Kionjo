// backend/routes/products.js
import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadProductImages } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);

// Protected admin routes
router.post('/', [
  protect,
  authorize('admin'),
  uploadProductImages,
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category is required')
], createProduct);

router.put('/:id', [
  protect,
  authorize('admin'),
  uploadProductImages
], updateProduct);

router.delete('/:id', [
  protect,
  authorize('admin')
], deleteProduct);

export default router;