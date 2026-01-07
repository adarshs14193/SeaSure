import { createScan } from '../models/consumerScan.model.js';

/**
 * Create consumer scan and trigger ML analysis
 * Route: POST /api/consumers/scan
 */
export const createConsumerScan = async (req, res) => {
    try {
        const consumerId = req.user.uid; // From auth middleware
        const imageUrl = req.file?.url; // From upload middleware (Firebase Storage URL)
        
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                error: 'Image upload failed. No image URL received.'
            });
        }
        
        console.log('🔍 Scan initiated by consumer:', consumerId);
        console.log('🖼️  Image URL:', imageUrl);
        
        // Create scan in Firestore and trigger ML analysis
        const scanRef = await createScan({ 
            consumerId, 
            imageUrl 
        });
        
        res.status(201).json({
            success: true,
            message: 'Fish scan initiated. AI analysis in progress.',
            data: {
                scanId: scanRef.id,
                imageUrl,
                analysisStatus: 'Queued'
            }
        });
        
    } catch (error) {
        console.error('❌ Create scan error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create scan'
        });
    }
};

/**
 * Get scan by ID (optional - add to routes if needed)
 */
export const getScan = async (req, res) => {
    try {
        const { scanId } = req.params;
        const { getScan: getScanModel } = await import('../models/consumerScan.model.js');
        
        const scanData = await getScanModel(scanId);
        
        res.json({
            success: true,
            data: scanData
        });
    } catch (error) {
        const status = error.message === 'SCAN_NOT_FOUND' ? 404 : 500;
        res.status(status).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Get all scans for logged-in consumer (optional - add to routes if needed)
 */
export const getMyScans = async (req, res) => {
    try {
        const consumerId = req.user.uid;
        const limit = parseInt(req.query.limit) || 50;
        
        const { getConsumerScans } = await import('../models/consumerScan.model.js');
        const scans = await getConsumerScans(consumerId, limit);
        
        res.json({
            success: true,
            count: scans.length,
            data: scans
        });
    } catch (error) {
        console.error('Get scans error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};