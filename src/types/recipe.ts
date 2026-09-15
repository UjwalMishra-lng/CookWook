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
  total: number;   
  skip: number;    
  limit: number;   
};

export type SortByField =
  | "name"
  | "rating"
  | "cookTimeMinutes"
  | "caloriesPerServing";

export type SortOrder = "asc" | "desc";

export type RecipeSortOption = {
  id: string;
  label: string;
  sortBy?: SortByField;
  order?: SortOrder;
  icon: string;
};

export const RECIPE_SORT_OPTIONS: RecipeSortOption[] = [
  {
    id: "default",
    label: "Featured (Default)",
    icon: "sparkles-outline",
  },
  {
    id: "rating-desc",
    label: "Highest Rated",
    sortBy: "rating",
    order: "desc",
    icon: "star-outline",
  },
  {
    id: "name-asc",
    label: "Name (A to Z)",
    sortBy: "name",
    order: "asc",
    icon: "text-outline",
  },
  {
    id: "time-asc",
    label: "Fastest Cook Time",
    sortBy: "cookTimeMinutes",
    order: "asc",
    icon: "time-outline",
  },
  {
    id: "cal-asc",
    label: "Lowest Calories",
    sortBy: "caloriesPerServing",
    order: "asc",
    icon: "flame-outline",
  },
];

export const MEAL_TYPES = [
  { id: "All", label: "All", icon: "restaurant-outline" },
  { id: "Breakfast", label: "Breakfast", icon: "sunny-outline" },
  { id: "Lunch", label: "Lunch", icon: "nutrition-outline" },
  { id: "Dinner", label: "Dinner", icon: "moon-outline" },
  { id: "Snack", label: "Snack", icon: "fast-food-outline" },
  { id: "Dessert", label: "Dessert", icon: "ice-cream-outline" },
  { id: "Beverage", label: "Beverage", icon: "wine-outline" },
  { id: "Appetizer", label: "Appetizer", icon: "pizza-outline" },
] as const;

export type MealTypeId = (typeof MEAL_TYPES)[number]["id"];

export type RecipeFilterState = {
  selectedTag: string | null;
  selectedMealType: string | null;
  sortOption: RecipeSortOption;
};

