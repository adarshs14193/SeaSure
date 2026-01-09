export default function HealthBenefits({ fish }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        💪 Health Benefits of {fish}
      </h2>

      <ul className="space-y-2 text-slate-700 text-sm">
        <li>🧠 Rich in Omega-3 fatty acids</li>
        <li>❤️ Supports heart health</li>
        <li>💪 High quality protein</li>
        <li>🦴 Strengthens bones</li>
        <li>🩺 Improves immunity</li>
      </ul>
    </div>
  );
}
