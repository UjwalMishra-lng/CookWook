import AppText from "@/components/ui/AppText";
import { colors } from "@/theme";
import { RecipeSortOption } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useRecipeFilterStore } from "@/features/recipes/store";

type Props = {
  selectedTag?: string | null;
  selectedMealType?: string | null;
  sortOption?: RecipeSortOption;
  onClearTag?: () => void;
  onClearMealType?: () => void;
  onResetSort?: () => void;
  onClearAll?: () => void;
};

export default function ActiveFilterBar({
  selectedTag: propTag,
  selectedMealType: propMealType,
  sortOption: propSort,
  onClearTag: propOnClearTag,
  onClearMealType: propOnClearMealType,
  onResetSort: propOnResetSort,
  onClearAll: propOnClearAll,
}: Props = {}) {
  const storeTag = useRecipeFilterStore((state) => state.selectedTag);
  const storeMealType = useRecipeFilterStore((state) => state.selectedMealType);
  const storeSort = useRecipeFilterStore((state) => state.selectedSort);
  const storeClearTag = useRecipeFilterStore((state) => state.clearTag);
  const storeClearMealType = useRecipeFilterStore((state) => state.clearMealType);
  const storeResetSort = useRecipeFilterStore((state) => state.resetSort);
  const storeResetFilters = useRecipeFilterStore((state) => state.resetFilters);

  const selectedTag = propTag !== undefined ? propTag : storeTag;
  const selectedMealType =
    propMealType !== undefined ? propMealType : storeMealType;
  const sortOption = propSort !== undefined ? propSort : storeSort;

  const onClearTag = propOnClearTag || storeClearTag;
  const onClearMealType = propOnClearMealType || storeClearMealType;
  const onResetSort = propOnResetSort || storeResetSort;
  const onClearAll = propOnClearAll || storeResetFilters;

  const isSortActive = sortOption.id !== "default";
  const isMealTypeActive = Boolean(
    selectedMealType && selectedMealType !== "All"
  );
  const isTagActive = Boolean(selectedTag);

  const hasAnyFilters = isTagActive || isMealTypeActive || isSortActive;

  if (!hasAnyFilters) {
    return null;
  }

  return (
    <View className="px-6 py-2 flex-row items-center justify-between">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: scale(8),
          alignItems: "center",
        }}
        className="flex-1 mr-2"
      >
        {isTagActive && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClearTag}
            className="flex-row items-center bg-surfaceAlt border border-primary/40 px-3 py-1 rounded-full"
          >
            <AppText
              variant="hint"
              style={{
                color: colors.primaryLight,
                fontSize: moderateScale(12),
                marginRight: scale(4),
              }}
            >
              Tag: {selectedTag}
            </AppText>
            <Ionicons
              name="close-circle"
              size={scale(14)}
              color={colors.primaryLight}
            />
          </TouchableOpacity>
        )}

        {isMealTypeActive && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClearMealType}
            className="flex-row items-center bg-surfaceAlt border border-primary/40 px-3 py-1 rounded-full"
          >
            <AppText
              variant="hint"
              style={{
                color: colors.primaryLight,
                fontSize: moderateScale(12),
                marginRight: scale(4),
              }}
            >
              Meal: {selectedMealType}
            </AppText>
            <Ionicons
              name="close-circle"
              size={scale(14)}
              color={colors.primaryLight}
            />
          </TouchableOpacity>
        )}

        {isSortActive && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onResetSort}
            className="flex-row items-center bg-surfaceAlt border border-primary/40 px-3 py-1 rounded-full"
          >
            <AppText
              variant="hint"
              style={{
                color: colors.primaryLight,
                fontSize: moderateScale(12),
                marginRight: scale(4),
              }}
            >
              {sortOption.label}
            </AppText>
            <Ionicons
              name="close-circle"
              size={scale(14)}
              color={colors.primaryLight}
            />
          </TouchableOpacity>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={onClearAll}
        hitSlop={8}
        className="py-1 px-2"
      >
        <AppText
          variant="hint"
          style={{
            color: colors.textSecondary,
            fontSize: moderateScale(12),
            textDecorationLine: "underline",
          }}
        >
          Reset All
        </AppText>
      </TouchableOpacity>
    </View>
  );
}
