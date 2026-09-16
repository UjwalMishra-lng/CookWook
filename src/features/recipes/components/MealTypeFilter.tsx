import AppText from "@/components/ui/AppText";
import { useRecipeFilterStore } from "@/features/recipes/stores/store";
import { colors } from "@/theme";
import { MEAL_TYPES } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

type Props = {
  selectedMealType?: string | null;
  onSelectMealType?: (mealType: string | null) => void;
};

export default function MealTypeFilter({
  selectedMealType: propSelectedMealType,
  onSelectMealType: propOnSelectMealType,
}: Props = {}) {
  const storeSelectedMealType = useRecipeFilterStore(
    (state) => state.selectedMealType
  );
  const storeSetSelectedMealType = useRecipeFilterStore(
    (state) => state.setSelectedMealType
  );

  const selectedMealType =
    propSelectedMealType !== undefined
      ? propSelectedMealType
      : storeSelectedMealType;
  const onSelectMealType = propOnSelectMealType || storeSetSelectedMealType;

  return (
    <View className="py-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: scale(24),
          gap: scale(8),
        }}
      >
        {MEAL_TYPES.map((item) => {
          const isSelected =
            (item.id === "All" &&
              (!selectedMealType || selectedMealType === "All")) ||
            selectedMealType?.toLowerCase() === item.id.toLowerCase();

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => {
                if (item.id === "All") {
                  onSelectMealType(null);
                } else if (
                  selectedMealType?.toLowerCase() === item.id.toLowerCase()
                ) {
                  onSelectMealType(null);
                } else {
                  onSelectMealType(item.id);
                }
              }}
              className={`flex-row items-center px-3.5 py-2 rounded-full border ${isSelected
                  ? "bg-primary border-primary"
                  : "bg-surface border-surfaceAlt"
                }`}
            >
              <Ionicons
                name={item.icon as any}
                size={scale(14)}
                color={isSelected ? "#FFF" : colors.textSecondary}
                style={{ marginRight: scale(6) }}
              />
              <AppText
                variant="hint"
                style={{
                  color: isSelected ? "#FFF" : colors.textSecondary,
                  fontWeight: isSelected ? "700" : "500",
                  fontSize: moderateScale(13),
                }}
              >
                {item.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
