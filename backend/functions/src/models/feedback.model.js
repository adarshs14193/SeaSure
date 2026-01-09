import { db } from '../config/firebase.js';

/**
 * FEEDBACK MODEL - Read-only queries
 * All writes happen through consumerScan.model.js
 */

/**
 * Get feedback by ID
 */
export const getFeedback = async (feedbackId) => {
    const doc = await db.collection('feedback').doc(feedbackId).get();
    if (!doc.exists) {
        throw new Error('FEEDBACK_NOT_FOUND');
    }
    return { id: doc.id, ...doc.data() };
};

/**
 * Get all feedback for an order
 */
export const getOrderFeedback = async (orderId) => {
    const snapshot = await db.collection('feedback')
        .where('orderId', '==', orderId)
        .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get all feedback for a vendor (paginated)
 */
export const getVendorFeedback = async (vendorId, limit = 50, startAfter = null) => {
    let query = db.collection('feedback')
        .where('vendorId', '==', vendorId)
        .orderBy('createdAt', 'desc')
        .limit(limit);
    
    if (startAfter) {
        query = query.startAfter(startAfter);
    }
    
    const snapshot = await query.get();
    
    return {
        feedback: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null
    };
};

/**
 * Get vendor trust score
 */
export const getVendorTrustScore = async (vendorId) => {
    const doc = await db.collection('vendor_trust').doc(vendorId).get();
    
    if (!doc.exists) {
        return {
            vendorId,
            totalOrders: 0,
            positiveValidations: 0,
            averageRating: null,
            trustScore: null
        };
    }
    
    return { id: doc.id, ...doc.data() };
};

/**
 * Get feedback statistics for a vendor
 */
export const getVendorFeedbackStats = async (vendorId) => {
    const trust = await getVendorTrustScore(vendorId);
    
    // Get rating distribution
    const feedbackSnapshot = await db.collection('feedback')
        .where('vendorId', '==', vendorId)
        .where('rating', '!=', null)
        .get();
    
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let commentsCount = 0;
    
    feedbackSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.rating) {
            ratingDistribution[data.rating]++;
        }
        if (data.comment) {
            commentsCount++;
        }
    });
    
    return {
        vendorId,
        totalOrders: trust.totalOrders,
        totalRatings: trust.ratingCount || 0,
        averageRating: trust.averageRating,
        trustScore: trust.trustScore,
        ratingDistribution,
        commentsCount,
        lastUpdated: trust.lastUpdated
    };
};

/**
 * Get feedback events (immutable log)
 */
export const getFeedbackEvents = async (filters = {}, limit = 100) => {
    let query = db.collection('feedback_events')
        .orderBy('createdAt', 'desc')
        .limit(limit);
    
    if (filters.orderId) {
        query = query.where('orderId', '==', filters.orderId);
    }
    
    if (filters.vendorId) {
        query = query.where('vendorId', '==', filters.vendorId);
    }
    
    const snapshot = await query.get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};