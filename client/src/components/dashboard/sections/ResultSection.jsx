import FreshnessScoreCard from "@/components/analysis/FreshnessScoreCard";
import FreshnessDecision from "@/components/analysis/FreshnessDecision";
import HealthAndSpoilage from "@/components/analysis/HealthAndSpoilage";
import RegionalRecipes from "@/components/recipes/RegionalRecipes";
import TraceabilityCard from "@/components/analysis/TraceabilityCard";

export default function ResultSection({ scan }) {
  if (!scan || scan.analysisStatus !== "DONE") return null;

  return (
    <section className="space-y-6">
      <FreshnessScoreCard score={scan.freshnessScore} />

      <FreshnessDecision
        level={scan.freshness}
        cookWithin={scan.cookWithin}
      />

      <HealthAndSpoilage
        health={scan.healthProperties}
        weather={scan.weatherSpoilageAdvice}
      />

      <RegionalRecipes
        region={scan.region}
        recipes={scan.recommendedRecipes}
      />

      <TraceabilityCard source={scan.traceability} />
    </section>
  );
}
