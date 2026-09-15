import { useQuery, useQueryClient } from "@tanstack/react-query";
import Fuse, { IFuseOptions } from "fuse.js";
import { useMemo } from "react";
import { recipeRepository } from "@/features/recipes/repository/recipeRepository";
import { recipeKeys } from "@/features/recipes/hooks/recipeKeys";
import { Recipe, RecipesResponse, SortByField, SortOrder } from "@/types/recipe";

// Fuse.js weighted options:
// - Title (name) has the highest weightage (0.50)
// - Cuisine has second highest weightage (0.20)
// - Tags has third (0.15)
// - Ingredients (0.10)
// - Instructions (0.05)
const fuseOptions: IFuseOptions<Recipe> = {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "cuisine", weight: 0.2 },
    { name: "tags", weight: 0.15 },
    { name: "ingredients", weight: 0.1 },
    { name: "instructions", weight: 0.05 },
  ],
  threshold: 0.4, // Matches typos and partial words cleanly
  ignoreLocation: true,
  includeScore: true,
  shouldSort: true,
};

export type SearchSortOptions = {
  sortBy?: SortByField;
  order?: SortOrder;
};

export function useRecipeSearch(query: string, sortOptions: SearchSortOptions = {}) {
  const trimmedQuery = query.trim();
  const queryClient = useQueryClient();
  const { sortBy, order } = sortOptions;

  const searchQuery = useQuery({
    queryKey: recipeKeys.search(trimmedQuery, { sortBy, order }),
    queryFn: async () => {
      const apiResult = await recipeRepository.searchRecipes(trimmedQuery, {
        sortBy,
        order,
      });
      let candidates = apiResult.recipes;

      // Fallback if API returned 0 results (e.g. typos like "Margharita" or ingredient search):
      // Check queryClient cache or fetch full dataset to fuzzy search locally
      if (candidates.length === 0) {
        const cachedList =
          queryClient.getQueryData<RecipesResponse>(recipeKeys.lists()) ||
          queryClient.getQueriesData<RecipesResponse>({
            queryKey: recipeKeys.lists(),
          })[0]?.[1];

        if (cachedList && cachedList.recipes.length > 0) {
          candidates = cachedList.recipes;
        } else {
          // Fetch up to 50 recipes to index for fuzzy fallback
          const allRecipes = await recipeRepository.fetchRecipes({ limit: 50 });
          candidates = allRecipes.recipes;
        }
      }

      // If a specific sort field is requested, sort candidates
      if (sortBy) {
        const sortedCandidates = [...candidates].sort((a, b) => {
          const valA = a[sortBy];
          const valB = b[sortBy];
          if (typeof valA === "string" && typeof valB === "string") {
            return order === "desc"
              ? valB.localeCompare(valA)
              : valA.localeCompare(valB);
          }
          if (typeof valA === "number" && typeof valB === "number") {
            return order === "desc" ? valB - valA : valA - valB;
          }
          return 0;
        });
        return sortedCandidates;
      }

      // Apply Fuse.js weighted scoring and ranking when default sorting is used
      const fuse = new Fuse(candidates, fuseOptions);
      const searchResults = fuse.search(trimmedQuery);

      if (searchResults.length > 0) {
        return searchResults.map((result) => result.item);
      }

      // If fuse found nothing from the candidates, return the direct API results as fallback
      return apiResult.recipes;
    },
    enabled: trimmedQuery.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes cache for search results
  });

  const recipes = useMemo(() => {
    if (!trimmedQuery) return [];
    return searchQuery.data ?? [];
  }, [trimmedQuery, searchQuery.data]);

  return {
    recipes,
    isLoading: searchQuery.isLoading && searchQuery.fetchStatus !== "idle",
    isError: searchQuery.isError,
    error: searchQuery.error,
    refetch: searchQuery.refetch,
    isRefetching: searchQuery.isRefetching,
  };
}
