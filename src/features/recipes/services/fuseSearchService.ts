import Fuse, { IFuseOptions } from "fuse.js";
import { Recipe, SortByField, SortOrder } from "@/types/recipe";

export const RECIPE_FUSE_OPTIONS: IFuseOptions<Recipe> = {
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

export function searchRecipesWithFuse(
  candidates: Recipe[],
  query: string,
  customOptions?: IFuseOptions<Recipe>
): Recipe[] {
  const trimmed = query.trim();
  if (!trimmed || candidates.length === 0) {
    return candidates;
  }

  const fuse = new Fuse(candidates, {
    ...RECIPE_FUSE_OPTIONS,
    ...customOptions,
  });

  const searchResults = fuse.search(trimmed);
  return searchResults.map((result) => result.item);
}

export function sortRecipeList(
  recipes: Recipe[],
  sortBy?: SortByField,
  order: SortOrder = "asc"
): Recipe[] {
  if (!sortBy) return recipes;

  return [...recipes].sort((a, b) => {
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
}
