import Button from "@/components/ui/Button";
import AppText from "@/components/ui/AppText";
import Screen from "@/components/layout/Screen";
import { useOnboardingStore } from "@/features/onboarding/store";
import { spacing } from "@/theme";
import { useRouter } from "expo-router";
import { View } from "react-native";

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
      <View style={{ padding: spacing.lg }} className="flex-1">
        <View className="mb-10 mt-6">
          <AppText variant="hero">👤</AppText>
          <AppText variant="title" className="mt-2">
            {user?.name ?? "User"}
          </AppText>
          <AppText variant="hint" className="mt-1">
            {user?.email ?? ""}
          </AppText>
        </View>

        <Button label="Logout" variant="ghost" onPress={handleLogout} />
      </View>
    </Screen>
  );
}
