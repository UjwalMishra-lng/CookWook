import AppText from "@/components/ui/AppText";
import { colors, shadows } from "@/theme";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

import SaveRecipeButton from "@/features/recipes/components/SaveRecipeButton";

type RecipeCardProps = {
  recipe: Recipe;
  onPress?: () => void;
};

// Difficulty badge color — visual signal at a glance
const difficultyColor: Record<Recipe["difficulty"], string> = {
  Easy: colors.success,
  Medium: colors.primary,
  Hard: colors.error,
};

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${recipe.name}, ${recipe.difficulty} difficulty, ${recipe.cuisine} cuisine, ${totalTime} minutes, rated ${recipe.rating} stars`}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.88 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}
    >
      <View
        className="bg-surface rounded-2xl border border-surfaceAlt overflow-hidden"
        style={shadows.card}
      >
        {/* Recipe Image with Difficulty Badge Overlay & Save Button */}
        <View
          className="relative w-full bg-surfaceAlt"
          style={{ height: scale(180) }}
        >
          <Image
            source={{ uri: recipe.image }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={300}
          />

          {/* Save / Bookmark Button (Top Left Overlay) */}
          <View className="absolute top-2.5 left-2.5 z-10">
            <SaveRecipeButton recipe={recipe} variant="card" />
          </View>

          {/* Difficulty Badge (Top Right Overlay) */}
          <View
            className="absolute top-2 right-2 rounded-full px-2.5 py-0.5 border"
            style={{
              backgroundColor: "rgba(15, 15, 15, 0.78)",
              borderColor: difficultyColor[recipe.difficulty],
            }}
          >
            <AppText
              variant="hint"
              className="font-bold tracking-wider"
              style={{
                color: difficultyColor[recipe.difficulty],
                fontSize: moderateScale(11),
              }}
            >
              {recipe.difficulty.toUpperCase()}
            </AppText>
          </View>
        </View>

        {/* Card Body */}
        <View className="p-4">
          {/* Recipe Name — constrained to 2 lines so long titles never break layout */}
          <AppText
            variant="body"
            numberOfLines={2}
            ellipsizeMode="tail"
            className="font-bold text-textPrimary mb-1"
            style={{
              fontSize: moderateScale(16),
              lineHeight: moderateScale(22),
            }}
          >
            {recipe.name}
          </AppText>

          {/* Metadata Row — cuisine, total time, calories */}
          <View className="flex-row items-center flex-wrap gap-3 mt-1">
            <View className="flex-row items-center gap-1">
              <Ionicons name="earth-outline" size={scale(12)} color={colors.textSecondary} />
              <AppText variant="hint" style={{ fontSize: moderateScale(12) }}>
                {recipe.cuisine}
              </AppText>
            </View>

            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={scale(12)} color={colors.textSecondary} />
              <AppText variant="hint" style={{ fontSize: moderateScale(12) }}>
                {totalTime} min
              </AppText>
            </View>

            {recipe.caloriesPerServing > 0 && (
              <View className="flex-row items-center gap-0.5">
                <Ionicons name="flame-outline" size={scale(12)} color={colors.primary} />
                <AppText variant="hint" style={{ fontSize: moderateScale(12) }}>
                  {recipe.caloriesPerServing} kcal
                </AppText>
              </View>
            )}
          </View>

          {/* Rating Row */}
          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={scale(13)} color={colors.primary} />
            <AppText
              variant="hint"
              className="text-primary font-semibold ml-1"
              style={{ fontSize: moderateScale(13) }}
            >
              {recipe.rating.toFixed(1)}
            </AppText>
            <AppText
              variant="hint"
              className="text-textSecondary ml-1"
              style={{ fontSize: moderateScale(12) }}
            >
              ({recipe.reviewCount} reviews)
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
