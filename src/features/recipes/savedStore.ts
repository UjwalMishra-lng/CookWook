import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Recipe } from "@/types/recipe";

type SavedRecipesState = {
  savedRecipes: Recipe[];
};

type SavedRecipesActions = {
  toggleSaveRecipe: (recipe: Recipe) => void;
  saveRecipe: (recipe: Recipe) => void;
  removeSavedRecipe: (id: number) => void;
  isRecipeSaved: (id: number) => boolean;
  clearAllSaved: () => void;
  _hasHydrated: boolean;
  _setHasHydrated: (value: boolean) => void;
};

export type SavedRecipesStore = SavedRecipesState & SavedRecipesActions;

export const useSavedRecipesStore = create<SavedRecipesStore>()(
  persist(
    (set, get) => ({
      savedRecipes: [],

      _hasHydrated: false,
      _setHasHydrated: (value) => set({ _hasHydrated: value }),

      isRecipeSaved: (id: number) => {
        return get().savedRecipes.some((r) => r.id === id);
      },

      toggleSaveRecipe: (recipe: Recipe) => {
        const { savedRecipes } = get();
        const exists = savedRecipes.some((r) => r.id === recipe.id);
        if (exists) {
          set({
            savedRecipes: savedRecipes.filter((r) => r.id !== recipe.id),
          });
        } else {
          set({
            savedRecipes: [recipe, ...savedRecipes],
          });
        }
      },

      saveRecipe: (recipe: Recipe) => {
        const { savedRecipes } = get();
        if (!savedRecipes.some((r) => r.id === recipe.id)) {
          set({ savedRecipes: [recipe, ...savedRecipes] });
        }
      },

      removeSavedRecipe: (id: number) => {
        set((state) => ({
          savedRecipes: state.savedRecipes.filter((r) => r.id !== id),
        }));
      },

      clearAllSaved: () => set({ savedRecipes: [] }),
    }),
    {
      name: "saved-recipes-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        savedRecipes: state.savedRecipes,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
    }
  )
);
