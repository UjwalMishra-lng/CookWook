import { apiClient } from "@/lib/api/client";
import { toApiError } from "@/lib/api/errors";
import { Recipe, RecipesResponse } from "@/types/recipe";

// The repository is the ONLY place that knows about API endpoints.
// Query hooks call repository functions — never apiClient directly.

export type FetchRecipesParams = {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
};

export const recipeRepository = {
  // Fetch paginated list of recipes with optional sorting
  fetchRecipes: async ({
    limit = 20,
    skip = 0,
    sortBy,
    order,
  }: FetchRecipesParams = {}): Promise<RecipesResponse> => {
    try {
      const response = await apiClient.get<RecipesResponse>("/recipes", {
        params: {
          limit,
          skip,
          ...(sortBy ? { sortBy, order: order ?? "asc" } : {}),
        },
      });
      return response.data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  // Fetch all available recipe tags
  fetchRecipeTags: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<string[]>("/recipes/tags");
      return response.data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  // Fetch recipes by tag with optional sorting
  fetchRecipesByTag: async (
    tag: string,
    { limit = 20, skip = 0, sortBy, order }: FetchRecipesParams = {}
  ): Promise<RecipesResponse> => {
    try {
      const response = await apiClient.get<RecipesResponse>(
        `/recipes/tag/${encodeURIComponent(tag)}`,
        {
          params: {
            limit,
            skip,
            ...(sortBy ? { sortBy, order: order ?? "asc" } : {}),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  // Fetch recipes by meal-type with optional sorting
  fetchRecipesByMealType: async (
    mealType: string,
    { limit = 20, skip = 0, sortBy, order }: FetchRecipesParams = {}
  ): Promise<RecipesResponse> => {
    try {
      const response = await apiClient.get<RecipesResponse>(
        `/recipes/meal-type/${encodeURIComponent(mealType)}`,
        {
          params: {
            limit,
            skip,
            ...(sortBy ? { sortBy, order: order ?? "asc" } : {}),
          },
        }
      );
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

  // Search recipes by name with optional sorting
  searchRecipes: async (
    query: string,
    { limit = 20, skip = 0, sortBy, order }: FetchRecipesParams = {}
  ): Promise<RecipesResponse> => {
    try {
      const response = await apiClient.get<RecipesResponse>("/recipes/search", {
        params: {
          q: query,
          limit,
          skip,
          ...(sortBy ? { sortBy, order: order ?? "asc" } : {}),
        },
      });
      return response.data;
    } catch (error) {
      throw toApiError(error);
    }
  },
};
