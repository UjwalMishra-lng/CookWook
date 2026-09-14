import { useQuery } from "@tanstack/react-query";
import { FetchRecipesParams, recipeRepository } from "../repository/recipeRepository";
import { recipeKeys } from "./recipeKeys";


export function useRecipes(params: FetchRecipesParams = {}) {
  return useQuery({
    queryKey: recipeKeys.list(params),
    queryFn: () => recipeRepository.fetchRecipes(params),
  });
}
