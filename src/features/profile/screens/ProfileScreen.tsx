import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import Screen from "@/components/layout/Screen";
import { useOnboardingStore } from "@/features/onboarding/store";
import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

export default function ProfileScreen() {
  const router = useRouter();
  const user = useOnboardingStore((s) => s.user);
  const reset = useOnboardingStore((s) => s.reset);

  const handleLogout = async () => {
    await reset();
    router.replace("/signup");
  };

  return (
    <Screen>
      <View className="flex-1 p-6">
        <View className="mb-10 mt-6 items-center">
          <View className="w-20 h-20 rounded-full bg-surfaceAlt items-center justify-center border border-border mb-3">
            <Ionicons name="person" size={scale(38)} color={colors.primary} />
          </View>
          <AppText variant="title" className="text-center font-bold text-textPrimary">
            {user?.name ?? "User"}
          </AppText>
          <AppText variant="hint" className="mt-1 text-center text-textSecondary">
            {user?.email ?? ""}
          </AppText>
        </View>

        <Button label="Logout" variant="ghost" onPress={handleLogout} />
      </View>
    </Screen>
  );
}
