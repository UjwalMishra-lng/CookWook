import { useQuery } from "@tanstack/react-query";
import { recipeRepository } from "../repository/recipeRepository";
import { recipeKeys } from "./recipeKeys";

export function useRecipe(id: number) {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipeRepository.fetchRecipeById(id),
    enabled: !isNaN(id) && id > 0,
  });
}
