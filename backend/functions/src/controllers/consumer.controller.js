import { createScan, getScan, getConsumerScans, submitFeedback } from '../models/consumerScan.model.js';

/**
 * CONSUMER CONTROLLER - DEMAND SIDE
 * Post-delivery validation and cooking guidance
 */

/**
 * Create consumer scan (VALIDATION ONLY, after delivery)
 * Route: POST /api/consumers/scan
 */
export const createConsumerScan = async (req, res) => {
    try {
        const consumerId = req.user.uid;
        const imageUrl = req.file?.url; // From Firebase Storage
        const { orderId } = req.body;
        
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                error: 'Image upload failed'
            });
        }
        
        if (!orderId) {
            return res.status(400).json({
                success: false,
                error: 'orderId is required'
            });
        }
        
        console.log('🔍 Validation scan by consumer:', consumerId);
        console.log('📦 Order ID:', orderId);
        
        // Create validation scan
        const scanRef = await createScan({ 
            consumerId, 
            orderId,
            imageUrl 
        });
        
        res.status(201).json({
            success: true,
            message: 'Validation scan initiated. This helps us improve quality.',
            data: {
                scanId: scanRef.id,
                orderId,
                validationStatus: 'QUEUED'
            }
        });
        
    } catch (error) {
        console.error('❌ Create scan error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Get scan details
 */
export const getScanDetails = async (req, res) => {
    try {
        const { scanId } = req.params;
        const scanData = await getScan(scanId);
        
        // Verify ownership
        if (scanData.consumerId !== req.user.uid) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }
        
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
 * Get all consumer scans
 */
export const getMyScans = async (req, res) => {
    try {
        const consumerId = req.user.uid;
        const scans = await getConsumerScans(consumerId);
        
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

/**
 * Get recipes for a scan (after validation)
 * Route: POST /api/consumers/scans/:scanId/recipes
 */
export const getRecipesForScan = async (req, res) => {
    try {
        const { scanId } = req.params;
        const { location, spiceLevel, habit } = req.body;
        
        const scanData = await getScan(scanId);
        
        // Verify ownership
        if (scanData.consumerId !== req.user.uid) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }
        
        // Get recipes
        const { getRecipesForScan: getRecipesModel } = await import('../models/consumerScan.model.js');
        
        const recipes = await getRecipesModel(scanId, {
            location,
            spiceLevel,
            habit
        });
        
        res.json({
            success: true,
            data: recipes
        });
        
    } catch (error) {
        console.error('Get recipes error:', error);
        
        if (error.message === 'VALIDATION_NOT_COMPLETE') {
            return res.status(400).json({
                success: false,
                error: 'Validation must be completed before getting recipes'
            });
        }
        
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
export const submitScanFeedback = async (req, res) => {
    try {
        const { scanId } = req.params;
        const { agreedWithFreshness, recipeHelpful, rating, comment } = req.body;
        
        const scanData = await getScan(scanId);
        
        // Verify ownership
        if (scanData.consumerId !== req.user.uid) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }
        
        // Validate rating if provided
        if (rating !== undefined && rating !== null) {
            if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    error: 'Rating must be an integer between 1 and 5'
                });
            }
        }
        
        // Validate comment length if provided
        if (comment && comment.length > 300) {
            return res.status(400).json({
                success: false,
                error: 'Comment must be 300 characters or less'
            });
        }
        
        const feedbackId = await submitFeedback(scanId, {
            agreedWithFreshness: agreedWithFreshness === true,
            recipeHelpful: recipeHelpful === true,
            rating: rating || null,
            comment: comment || null
        });
        
        res.json({
            success: true,
            message: 'Feedback submitted. Thank you for helping us improve!',
            feedbackId
        });
        
    } catch (error) {
        console.error('Submit feedback error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};