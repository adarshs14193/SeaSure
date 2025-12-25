import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import {upload} from "../middlewares/upload.middleware.js";
import {createConsumerScan } from '../controllers/consumer.controller.js';
import e from 'express';

const router = express.Router();

// Route to create a consumer scan  
router.post(
    '/consumers/scan',
    requireAuth,
    requireRole('CUSTOMER'),
    upload.single('scanImage'),
    createConsumerScan
);

export default router;