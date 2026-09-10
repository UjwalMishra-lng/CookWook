import AppText from "@/components/ui/AppText";
import { useOnboardingStore } from "@/features/onboarding/store";
import { spacing } from "@/theme";
import { View } from "react-native";

export default function HomeHeader() {
  const name = useOnboardingStore((s) => s.user?.name ?? "Chef");
  const firstName = name.split(" ")[0];

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <AppText variant="hero">Cook Wook 🥗</AppText>
      <AppText variant="hint" className="mt-1">
        Welcome back, {firstName}
      </AppText>
    </View>
  );
}
