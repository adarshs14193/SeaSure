import { db } from '../config/firebase.js';
import { analyzeFishImage } from '../services/vision.service.js';

/**
 * Create a new catch and trigger ML analysis
 */
export const createCatch = async ({ vendorId, imageUrl }) => {
    if (!vendorId || !imageUrl) {
        throw new Error('INVALID_CATCH_DATA');
    }
    
    const ref = await db.collection('catches').add({
        vendorId,
        imageUrl,
        
        // ML related fields
        freshness: 'PENDING', // PENDING | FRESH | MODERATE | SPOILED
        confidenceScore: null,
        mlStatus: 'QUEUED', // QUEUED | PROCESSING | DONE | FAILED
        mlError: null,
        
        // Human verification fields
        verified: false, 
        verifiedBy: null,
        verifiedAt: null,
        
        createdAt: new Date()
    });
    
    // Trigger ML analysis asynchronously (don't wait for it)
    processCatchAnalysis(ref.id, imageUrl).catch(err => {
        console.error(`❌ ML analysis failed for catch ${ref.id}:`, err.message);
    });
    
    return ref;
};

/**
 * Process ML analysis for a catch (internal function)
 */
const processCatchAnalysis = async (catchId, imageUrl) => {
    const catchRef = db.collection('catches').doc(catchId);
    
    try {
        console.log(`🤖 Starting ML analysis for catch: ${catchId}`);
        
        // Update status to processing
        await catchRef.update({
            mlStatus: 'PROCESSING',
            mlError: null
        });

        // Run ML analysis
        const result = await analyzeFishImage(imageUrl);

        console.log(`✅ ML analysis complete for catch ${catchId}:`, result);

        // Update with results
        await catchRef.update({
            freshness: result.freshness,
            confidenceScore: result.confidenceScore,
            mlStatus: 'DONE',
            mlError: null,
            analyzedAt: new Date()
        });

    } catch (error) {
        console.error(`❌ ML analysis error for catch ${catchId}:`, error.message);
        
        // Update with error
        await catchRef.update({
            mlStatus: 'FAILED',
            mlError: error.message
        });
        
        throw error;
    }
};

/**
 * Get catch by ID
 */
export const getCatch = async (catchId) => {
    const doc = await db.collection('catches').doc(catchId).get();
    if (!doc.exists) {
        throw new Error('CATCH_NOT_FOUND');
    }
    return { id: doc.id, ...doc.data() };
};

/**
 * Get all catches for a vendor
 */
export const getVendorCatches = async (vendorId, limit = 50) => {
    const snapshot = await db.collection('catches')
        .where('vendorId', '==', vendorId)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Retry ML analysis for a failed catch
 */
export const retryCatchAnalysis = async (catchId) => {
    const catchDoc = await getCatch(catchId);
    
    if (!catchDoc.imageUrl) {
        throw new Error('MISSING_IMAGE_URL');
    }
    
    return await processCatchAnalysis(catchId, catchDoc.imageUrl);
};