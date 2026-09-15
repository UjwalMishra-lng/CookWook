import { useQuery } from "@tanstack/react-query";
import { recipeRepository } from "@/features/recipes/repository/recipeRepository";
import { recipeKeys } from "@/features/recipes/hooks/recipeKeys";

export function useRecipe(id: number) {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipeRepository.fetchRecipeById(id),
    enabled: !isNaN(id) && id > 0,
  });
}
