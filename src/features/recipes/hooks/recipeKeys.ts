// Centralized query keys — prevents key string typos and makes
// cache invalidation predictable across the app.
//
// Rule: every useQuery/useMutation must use a key from here.
// Never write queryKey: ["recipes"] inline in a hook.

export const recipeKeys = {
  all: ["recipes"] as const,
  lists: () => [...recipeKeys.all, "list"] as const,
  list: (params: { limit?: number; skip?: number }) =>
    [...recipeKeys.lists(), params] as const,
  details: () => [...recipeKeys.all, "detail"] as const,
  detail: (id: number) => [...recipeKeys.details(), id] as const,
  search: (query: string) => [...recipeKeys.all, "search", query] as const,
};
