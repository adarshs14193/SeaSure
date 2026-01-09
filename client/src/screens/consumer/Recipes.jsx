import RecipeCard from "@/components/recipes/RecipeCard";

export default function Recipes() {
  const recipes = [
    {
      name: "Mangalorean Fish Curry",
      region: "Karnataka Coast",
      time: 30,
      image: "https://via.placeholder.com/300",
    },
    {
      name: "Goan Fish Fry",
      region: "Goa",
      time: 20,
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        🍛 Local Fish Recipes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((r, i) => (
          <RecipeCard key={i} recipe={r} />
        ))}
      </div>
    </div>
  );
}
