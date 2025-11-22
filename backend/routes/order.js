// backend/routes/orders.js
import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  getUserOrders,
  processPayment
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getUserOrders);
router.get('/:id', protect, getOrder);
router.post('/:id/payment', protect, processPayment);

// Admin routes
router.get('/', [protect, authorize('admin')], getOrders);
router.put('/:id/status', [protect, authorize('admin')], updateOrderStatus);

export default router;