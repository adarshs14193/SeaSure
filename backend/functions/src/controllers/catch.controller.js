import { createCatch, getCatch, getVendorInventory, getVendorCatches } from '../models/catch.model.js';

/**
 * VENDOR CONTROLLER - SUPPLY SIDE
 * Stock intake and certification
 */

/**
 * Upload catch (Stock Intake - Camera Only, Controlled Environment)
 * Route: POST /api/catches/upload
 */
export const uploadCatch = async (req, res) => {
    try {
        const vendorId = req.user.uid;
        const imageUrl = req.file?.url; // From Firebase Storage
        const { fishType, supplierName, quantity } = req.body;
        
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                error: 'Image upload failed'
            });
        }
        
        if (!fishType || !quantity) {
            return res.status(400).json({
                success: false,
                error: 'fishType and quantity are required'
            });
        }
        
        console.log('📸 Stock intake by vendor:', vendorId);
        console.log('🐟 Fish type:', fishType, '| Quantity:', quantity);
        
        // Create batch and trigger ML certification
        const batchRef = await createCatch({ 
            vendorId, 
            imageUrl,
            fishType,
            supplierName,
            quantity: parseInt(quantity)
        });
        
        res.status(201).json({
            success: true,
            message: 'Batch created. ML certification in progress.',
            data: {
                batchId: batchRef.id,
                fishType,
                quantity,
                mlStatus: 'QUEUED'
            }
        });
        
    } catch (error) {
        console.error('❌ Upload catch error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Get vendor's certified inventory (IN_INVENTORY only)
 */
export const getMyInventory = async (req, res) => {
    try {
        const vendorId = req.user.uid;
        const inventory = await getVendorInventory(vendorId);
        
        res.json({
            success: true,
            count: inventory.length,
            data: inventory
        });
    } catch (error) {
        console.error('Get inventory error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Get all vendor catches (including rejected/expired)
 */
export const getMyCatches = async (req, res) => {
    try {
        const vendorId = req.user.uid;
        const catches = await getVendorCatches(vendorId);
        
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

/**
 * Get specific catch/batch details
 */
export const getCatchDetails = async (req, res) => {
    try {
        const { catchId } = req.params;
        const catchData = await getCatch(catchId);
        
        // Verify ownership
        if (catchData.vendorId !== req.user.uid) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized'
            });
        }
        
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