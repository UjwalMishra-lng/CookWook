import AppText from "@/components/ui/AppText";
import { colors, radius, spacing } from "@/theme";
import { Recipe } from "@/types/recipe";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

type RecipeCardProps = {
  recipe: Recipe;
  onPress?: () => void;
};

// Difficulty badge color — visual signal at a glance
const difficultyColor: Record<Recipe["difficulty"], string> = {
  Easy:   colors.success,
  Medium: colors.primary,
  Hard:   colors.error,
};

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      className="mb-4"
    >
      <View className="bg-surface rounded-2xl overflow-hidden">

        {/* Recipe image */}
        <Image
          source={{ uri: recipe.image }}
          style={{ width: "100%", height: scale(180) }}
          contentFit="cover"
          transition={300} // fade-in when image loads
        />

        {/* Card content */}
        <View style={{ padding: spacing.md }}>

          {/* Recipe name */}
          <AppText
            variant="body"
            style={{ fontWeight: "600", marginBottom: spacing.sm }}
          >
            {recipe.name}
          </AppText>

          {/* Metadata row 1 — cuisine + time */}
          <View className="flex-row items-center gap-4 mb-1">
            <AppText variant="hint">🌍 {recipe.cuisine}</AppText>
            <AppText variant="hint">⏱ {totalTime} min</AppText>
          </View>

          {/* Metadata row 2 — rating + difficulty badge */}
          <View className="flex-row items-center gap-4">
            <AppText variant="hint">
              ⭐ {recipe.rating.toFixed(1)}
              <AppText variant="hint" style={{ color: colors.textSecondary }}>
                {" "}({recipe.reviewCount})
              </AppText>
            </AppText>

            {/* Difficulty pill */}
            <View
              style={{
                backgroundColor: difficultyColor[recipe.difficulty] + "22", // 22 = ~13% opacity hex
                borderColor: difficultyColor[recipe.difficulty],
                borderWidth: 1,
                borderRadius: radius.full,
                paddingHorizontal: spacing.sm,
                paddingVertical: 2,
              }}
            >
              <AppText
                variant="hint"
                style={{
                  color: difficultyColor[recipe.difficulty],
                  fontSize: moderateScale(11),
                  fontWeight: "600",
                }}
              >
                {recipe.difficulty}
              </AppText>
            </View>
          </View>

        </View>
      </View>
    </Pressable>
  );
}
