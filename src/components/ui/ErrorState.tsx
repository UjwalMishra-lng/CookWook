import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { getErrorMessage } from "@/utils/errorMessage";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { colors } from "@/theme";

type ErrorStateProps = {
  error?: unknown;
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  retryLoading?: boolean;
};

export default function ErrorState({
  error,
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try Again",
  retryLoading = false,
}: ErrorStateProps) {
  const bodyText = message ?? (error !== undefined ? getErrorMessage(error) : "An unexpected error occurred. Please try again.");

  return (
    <View className="bg-surface rounded-2xl border border-surfaceAlt p-8 items-center mt-4">
      <View className="mb-2">
        <Ionicons
          name="alert-circle-outline"
          size={scale(44)}
          color={colors.error}
        />
      </View>

      <AppText variant="title" className="text-center mb-1">
        {title}
      </AppText>

      <AppText
        variant="hint"
        className="text-center mb-6"
        style={{ lineHeight: moderateScale(20) }}
      >
        {bodyText}
      </AppText>

      {onRetry && (
        <View className="w-full max-w-[200px]">
          <Button
            label={retryLabel}
            loading={retryLoading}
            onPress={onRetry}
          />
        </View>
      )}
    </View>
  );
}
