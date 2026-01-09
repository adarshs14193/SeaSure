export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      <h3 className="font-semibold text-slate-800">
        {recipe.name}
      </h3>

      <p className="text-sm text-slate-600">
        Region: {recipe.region}
      </p>

      <p className="text-sm text-slate-500 mt-1">
        ⏱ {recipe.time} mins
      </p>
    </div>
  );
}
