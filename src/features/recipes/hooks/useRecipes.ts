import { useQuery } from "@tanstack/react-query";
import { FetchRecipesParams, recipeRepository } from "../repository/recipeRepository";
import { recipeKeys } from "./recipeKeys";

// useRecipes — the only way screens interact with recipe list data.
//
// Screens do NOT import recipeRepository.
// Screens do NOT import apiClient.
// Screens do NOT import axios.
//
// They just call useRecipes() and get { data, isLoading, error }.

export function useRecipes(params: FetchRecipesParams = {}) {
  return useQuery({
    queryKey: recipeKeys.list(params),
    queryFn: () => recipeRepository.fetchRecipes(params),
    // Per-query overrides are possible here if this query needs different defaults
    // e.g. staleTime: 0 to always refetch
  });
}
