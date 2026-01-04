export default function RegionalRecipes({ region, recipes }) {
  return (
    <div>
      <h3 className="font-semibold text-slate-800">
        Recipes from {region}
      </h3>

      <div className="mt-3 flex gap-3 overflow-x-auto">
        {recipes?.map((r) => (
          <div
            key={r}
            className="min-w-40 rounded-xl bg-white p-3 shadow"
          >
            🍲 {r}
          </div>
        ))}
      </div>
    </div>
  );
}
