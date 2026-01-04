export default function FreshnessScoreCard({ score }) {
  return (
    <div className="rounded-2xl bg-linear-to-br from-teal-500 to-cyan-500 p-6 text-white">
      <p className="text-sm opacity-90">Freshness Guarantee Score</p>
      <h1 className="text-5xl font-bold mt-2">{score}%</h1>
      <p className="mt-2 text-sm">AI visual confidence</p>
    </div>
  );
}
