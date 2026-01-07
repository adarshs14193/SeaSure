import { createCatch } from '../models/catch.model.js';

/**
 * Upload catch and trigger ML analysis
 * Route: POST /api/catches/upload
 */
export const uploadCatch = async (req, res) => {
    try {
        const vendorId = req.user.uid; // From auth middleware
        const imageUrl = req.file?.url; // From upload middleware (Firebase Storage URL)
        
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                error: 'Image upload failed. No image URL received.'
            });
        }
        
        console.log('📸 Catch uploaded by vendor:', vendorId);
        console.log('🖼️  Image URL:', imageUrl);
        
        // Create catch in Firestore and trigger ML analysis
        const catchRef = await createCatch({ 
            vendorId, 
            imageUrl 
        });
        
        res.status(201).json({
            success: true,
            message: 'Catch uploaded successfully. AI analysis in progress.',
            data: {
                catchId: catchRef.id,
                imageUrl,
                mlStatus: 'QUEUED'
            }
        });
        
    } catch (error) {
        console.error('❌ Upload catch error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to upload catch'
        });
    }
};

/**
 * Get catch by ID (optional - add to routes if needed)
 */
export const getCatch = async (req, res) => {
    try {
        const { catchId } = req.params;
        const { getCatch: getCatchModel } = await import('../models/catch.model.js');
        
        const catchData = await getCatchModel(catchId);
        
        res.json({
            success: true,
            data: catchData
        });
    } catch (error) {
        const status = error.message === 'CATCH_NOT_FOUND' ? 404 : 500;
        res.status(status).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Get all catches for logged-in vendor (optional - add to routes if needed)
 */
export const getMyCatches = async (req, res) => {
    try {
        const vendorId = req.user.uid;
        const limit = parseInt(req.query.limit) || 50;
        
        const { getVendorCatches } = await import('../models/catch.model.js');
        const catches = await getVendorCatches(vendorId, limit);
        
        res.json({
            success: true,
            count: catches.length,
            data: catches
        });
    } catch (error) {
        console.error('Get catches error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};