export default function FreshnessDecision({ level, cookWithin }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h3 className="font-semibold text-slate-800">AI Decision</h3>

      <p className="mt-2 text-lg">
        {level === "FRESH" && "🟢 Fresh"}
        {level === "MODERATE" && "🟡 Moderate"}
        {level === "SPOILED" && "🔴 Spoiled"}
      </p>

      <p className="text-slate-500 mt-1">
        Best to cook within {cookWithin} hours
      </p>
    </div>
  );
}
