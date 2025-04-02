import { useState } from "react";
import cocktailsData from "../data/cocktails.json";

export default function CocktailApp() {
  const [search, setSearch] = useState("");
  const [alcoholFilter, setAlcoholFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  const filtered = cocktailsData.cocktails.filter(cocktail => {
    const matchesSearch = cocktail.name.toLowerCase().includes(search.toLowerCase());
    const matchesAlcohol = !alcoholFilter || cocktail.alcohol === alcoholFilter;
    const matchesDifficulty = !difficultyFilter || cocktail.difficulty === difficultyFilter;
    return matchesSearch && matchesAlcohol && matchesDifficulty;
  });

  const alcohols = [...new Set(cocktailsData.cocktails.map(c => c.alcohol))];
  const difficulties = [...new Set(cocktailsData.cocktails.map(c => c.difficulty))];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Cocktail Finder</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          placeholder="Search cocktails..."
          className="p-2 border rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="border rounded p-2" onChange={e => setAlcoholFilter(e.target.value)}>
          <option value="">All Alcohols</option>
          {alcohols.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select className="border rounded p-2" onChange={e => setDifficultyFilter(e.target.value)}>
          <option value="">All Difficulties</option>
          {difficulties.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {filtered.map((cocktail, index) => (
          <div key={index} className="rounded-2xl shadow-md border p-4">
            <h2 className="text-xl font-semibold mb-2">{cocktail.name}</h2>
            <p><strong>Alcohol:</strong> {cocktail.alcohol}</p>
            <p><strong>Difficulty:</strong> {cocktail.difficulty}</p>
            <p><strong>Ingredients:</strong> {cocktail.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> {cocktail.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}