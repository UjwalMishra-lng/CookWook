import { apiClient } from "@/lib/api/client";
import { toApiError } from "@/lib/api/errors";
import { Recipe, RecipesResponse } from "@/types/recipe";

// The repository is the ONLY place that knows about API endpoints.
// Query hooks call repository functions — never apiClient directly.

export type FetchRecipesParams = {
  limit?: number;
  skip?: number;
};

export const recipeRepository = {
  // Fetch paginated list of recipes
  fetchRecipes: async ({
    limit = 20,
    skip = 0,
  }: FetchRecipesParams = {}): Promise<RecipesResponse> => {
    try {
      const response = await apiClient.get<RecipesResponse>("/recipes", {
        params: { limit, skip },
      });
      return response.data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  // Fetch a single recipe by ID
  fetchRecipeById: async (id: number): Promise<Recipe> => {
    try {
      const response = await apiClient.get<Recipe>(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  // Search recipes by name
  searchRecipes: async (query: string): Promise<RecipesResponse> => {
    try {
      const response = await apiClient.get<RecipesResponse>("/recipes/search", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      throw toApiError(error);
    }
  },
};
