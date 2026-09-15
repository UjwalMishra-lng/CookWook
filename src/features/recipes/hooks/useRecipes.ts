import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FetchRecipesParams, recipeRepository } from "@/features/recipes/repository/recipeRepository";
import { recipeKeys } from "@/features/recipes/hooks/recipeKeys";
import { RecipesResponse } from "@/types/recipe";

export type UseRecipesOptions = FetchRecipesParams & {
  tag?: string | null;
  mealType?: string | null;
};

export function useRecipes(options: UseRecipesOptions = {}) {
  const { tag, mealType, limit = 20, skip = 0, sortBy, order } = options;
  const isMealTypeActive = Boolean(mealType && mealType !== "All");

  const queryParams: FetchRecipesParams = useMemo(
    () => ({
      limit,
      skip,
      ...(sortBy ? { sortBy, order: order ?? "asc" } : {}),
    }),
    [limit, skip, sortBy, order]
  );

  // Determine queryKey and queryFn based on active filters
  const queryKey = useMemo(() => {
    if (tag) {
      return recipeKeys.byTag(tag, { ...queryParams, ...(isMealTypeActive ? { mealType } : {}) });
    }
    if (isMealTypeActive && mealType) {
      return recipeKeys.byMealType(mealType.toLowerCase(), queryParams);
    }
    return recipeKeys.list(queryParams);
  }, [tag, isMealTypeActive, mealType, queryParams]);

  const queryFn = async (): Promise<RecipesResponse> => {
    if (tag) {
      return recipeRepository.fetchRecipesByTag(tag, queryParams);
    }
    if (isMealTypeActive && mealType) {
      return recipeRepository.fetchRecipesByMealType(
        mealType.toLowerCase(),
        queryParams
      );
    }
    return recipeRepository.fetchRecipes(queryParams);
  };

  return useQuery({
    queryKey,
    queryFn,
    select: (data) => {
      // If both tag and mealType are applied, filter the tag response by mealType
      if (tag && isMealTypeActive && mealType) {
        const filtered = data.recipes.filter((recipe) =>
          recipe.mealType?.some(
            (m) => m.toLowerCase() === mealType.toLowerCase()
          )
        );
        return {
          ...data,
          recipes: filtered,
          total: filtered.length,
        };
      }
      return data;
    },
  });
}
