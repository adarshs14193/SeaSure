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
    
    // Validate rating
    if (feedback.rating && (feedback.rating < 1 || feedback.rating > 5)) {
        throw new Error('INVALID_RATING: Rating must be between 1 and 5');
    }
    
    // Validate comment length
    if (feedback.comment && feedback.comment.length > 300) {
        throw new Error('COMMENT_TOO_LONG: Comment must be 300 characters or less');
    }
    
    // Create feedback record in dedicated collection
    const feedbackData = {
        feedbackId: db.collection('feedback').doc().id,
        orderId: scan.orderId,
        vendorId: scan.vendorId,
        consumerId: scan.consumerId,
        scanId: scanId,
        rating: feedback.rating || null,
        agreedWithFreshness: feedback.agreedWithFreshness === true,
        recipeHelpful: feedback.recipeHelpful === true,
        comment: feedback.comment ? feedback.comment.trim() : null,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Store in feedback collection (append-only)
    const feedbackRef = await db.collection('feedback').add(feedbackData);
    
    // Update scan document
    await scanRef.update({
        feedbackSubmitted: true,
        feedbackId: feedbackRef.id,
        feedback: {
            agreedWithFreshness: feedback.agreedWithFreshness,
            recipeHelpful: feedback.recipeHelpful,
            rating: feedback.rating || null,
            hasComment: !!feedback.comment,
            submittedAt: admin.firestore.FieldValue.serverTimestamp()
        }
    });
    
    // Log immutable event
    await logFeedbackEvent({
        orderId: scan.orderId,
        vendorId: scan.vendorId,
        rating: feedback.rating || null,
        agreedWithFreshness: feedback.agreedWithFreshness,
        recipeHelpful: feedback.recipeHelpful,
        hasComment: !!feedback.comment
    });
    
    // Trigger trust scoring update (async)
    updateVendorTrustScore(scan.vendorId, scan.orderId, feedback).catch(err => {
        console.error('Failed to update trust score:', err);
    });
    
    return feedbackRef.id;
};

/**
 * Get recipes for a scan (after validation complete)
 */
export const getRecipesForScan = async (scanId, preferences = {}) => {
    const scan = await getScan(scanId);
    
    if (scan.validationStatus !== 'COMPLETED') {
        throw new Error('VALIDATION_NOT_COMPLETE');
    }
    
    const { getRecipes } = await import('../services/recipe.service.js');
    
    // Get recipes from RAG API
    const recipeData = await getRecipes({
        fish: scan.fishType,
        location: preferences.location || 'Kerala',
        spiceLevel: preferences.spiceLevel || 'medium',
        habit: preferences.habit || 'regular'
    });
    
    // Store that recipes were fetched
    const scanRef = db.collection('consumer_scans').doc(scanId);
    await scanRef.update({
        recipesProvided: true,
        recipesFetchedAt: admin.firestore.FieldValue.serverTimestamp(),
        recipePreferences: preferences
    });
    
    return recipeData;
};
const logFeedbackEvent = async (eventData) => {
    const eventId = `EVT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const event = {
        eventId,
        eventType: 'FEEDBACK_SUBMITTED',
        orderId: eventData.orderId,
        vendorId: eventData.vendorId,
        rating: eventData.rating,
        agreedWithFreshness: eventData.agreedWithFreshness,
        recipeHelpful: eventData.recipeHelpful,
        hasComment: eventData.hasComment,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    await db.collection('feedback_events').add(event);
    
    console.log(`📊 Feedback event logged: ${eventId} for order ${eventData.orderId}`);
};

/**
 * Update vendor trust score based on feedback
 */
const updateVendorTrustScore = async (vendorId, orderId, feedback) => {
    // This aggregates feedback over time
    // Vendor backend reads trust scores, not raw consumer scans
    
    const trustRef = db.collection('vendor_trust').doc(vendorId);
    const trustDoc = await trustRef.get();
    
    const rating = feedback.rating || 0;
    const positiveValidation = feedback.agreedWithFreshness ? 1 : 0;
    
    if (!trustDoc.exists) {
        await trustRef.set({
            vendorId,
            totalOrders: 1,
            positiveValidations: positiveValidation,
            totalRatingSum: rating,
            ratingCount: rating > 0 ? 1 : 0,
            averageRating: rating || null,
            trustScore: positiveValidation,
            lastUpdated: new Date()
        });
    } else {
        const trust = trustDoc.data();
        const newTotal = trust.totalOrders + 1;
        const newPositive = trust.positiveValidations + positiveValidation;
        const newRatingSum = (trust.totalRatingSum || 0) + rating;
        const newRatingCount = (trust.ratingCount || 0) + (rating > 0 ? 1 : 0);
        const newAvgRating = newRatingCount > 0 ? newRatingSum / newRatingCount : null;
        const newScore = newPositive / newTotal;
        
        await trustRef.update({
            totalOrders: newTotal,
            positiveValidations: newPositive,
            totalRatingSum: newRatingSum,
            ratingCount: newRatingCount,
            averageRating: newAvgRating,
            trustScore: newScore,
            lastUpdated: new Date()
        });
    }
    
    console.log(`📊 Trust score updated for vendor: ${vendorId}`);
};