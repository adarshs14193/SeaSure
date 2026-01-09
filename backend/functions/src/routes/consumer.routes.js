import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import { 
    createConsumerScan, 
    getScanDetails, 
    getMyScans,
    submitScanFeedback 
} from '../controllers/consumer.controller.js';

const router = express.Router();

// Create validation scan
router.post('/scan', requireAuth, requireRole('CUSTOMER'), upload.single('scanImage'), createConsumerScan);

// Get scan details
router.get('/scans/:scanId', requireAuth, requireRole('CUSTOMER'), getScanDetails);

// Get all my scans
router.get('/my-scans', requireAuth, requireRole('CUSTOMER'), getMyScans);

// Submit feedback
router.post('/scans/:scanId/feedback', requireAuth, requireRole('CUSTOMER'), submitScanFeedback);

export default router;
