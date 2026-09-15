import AppText from "@/components/ui/AppText";
import { colors } from "@/theme";
import { RECIPE_SORT_OPTIONS, RecipeSortOption } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useRecipeFilterStore } from "@/features/recipes/store";

type Props = {
  visible: boolean;
  selectedOption?: RecipeSortOption;
  onSelectOption?: (option: RecipeSortOption) => void;
  onClose: () => void;
};

export default function RecipeSortModal({
  visible,
  selectedOption: propSelectedOption,
  onSelectOption: propOnSelectOption,
  onClose,
}: Props) {
  const storeSelectedSort = useRecipeFilterStore((state) => state.selectedSort);
  const storeSetSelectedSort = useRecipeFilterStore(
    (state) => state.setSelectedSort
  );

  const selectedOption =
    propSelectedOption !== undefined ? propSelectedOption : storeSelectedSort;
  const onSelectOption = propOnSelectOption || storeSetSelectedSort;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/60">
          <TouchableWithoutFeedback>
            <View className="bg-surface rounded-t-3xl border-t border-surfaceAlt px-6 pt-4 pb-10">
              {/* Handle Bar */}
              <View className="items-center mb-4">
                <View className="w-12 h-1.5 rounded-full bg-surfaceAlt" />
              </View>

              {/* Header */}
              <View className="flex-row items-center justify-between mb-5">
                <AppText variant="title">Sort Recipes</AppText>
                <Pressable
                  onPress={onClose}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel="Close sort modal"
                >
                  <Ionicons
                    name="close"
                    size={scale(22)}
                    color={colors.textSecondary}
                  />
                </Pressable>
              </View>

              {/* Sort Options List */}
              <View className="gap-2.5">
                {RECIPE_SORT_OPTIONS.map((option) => {
                  const isSelected = selectedOption.id === option.id;

                  return (
                    <TouchableOpacity
                      key={option.id}
                      activeOpacity={0.7}
                      onPress={() => {
                        onSelectOption(option);
                        onClose();
                      }}
                      className={`flex-row items-center justify-between p-3.5 rounded-2xl border ${
                        isSelected
                          ? "bg-primary/15 border-primary"
                          : "bg-background/60 border-surfaceAlt"
                      }`}
                    >
                      <View className="flex-row items-center gap-3">
                        <View
                          className={`w-9 h-9 rounded-xl items-center justify-center ${
                            isSelected ? "bg-primary" : "bg-surfaceAlt"
                          }`}
                        >
                          <Ionicons
                            name={option.icon as any}
                            size={scale(18)}
                            color={isSelected ? "#FFF" : colors.textSecondary}
                          />
                        </View>
                        <AppText
                          variant="body"
                          style={{
                            color: isSelected
                              ? colors.primary
                              : colors.textPrimary,
                            fontWeight: isSelected ? "700" : "500",
                            fontSize: moderateScale(15),
                          }}
                        >
                          {option.label}
                        </AppText>
                      </View>

                      {isSelected && (
                        <Ionicons
                          name="checkmark-circle"
                          size={scale(20)}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
