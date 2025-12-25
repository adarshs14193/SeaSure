
import { db } from '../config/firebase.config.js';

export const createCatch = async ({ vendorId, imageUrl }) => {
    if (!vendorId|| !imageUrl) {
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
        verifierBy: null,
        verifiedAt: null,

        
        createAt : new Date()
    });
    return ref;
}