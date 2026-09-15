import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { RECIPE_SORT_OPTIONS, RecipeSortOption } from "@/types/recipe";

export type RecipeFilterState = {
  selectedTag: string | null;
  selectedMealType: string | null;
  selectedSort: RecipeSortOption;
};

type RecipeFilterActions = {
  setSelectedTag: (tag: string | null) => void;
  setSelectedMealType: (mealType: string | null) => void;
  setSelectedSort: (sort: RecipeSortOption) => void;
  clearTag: () => void;
  clearMealType: () => void;
  resetSort: () => void;
  resetFilters: () => void;
  // Hydration flag — true once AsyncStorage has been read on launch
  _hasHydrated: boolean;
  _setHasHydrated: (value: boolean) => void;
};

export type RecipeFilterStore = RecipeFilterState & RecipeFilterActions;

const initialFilterState: RecipeFilterState = {
  selectedTag: null,
  selectedMealType: null,
  selectedSort: RECIPE_SORT_OPTIONS[0],
};

export const useRecipeFilterStore = create<RecipeFilterStore>()(
  persist(
    (set) => ({
      ...initialFilterState,

      _hasHydrated: false,
      _setHasHydrated: (value) => set({ _hasHydrated: value }),

      setSelectedTag: (tag) => set({ selectedTag: tag }),

      setSelectedMealType: (mealType) => set({ selectedMealType: mealType }),

      setSelectedSort: (sort) => set({ selectedSort: sort }),

      clearTag: () => set({ selectedTag: null }),

      clearMealType: () => set({ selectedMealType: null }),

      resetSort: () => set({ selectedSort: RECIPE_SORT_OPTIONS[0] }),

      resetFilters: () => set({ ...initialFilterState }),
    }),
    {
      name: "recipe-filter-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedTag: state.selectedTag,
        selectedMealType: state.selectedMealType,
        selectedSort: state.selectedSort,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
    }
  )
);
