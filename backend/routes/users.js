// backend/routes/users.js
import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  getUserOrders
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Admin only routes
router.get('/', [protect, authorize('admin')], getUsers);
router.get('/:id', [protect, authorize('admin')], getUser);
router.put('/:id', [protect, authorize('admin')], updateUser);
router.get('/:id/orders', [protect, authorize('admin')], getUserOrders);

export default router;