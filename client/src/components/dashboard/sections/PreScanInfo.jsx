export default function PreScanInfo() {
  return (
    <section className="mt-10 grid gap-6">
      
      {/* AI Capabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCard
          title="Freshness Score"
          desc="AI checks eyes, skin & texture"
          emoji="🟢"
        />
        <InfoCard
          title="Health Safety"
          desc="Detects spoilage & risks"
          emoji="🧪"
        />
        <InfoCard
          title="Cook Guidance"
          desc="When & how to cook safely"
          emoji="🍳"
        />
      </div>

      {/* Features */}
      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="font-semibold text-slate-800 mb-4">
          What you get after scanning
        </h3>

        <ul className="grid sm:grid-cols-2 gap-3 text-slate-600">
          <li>🐟 Fish traceability</li>
          <li>🌦️ Weather spoilage alerts</li>
          <li>🍲 Regional recipes</li>
          <li>🚚 Pickup or delivery</li>
          <li>🔪 Cleaning tutorials</li>
        </ul>
      </div>
    </section>
  );
}

function InfoCard({ title, desc, emoji }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow text-center">
      <div className="text-2xl">{emoji}</div>
      <h4 className="font-medium mt-2">{title}</h4>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </div>
  );
}
