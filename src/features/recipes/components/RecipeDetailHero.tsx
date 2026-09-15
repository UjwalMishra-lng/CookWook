import AppText from "@/components/ui/AppText";
import { colors } from "@/theme";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

const difficultyColor: Record<Recipe["difficulty"], string> = {
  Easy: colors.success,
  Medium: colors.primary,
  Hard: colors.error,
};

type Props = {
  recipe: Recipe;
};

export default function RecipeDetailHero({ recipe }: Props) {
  const badgeColor = difficultyColor[recipe.difficulty];

  return (
    <View>
      {/* Hero Image */}
      <View className="w-full h-72 bg-surfaceAlt">
        <Image
          source={{ uri: recipe.image }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={300}
        />
      </View>

      {/* Header Info */}
      <View className="px-6 pt-4">
        {/* Category & Tags Row */}
        <View className="flex-row items-center flex-wrap gap-2 mb-1">
          <View className="bg-surfaceAlt px-2.5 py-1 rounded-md flex-row items-center gap-1">
            <Ionicons
              name="earth-outline"
              size={scale(12)}
              color={colors.textPrimary}
            />
            <AppText
              variant="hint"
              style={{ fontSize: moderateScale(11) }}
              className="text-textPrimary"
            >
              {recipe.cuisine}
            </AppText>
          </View>

          {recipe.mealType?.map((type, idx) => (
            <View key={idx} className="bg-surfaceAlt px-2.5 py-1 rounded-md">
              <AppText
                variant="hint"
                style={{ fontSize: moderateScale(11) }}
                className="text-textSecondary"
              >
                {type}
              </AppText>
            </View>
          ))}

          {/* Difficulty Badge */}
          <View
            className="px-2.5 py-1 rounded-full border ml-auto"
            style={{
              borderColor: badgeColor,
              backgroundColor: badgeColor + "20",
            }}
          >
            <AppText
              variant="hint"
              className="font-bold tracking-wider"
              style={{
                color: badgeColor,
                fontSize: moderateScale(11),
              }}
            >
              {recipe.difficulty.toUpperCase()}
            </AppText>
          </View>
        </View>

        <View className="my-3">
          <AppText
            className="font-bold text-textPrimary"
            style={{
              fontSize: moderateScale(26),
              lineHeight: moderateScale(34),
            }}
          >
            {recipe.name}
          </AppText>
        </View>

        {/* Rating & Reviews */}
        <View className="flex-row items-center mb-1">
          <Ionicons name="star" size={scale(14)} color={colors.primary} />
          <AppText
            variant="hint"
            style={{ fontSize: moderateScale(13) }}
            className="text-primary font-semibold ml-1"
          >
            {recipe.rating.toFixed(1)}
          </AppText>
          <AppText
            variant="hint"
            style={{ fontSize: moderateScale(12) }}
            className="text-textSecondary ml-1"
          >
            ({recipe.reviewCount} reviews)
          </AppText>
        </View>
      </View>
    </View>
  );
}
