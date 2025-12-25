import {onDocumentCreated} from "firebase-functions/v2/firestore";
import { analyzeFishImage} from "../services/vision.service.js";

/**
 * Triggered when a new fish document is created in Firestore.
 * Analyzes the fish image using Vision API and updates the document with analysis results.
 * */

export const onCatchCreated = onDocumentCreated(
    {
        document: "catches/{catchId}",
        region: "asia-south1"
    },
    async(event) => {
        const snap = event.data;
        if (!snap) return;

        const data = snap.data();
        const ref = snap.ref;

        // idempotency check
        if(data.mlStatus !== "QUEUED") return;

        try {
            // Analyze the fish image
            await ref.update({ mlStatus: "PROCESSING" , mlError: null });

            //Real ML hook (not implemented in emulator)
            const result = await analyzeFishImage(data.imageUrl);

            // Update the document with analysis results
            await ref.update({
                freshness: result.freshness,
                confidenceScore: result.confidenceScore,
                mlStatus: "DONE"
            });
        } catch (error) {
            console.error("Catch ML failed:", error);

            await ref.update({
                mlStatus: "FAILED",
                mlError: error.message || "Unknown error"
            });
        }
    }
);    