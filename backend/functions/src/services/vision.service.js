/**
 * Vision / ML analysis service
 *
 * This file defines the ML CONTRACT.
 * Actual implementation (Google Vision / Vertex AI)
 * will be added later.
 *
 * DO NOT add fake logic here.
 */

export const analyzeFishImage = async (imageUrl) => {
  if (!imageUrl) {
    throw new Error("IMAGE_URL_REQUIRED");
  }

  /**
   * Expected return format (MANDATORY):
   *
   * {
   *   freshness: "FRESH" | "MODERATE" | "SPOILED",
   *   confidenceScore: number   // 0–100
   * }
   *
   * If ML is unavailable, this function MUST throw.
   */

  throw new Error("VISION_ANALYSIS_NOT_IMPLEMENTED");
};
