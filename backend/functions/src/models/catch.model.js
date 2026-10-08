import { db } from '../config/firebase.js';
import { analyzeFishImage } from '../services/vision.service.js';

/**
 * VENDOR BACKEND - STOCK INTAKE
 * Creates batches from fishermen and certifies freshness via ML
 */

/**
 * Create a new catch batch (stock intake)
 * This is the FIRST and ONLY freshness authority
 */
export const createCatch = async ({ vendorId, imageUrl, fishType, supplierName, quantity }) => {
    if (!vendorId || !imageUrl || !fishType || !quantity) {
        throw new Error('INVALID_CATCH_DATA');
    }
    
    // Create batch record
    const batchRef = await db.collection('catches').add({
        vendorId,
        supplierName: supplierName || 'Unknown Fisherman',
        fishType,
        quantity,
        imageUrl,
        arrivalTime: new Date(),
        
        // ML Certification fields (authoritative)
        mlStatus: 'QUEUED', // QUEUED | PROCESSING | CERTIFIED | REJECTED | CONDITIONAL
        freshnessScore: null,
        grade: null, // A, B, C
        estimatedValidHours: null,
        certificationTime: null,
        reasonKeys: [],
        mlError: null,
        
        // Inventory status
        inventoryStatus: 'PENDING', // PENDING | IN_INVENTORY | REJECTED | EXPIRED
        availableQuantity: quantity,
        reservedQuantity: 0,
        expiryTime: null,
        
        createdAt: new Date()
    });
    
    // Trigger ML certification asynchronously
    certifyFreshness(batchRef.id, imageUrl).catch(err => {
        console.error(`❌ ML certification failed for batch ${batchRef.id}:`, err.message);
    });
    
    return batchRef;
};

/**
 * ML Freshness Certification (Critical - Authoritative Truth)
 * This is the ONLY place freshness decisions are made
 */
const certifyFreshness = async (batchId, imageUrl) => {
    const batchRef = db.collection('catches').doc(batchId);
    
    try {
        console.log(`🤖 Starting ML certification for batch: ${batchId}`);
        
        // Update status to processing
        await batchRef.update({
            mlStatus: 'PROCESSING',
            mlError: null
        });

        // Run ML analysis (authoritative freshness check)
        const mlResult = await analyzeFishImage(imageUrl);

        console.log(`✅ ML certification complete for batch ${batchId}:`, mlResult);

        // Map ML result to certification
        const certification = mapMLResultToCertification(mlResult);
        
        // Calculate expiry time
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + certification.estimatedValidHours);

        // Update with certification results
        await batchRef.update({
            mlStatus: certification.status,
            freshnessScore: certification.freshnessScore,
            grade: certification.grade,
            estimatedValidHours: certification.estimatedValidHours,
            certificationTime: new Date(),
            reasonKeys: certification.reasonKeys,
            mlError: null,
            
            // Only CERTIFIED stock enters inventory
            inventoryStatus: certification.status === 'CERTIFIED' ? 'IN_INVENTORY' : 'REJECTED',
            expiryTime: certification.status === 'CERTIFIED' ? expiryTime : null
        });

        console.log(`📦 Batch ${batchId} ${certification.status} - Grade: ${certification.grade}`);

    } catch (error) {
        console.error(`❌ ML certification error for batch ${batchId}:`, error.message);
        
        // Update with error
        await batchRef.update({
            mlStatus: 'REJECTED',
            mlError: error.message,
            inventoryStatus: 'REJECTED'
        });
        
        throw error;
    }
};

/**
 * Map ML result to vendor certification format
 */
const mapMLResultToCertification = (mlResult) => {
    let status, grade, estimatedValidHours, reasonKeys;
    
    switch (mlResult.freshness) {
        case 'FRESH':
            status = 'CERTIFIED';
            grade = 'A';
            estimatedValidHours = 36; // 1.5 days
            reasonKeys = ['clear_gills', 'bright_eyes'];
            break;
            
        case 'MODERATE':
            status = 'CONDITIONAL';
            grade = 'B';
            estimatedValidHours = 18; // 18 hours
            reasonKeys = ['acceptable_condition', 'moderate_freshness'];
            break;
            
        case 'SPOILED':
            status = 'REJECTED';
            grade = 'C';
            estimatedValidHours = 0;
            reasonKeys = ['poor_quality', 'not_fresh'];
            break;
            
        default:
            status = 'REJECTED';
            grade = 'C';
            estimatedValidHours = 0;
            reasonKeys = ['unknown_condition'];
    }
    
    return {
        status,
        grade,
        freshnessScore: mlResult.confidenceScore / 100, // Convert to 0-1 scale
        estimatedValidHours,
        reasonKeys
    };
};

/**
 * Get catch/batch by ID
 */
export const getCatch = async (catchId) => {
    const doc = await db.collection('catches').doc(catchId).get();
    if (!doc.exists) {
        throw new Error('CATCH_NOT_FOUND');
    }
    return { id: doc.id, ...doc.data() };
};

/**
 * Get all certified inventory for a vendor (IN_INVENTORY only)
 */
export const getVendorInventory = async (vendorId, limit = 50) => {
    const snapshot = await db.collection('catches')
        .where('vendorId', '==', vendorId)
        .where('inventoryStatus', '==', 'IN_INVENTORY')
        .where('expiryTime', '>', new Date())
        .orderBy('expiryTime', 'asc') // FIFO by expiry
        .limit(limit)
        .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get all catches for a vendor (including rejected/expired)
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
 * Reserve inventory for an order (order fulfillment)
 */
export const reserveInventory = async (catchId, quantity) => {
    const catchRef = db.collection('catches').doc(catchId);
    const catchDoc = await getCatch(catchId);
    
    if (catchDoc.inventoryStatus !== 'IN_INVENTORY') {
        throw new Error('INVENTORY_NOT_AVAILABLE');
    }
    
    if (catchDoc.expiryTime < new Date()) {
        throw new Error('INVENTORY_EXPIRED');
    }
    
    if (catchDoc.availableQuantity < quantity) {
        throw new Error('INSUFFICIENT_QUANTITY');
    }
    
    await catchRef.update({
        availableQuantity: catchDoc.availableQuantity - quantity,
        reservedQuantity: catchDoc.reservedQuantity + quantity
    });
};

/**
 * Background job: Expire old inventory
 */
export const expireOldInventory = async () => {
    const now = new Date();
    const snapshot = await db.collection('catches')
        .where('inventoryStatus', '==', 'IN_INVENTORY')
        .where('expiryTime', '<=', now)
        .get();
    
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        batch.update(doc.ref, { 
            inventoryStatus: 'EXPIRED',
            availableQuantity: 0
        });
    });
    
    await batch.commit();
    console.log(`⏰ Expired ${snapshot.size} inventory items`);
};