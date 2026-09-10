// Types derived directly from the DummyJSON /recipes API response.
// Always model your types from the actual API — no guessing.

export type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
};

// The paginated list response wrapper from DummyJSON
export type RecipesResponse = {
  recipes: Recipe[];
  total: number;   // total recipes in the dataset (50)
  skip: number;    // how many were skipped (for pagination)
  limit: number;   // how many were returned
};
