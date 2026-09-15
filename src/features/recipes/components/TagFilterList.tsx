import AppText from "@/components/ui/AppText";
import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useRecipeTags } from "@/features/recipes/hooks/useRecipeTags";
import { useRecipeFilterStore } from "@/features/recipes/store";

type Props = {
  selectedTag?: string | null;
  onSelectTag?: (tag: string | null) => void;
};

export default function TagFilterList({
  selectedTag: propSelectedTag,
  onSelectTag: propOnSelectTag,
}: Props = {}) {
  const { tags, isLoading } = useRecipeTags();
  const storeSelectedTag = useRecipeFilterStore((state) => state.selectedTag);
  const storeSetSelectedTag = useRecipeFilterStore(
    (state) => state.setSelectedTag
  );

  const selectedTag =
    propSelectedTag !== undefined ? propSelectedTag : storeSelectedTag;
  const onSelectTag = propOnSelectTag || storeSetSelectedTag;

  if (isLoading) {
    return (
      <View className="py-1">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: scale(24),
            gap: scale(8),
          }}
        >
          {[1, 2, 3, 4, 5].map((key) => (
            <View
              key={key}
              className="h-8 w-20 rounded-full bg-surfaceAlt animate-pulse"
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  if (tags.length === 0) {
    return null;
  }

  return (
    <View className="py-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scale(24),
          gap: scale(8),
        }}
      >
        {tags.map((tag) => {
          const isSelected = selectedTag?.toLowerCase() === tag.toLowerCase();

          return (
            <TouchableOpacity
              key={tag}
              activeOpacity={0.7}
              onPress={() => {
                onSelectTag(isSelected ? null : tag);
              }}
              className={`flex-row items-center px-3 py-1.5 rounded-full border ${
                isSelected
                  ? "bg-primary border-primary"
                  : "bg-surface border-surfaceAlt"
              }`}
            >
              <Ionicons
                name="pricetag-outline"
                size={scale(12)}
                color={isSelected ? "#FFF" : colors.primaryLight}
                style={{ marginRight: scale(5) }}
              />
              <AppText
                variant="hint"
                style={{
                  color: isSelected ? "#FFF" : colors.textPrimary,
                  fontWeight: isSelected ? "700" : "500",
                  fontSize: moderateScale(12),
                }}
              >
                {tag}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
