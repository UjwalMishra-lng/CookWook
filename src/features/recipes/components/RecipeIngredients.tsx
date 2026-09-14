import AppText from "@/components/ui/AppText";
import { View } from "react-native";

type Props = {
  ingredients: string[];
};

export default function RecipeIngredients({ ingredients }: Props) {
  return (
    <View className="mb-8">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-3">
        <AppText variant="title" className="font-bold text-textPrimary">
          Ingredients
        </AppText>
        <AppText variant="hint" className="text-primary font-semibold">
          {ingredients.length} items
        </AppText>
      </View>

      {/* Card Container */}
      <View className="bg-surface border border-surfaceAlt rounded-2xl p-4">
        {ingredients.map((ingredient, index) => {
          const isLast = index === ingredients.length - 1;
          return (
            <View
              key={index}
              className={`flex-row items-center py-2.5 ${
                !isLast ? "border-b border-surfaceAlt" : ""
              }`}
            >
              <View className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
              <AppText variant="body" className="text-textPrimary flex-1">
                {ingredient}
              </AppText>
            </View>
          );
        })}
      </View>
    </View>
  );
}
