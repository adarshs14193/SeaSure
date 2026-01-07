import { db } from '../config/firebase.js';
import admin from 'firebase-admin';
import { analyzeFishImage } from '../services/vision.service.js';

/**
 * Create a new consumer scan and trigger ML analysis
 */
export const createScan = async ({ consumerId, imageUrl }) => {
    if (!consumerId || !imageUrl) {
        throw new Error('INVALID_SCAN_DATA');
    }
    
    const scanRef = await db.collection('consumer_scans').add({
        consumerId,
        imageUrl,
        
        analysisStatus: "Queued", // Queued, Processing, Completed, Failed
        freshness: null,
        cookWithin: null,
        healthWarning: null,
        confidenceScore: null,
        analysisError: null,
        
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Trigger ML analysis asynchronously (don't wait for it)
    processScanAnalysis(scanRef.id, imageUrl).catch(err => {
        console.error(`❌ ML analysis failed for scan ${scanRef.id}:`, err.message);
    });
    
    return scanRef;
};

/**
 * Process ML analysis for a consumer scan (internal function)
 */
const processScanAnalysis = async (scanId, imageUrl) => {
    const scanRef = db.collection('consumer_scans').doc(scanId);
    
    try {
        console.log(`🤖 Starting ML analysis for scan: ${scanId}`);
        
        // Update status to processing
        await scanRef.update({
            analysisStatus: 'Processing',
            analysisError: null
        });

        // Run ML analysis
        const result = await analyzeFishImage(imageUrl);

        console.log(`✅ ML analysis complete for scan ${scanId}:`, result);

        // Calculate cook within days based on freshness
        let cookWithin;
        let healthWarning = null;
        
        switch (result.freshness) {
            case 'FRESH':
                cookWithin = 5;
                healthWarning = 'Fish is fresh! Safe to consume within 5 days if stored properly.';
                break;
            case 'MODERATE':
                cookWithin = 2;
                healthWarning = '⚠️ Cook thoroughly. Consume within 2 days.';
                break;
            case 'SPOILED':
                cookWithin = 0;
                healthWarning = '🚫 NOT RECOMMENDED for consumption. Fish appears spoiled.';
                break;
            default:
                cookWithin = 1;
                healthWarning = 'Consume with caution.';
        }

        // Update with results
        await scanRef.update({
            analysisStatus: 'Completed',
            freshness: result.freshness,
            cookWithin,
            healthWarning,
            confidenceScore: result.confidenceScore,
            analysisError: null,
            completedAt: admin.firestore.FieldValue.serverTimestamp()
        });

    } catch (error) {
        console.error(`❌ ML analysis error for scan ${scanId}:`, error.message);
        
        // Update with error
        await scanRef.update({
            analysisStatus: 'Failed',
            analysisError: error.message
        });
        
        throw error;
    }
};

/**
 * Get scan by ID
 */
export const getScan = async (scanId) => {
    const doc = await db.collection('consumer_scans').doc(scanId).get();
    if (!doc.exists) {
        throw new Error('SCAN_NOT_FOUND');
    }
    return { id: doc.id, ...doc.data() };
};

/**
 * Get all scans for a consumer
 */
export const getConsumerScans = async (consumerId, limit = 50) => {
    const snapshot = await db.collection('consumer_scans')
        .where('consumerId', '==', consumerId)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Retry ML analysis for a failed scan
 */
export const retryScanAnalysis = async (scanId) => {
    const scanDoc = await getScan(scanId);
    
    if (!scanDoc.imageUrl) {
        throw new Error('MISSING_IMAGE_URL');
    }
    
    return await processScanAnalysis(scanId, scanDoc.imageUrl);
};