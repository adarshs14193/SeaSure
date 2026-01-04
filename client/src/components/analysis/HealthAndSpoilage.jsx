export default function HealthAndSpoilage({ health, weather }) {
  return (
    <div className="grid gap-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <h4 className="font-medium">Health Properties</h4>
        <ul className="mt-2 text-sm text-slate-600 list-disc pl-4">
          {health?.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-white p-4 shadow">
        <h4 className="font-medium">Weather Spoilage Awareness</h4>
        <p className="text-sm text-slate-600 mt-1">{weather}</p>
      </div>
    </div>
  );
}
