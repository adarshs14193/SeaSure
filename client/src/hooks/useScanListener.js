import { useEffect, useState } from "react";

export function useScanListener(scanId) {
  const [scan, setScan] = useState(null);

  useEffect(() => {
    if (!scanId) return;

    // Step 1: QUEUED
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScan({ analysisStatus: "QUEUED" });

    // Step 2: PROCESSING
    setTimeout(() => {
      setScan({ analysisStatus: "PROCESSING" });
    }, 1500);

    // Step 3: DONE (final result)
    setTimeout(() => {
      setScan({
        analysisStatus: "DONE",
        freshness: "FRESH",
        freshnessScore: 92,
        cookWithin: 10,
        healthProperties: [
          "High protein",
          "Omega-3 rich",
          "Low mercury",
        ],
        weatherSpoilageAdvice:
          "High humidity detected. Refrigerate within 30 minutes.",
        recommendedRecipes: [
          "Mangalorean Fish Curry",
          "Fish Fry",
        ],
        region: "Karnataka",
        traceability: {
          market: "Malpe Harbor",
          hoursAgo: 5,
        },
      });
    }, 3000);
  }, [scanId]);

  return { scan };
}
