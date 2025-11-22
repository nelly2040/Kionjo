// backend/routes/upload.js
import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadProductImages } from '../middleware/upload.js';

const router = express.Router();

router.post('/', [protect, authorize('admin'), uploadProductImages], uploadImage);

export default router;