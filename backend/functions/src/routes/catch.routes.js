import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { uploadCatch } from '../controllers/catch.controller.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/upload', requireAuth, requireRole('VENDOR'), upload.single('image'), uploadCatch);

export default router;