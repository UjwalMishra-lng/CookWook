import { colors, shadows } from "@/theme";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { GestureResponderEvent, Pressable, StyleProp, View, ViewStyle } from "react-native";
import { scale } from "react-native-size-matters";
import { useSavedRecipesStore } from "@/features/recipes/savedStore";
import { showRemovedRecipeToast, showSavedRecipeToast } from "@/utils/toast";

type Props = {
  recipe: Recipe;
  variant?: "card" | "detail";
  style?: StyleProp<ViewStyle>;
};

export default function SaveRecipeButton({
  recipe,
  variant = "card",
  style,
}: Props) {
  const isSaved = useSavedRecipesStore((state) =>
    state.savedRecipes.some((r) => r.id === recipe.id)
  );
  const toggleSaveRecipe = useSavedRecipesStore(
    (state) => state.toggleSaveRecipe
  );

  const handlePress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (isSaved) {
      toggleSaveRecipe(recipe);
      showRemovedRecipeToast("Removed");
    } else {
      toggleSaveRecipe(recipe);
      showSavedRecipeToast("Saved");
    }
  };

  if (variant === "detail") {
    return (
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={isSaved ? "Remove from saved recipes" : "Save recipe"}
        className="absolute top-4 right-4 z-20"
        hitSlop={8}
        style={({ pressed }) => [
          {
            transform: [{ scale: pressed ? 0.9 : 1 }],
            opacity: pressed ? 0.85 : 1,
          },
          style,
        ]}
      >
        <View
          className={`w-11 h-11 rounded-full items-center justify-center border ${
            isSaved
              ? "border-primary/50 bg-[#1C1C1E]/90"
              : "border-white/15 bg-[#1C1C1E]/80"
          }`}
          style={shadows.card}
        >
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={scale(20)}
            color={isSaved ? colors.primary : colors.textPrimary}
          />
        </View>
      </Pressable>
    );
  }

  // "card" variant
  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={isSaved ? "Remove from saved recipes" : "Save recipe"}
      hitSlop={10}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.88 : 1 }],
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <View
        className={`w-9 h-9 rounded-full items-center justify-center border ${
          isSaved
            ? "bg-black/75 border-primary/60"
            : "bg-black/60 border-white/20"
        }`}
        style={shadows.card}
      >
        <Ionicons
          name={isSaved ? "bookmark" : "bookmark-outline"}
          size={scale(17)}
          color={isSaved ? colors.primary : "#FFFFFF"}
        />
      </View>
    </Pressable>
  );
}
