import { useQuery } from "@tanstack/react-query";
import { recipeRepository } from "@/features/recipes/repository/recipeRepository";
import { recipeKeys } from "@/features/recipes/hooks/recipeKeys";

export function useRecipeTags() {
  const query = useQuery({
    queryKey: recipeKeys.tags(),
    queryFn: () => recipeRepository.fetchRecipeTags(),
    staleTime: 1000 * 60 * 60, // 1 hour — tags change very infrequently
  });

  return {
    tags: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
