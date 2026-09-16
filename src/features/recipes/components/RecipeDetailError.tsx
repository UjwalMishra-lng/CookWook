import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  message?: string;
  isRetrying?: boolean;
  onRetry: () => void;
  onBack: () => void;
};

export default function RecipeDetailError({
  message = "Failed to load recipe",
  isRetrying = false,
  onRetry,
  onBack,
}: Props) {
  return (
    <View className="flex-1 bg-background justify-center items-center p-6">
      <View className="mb-3">
        <Ionicons
          name="alert-circle-outline"
          size={scale(48)}
          color={colors.error}
        />
      </View>
      <AppText
        variant="title"
        className="text-center mb-1 text-textPrimary font-bold"
      >
        Failed to load recipe
      </AppText>
      <AppText variant="hint" className="text-center mb-6 text-textSecondary">
        {message}
      </AppText>
      <View className="w-44">
        <Button label="Try Again" loading={isRetrying} onPress={onRetry} />
      </View>
      <Pressable onPress={onBack} className="mt-4 flex-row items-center gap-1">
        <Ionicons name="chevron-back" size={scale(14)} color={colors.primary} />
        <AppText variant="hint" className="text-primary font-semibold">
          Back to recipes
        </AppText>
      </Pressable>
    </View>
  );
}
