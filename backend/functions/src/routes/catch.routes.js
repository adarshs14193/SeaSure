import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import { 
    uploadCatch, 
    getMyInventory, 
    getMyCatches, 
    getCatchDetails 
} from '../controllers/catch.controller.js';

const router = express.Router();

// Stock intake
router.post('/upload', requireAuth, requireRole('VENDOR'), upload.single('image'), uploadCatch);

// Get certified inventory
router.get('/inventory', requireAuth, requireRole('VENDOR'), getMyInventory);

// Get all catches (including rejected)
router.get('/my-catches', requireAuth, requireRole('VENDOR'), getMyCatches);

// Get specific catch details
router.get('/:catchId', requireAuth, requireRole('VENDOR'), getCatchDetails);

export default router;