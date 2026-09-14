import { colors, shadows } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  onBack: () => void;
};

export default function RecipeDetailBackButton({ onBack }: Props) {
  return (
    <Pressable
      onPress={onBack}
      accessibilityRole="button"
      accessibilityLabel="Go back to recipe list"
      className="absolute top-4 left-4 z-20"
      hitSlop={8}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.92 : 1 }],
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View
        className="w-11 h-11 rounded-full items-center justify-center border border-white/15 bg-[#1C1C1E]/80"
        style={shadows.card}
      >
        <Ionicons
          name="chevron-back"
          size={scale(20)}
          color={colors.textPrimary}
          className="mr-0.5"
        />
      </View>
    </Pressable>
  );
}
