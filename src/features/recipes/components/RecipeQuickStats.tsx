import AppText from "@/components/ui/AppText";
import { colors } from "@/theme";
import { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

type Props = {
  recipe: Recipe;
};

export default function RecipeQuickStats({ recipe }: Props) {
  const stats: {
    label: string;
    value: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    { label: "Prep", value: `${recipe.prepTimeMinutes}m`, icon: "timer-outline" },
    { label: "Cook", value: `${recipe.cookTimeMinutes}m`, icon: "restaurant-outline" },
    { label: "Serves", value: `${recipe.servings}`, icon: "people-outline" },
    { label: "Calories", value: `${recipe.caloriesPerServing}`, icon: "flame-outline" },
  ];

  return (
    <View className="flex-row items-center justify-between gap-2 mb-6">
      {stats.map((item, idx) => (
        <View
          key={idx}
          className="flex-1 bg-surface border border-surfaceAlt rounded-xl py-3 items-center"
        >
          <Ionicons name={item.icon} size={scale(16)} color={colors.primary} />
          <AppText
            variant="hint"
            style={{ fontSize: moderateScale(11) }}
            className="text-textSecondary mt-1"
          >
            {item.label}
          </AppText>
          <AppText
            variant="body"
            style={{ fontSize: moderateScale(13) }}
            className="font-bold text-textPrimary mt-0.5"
          >
            {item.value}
          </AppText>
        </View>
      ))}
    </View>
  );
}
