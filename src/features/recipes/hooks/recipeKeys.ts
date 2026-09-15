// Centralized query keys — prevents key string typos and makes

import { FetchRecipesParams } from "@/features/recipes/repository/recipeRepository";

export const recipeKeys = {
  all: ["recipes"] as const,
  lists: () => [...recipeKeys.all, "list"] as const,
  list: (params: FetchRecipesParams = {}) =>
    [...recipeKeys.lists(), params] as const,
  details: () => [...recipeKeys.all, "detail"] as const,
  detail: (id: number) => [...recipeKeys.details(), id] as const,
  tags: () => [...recipeKeys.all, "tags"] as const,
  byTag: (tag: string, params: FetchRecipesParams = {}) =>
    [...recipeKeys.all, "tag", tag, params] as const,
  byMealType: (mealType: string, params: FetchRecipesParams = {}) =>
    [...recipeKeys.all, "mealType", mealType, params] as const,
  search: (query: string, params: FetchRecipesParams = {}) =>
    [...recipeKeys.all, "search", query, params] as const,
};

