export default function TraceabilityCard({ source }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h4 className="font-medium">Fish Traceability</h4>
      <p className="text-sm text-slate-600 mt-1">
        Sourced from {source.market}, caught {source.hoursAgo} hrs ago
      </p>
    </div>
  );
}
