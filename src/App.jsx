import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
      );
      const data = await res.json();

      if (!data.meals) {
        setRecipe([]);
        setError("Recipe not found");
        return;
      }
      setRecipe(data.meals);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
       
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-r from-orange-100 to-yellow-100 p-8">
        <h1 className="text-5xl font-bold text-center mb-10">
          Recipe Finder 🍔
        </h1>

        <div className="flex justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search recipe..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="border p-4 rounded-xl w-100 bg-white shadow"
          />

          <button
            onClick={fetchRecipes}
            className="bg-orange-500 text-white px-6 rounded-xl hover:bg-orange-600"
          >
            Search
          </button>
        </div>

        {loading && <h2 className="text-center text-2xl">Loading...</h2>}

        {error && <h2 className="text-center text-red-500 text-xl">{error}</h2>}

        <div className="grid md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-bold">{recipe.strMeal}</h2>

                <p className="text-gray-500 mt-2">
                  Category: {recipe.strCategory}
                </p>

                <p className="text-gray-500">Area: {recipe.strArea}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
