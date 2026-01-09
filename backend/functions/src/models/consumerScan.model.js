import { db } from '../config/firebase.js';
import admin from 'firebase-admin';
import { analyzeFishImage } from '../services/vision.service.js';

/**
 * CONSUMER BACKEND - POST-DELIVERY VALIDATION
 * This NEVER changes vendor inventory or certification
 * Only provides validation signals and cooking guidance
 */

/**
 * Create consumer scan (VALIDATION ONLY, after delivery)
 * Purpose: Validate vendor handling, NOT certify freshness
 */
export const createScan = async ({ consumerId, orderId, imageUrl }) => {
    if (!consumerId || !orderId || !imageUrl) {
        throw new Error('INVALID_SCAN_DATA');
    }
    
    // Verify order exists and was delivered
    const orderDoc = await db.collection('orders').doc(orderId).get();
    if (!orderDoc.exists) {
        throw new Error('ORDER_NOT_FOUND');
    }
    
    const order = orderDoc.data();
    if (order.status !== 'DELIVERED') {
        throw new Error('ORDER_NOT_DELIVERED_YET');
    }
    
    const scanRef = await db.collection('consumer_scans').add({
        consumerId,
        orderId,
        vendorId: order.vendorId,
        fishType: order.fishType,
        imageUrl,
        deliveryTime: order.deliveryTime,
        
        // Validation results (NOT certification)
        validationStatus: 'QUEUED', // QUEUED | PROCESSING | COMPLETED | FAILED
        observedFreshnessScore: null,
        confidence: null,
        validationContext: 'post_delivery_validation',
        
        // Consumer guidance (separate from validation)
        recipesProvided: false,
        feedbackSubmitted: false,
        
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Trigger validation analysis asynchronously
    validateDelivery(scanRef.id, imageUrl).catch(err => {
        console.error(`❌ Validation failed for scan ${scanRef.id}:`, err.message);
    });
    
    return scanRef;
};

/**
 * Post-delivery validation (NOT certification)
 * This provides signals for trust scoring, NOT inventory decisions
 */
const validateDelivery = async (scanId, imageUrl) => {
    const scanRef = db.collection('consumer_scans').doc(scanId);
    
    try {
        console.log(`🔍 Starting delivery validation for scan: ${scanId}`);
        
        // Update status to processing
        await scanRef.update({
            validationStatus: 'PROCESSING'
        });

        // Run ML in VALIDATION mode (not certification)
        const mlResult = await analyzeFishImage(imageUrl);

        console.log(`✅ Validation complete for scan ${scanId}:`, mlResult);

        // Store as OBSERVATION, not certification
        await scanRef.update({
            validationStatus: 'COMPLETED',
            observedFreshnessScore: mlResult.confidenceScore / 100,
            confidence: mlResult.confidenceScore >= 70 ? 'HIGH' : 'LOW',
            completedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // ⚠️ IMPORTANT: This NEVER changes vendor inventory or certification
        console.log(`📊 Validation stored for trust analysis (order-level only)`);

    } catch (error) {
        console.error(`❌ Validation error for scan ${scanId}:`, error.message);
        
        await scanRef.update({
            validationStatus: 'FAILED',
            validationError: error.message
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
 * Submit feedback (MOST IMPORTANT for trust scoring)
 */
export const submitFeedback = async (scanId, feedback) => {
    const scanRef = db.collection('consumer_scans').doc(scanId);
    const scan = await getScan(scanId);
    
    await scanRef.update({
        feedbackSubmitted: true,
        feedback: {
            agreedWithFreshness: feedback.agreedWithFreshness,
            recipeHelpful: feedback.recipeHelpful,
            comments: feedback.comments || '',
            submittedAt: admin.firestore.FieldValue.serverTimestamp()
        }
    });
    
    // Trigger trust scoring update (async)
    updateVendorTrustScore(scan.vendorId, scan.orderId, feedback).catch(err => {
        console.error('Failed to update trust score:', err);
    });
};

/**
 * Update vendor trust score based on feedback
 */
const updateVendorTrustScore = async (vendorId, orderId, feedback) => {
    // This aggregates feedback over time
    // Vendor backend reads trust scores, not raw consumer scans
    
    const trustRef = db.collection('vendor_trust').doc(vendorId);
    const trustDoc = await trustRef.get();
    
    if (!trustDoc.exists) {
        await trustRef.set({
            vendorId,
            totalOrders: 1,
            positiveValidations: feedback.agreedWithFreshness ? 1 : 0,
            trustScore: feedback.agreedWithFreshness ? 1.0 : 0.0,
            lastUpdated: new Date()
        });
    } else {
        const trust = trustDoc.data();
        const newTotal = trust.totalOrders + 1;
        const newPositive = trust.positiveValidations + (feedback.agreedWithFreshness ? 1 : 0);
        const newScore = newPositive / newTotal;
        
        await trustRef.update({
            totalOrders: newTotal,
            positiveValidations: newPositive,
            trustScore: newScore,
            lastUpdated: new Date()
        });
    }
    
    console.log(`📊 Trust score updated for vendor: ${vendorId}`);
};