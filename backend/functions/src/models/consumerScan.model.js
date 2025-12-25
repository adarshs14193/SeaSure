import { db } from '../config/firebase.config.js';
import admin from 'firebase-admin';

export const createScan = async ({consumerId, imageUrl}) => {
    const scanRef = await db.collection('consumer_scans').add({
        consumerId,
        imageUrl,

        analysisStatus: "Queued", //Queued, Processing, Completed, Failed
        freshness: null,
        cookWithin: null,
        healthWarning: null,
        confidenceScore: null,
        analysisError: null,

        createdAt: admin.firestore.FieldValue.serverTimestamp(),

    });
    return scanRef;
};