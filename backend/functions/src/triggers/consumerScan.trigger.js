import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {db} from "../config/firebase.js";
import {analyzeConsumerScan} from "../services/vision.service.js";

export const consumerScanCreatedTrigger = onDocumentCreated(
    'consumer_scans/{scanId}',
    async (event) => {
        const scanRef = event.data.ref;
        const scanData = event.data.data();

        if(scanData.analysisStatus !== "Queued") return;

        try {
            //mark as processing
            await scanId.update({analysisStatus: "Processing"});

            //call ML(not implemented here, just a placeholder)
            const result = await analyzeConsumerScan(scanData.imageUrl);

            //update with results
            await scanRef.update({
                analysisStatus: "Completed",
                freshness: result.freshness,
                cookWithin: result.cookWithin,
                healthWarning: result.healthWarning,
                confidenceScore: result.confidenceScore,
            });
        } catch (error) {   
            await scanRef.update({
                analysisStatus: "Failed",
                analysisError: error.message,
            });
        }
    }
);