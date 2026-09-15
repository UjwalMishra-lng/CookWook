import Screen from "@/components/layout/Screen";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { useOnboardingStore } from "@/features/onboarding/store";
import { useSavedRecipesStore } from "@/features/recipes/savedStore";
import { analyticsService } from "@/services/analyticsService";
import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

export default function ProfileScreen() {
  const router = useRouter();
  const user = useOnboardingStore((s) => s.user);
  const reset = useOnboardingStore((s) => s.reset);
  const savedRecipes = useSavedRecipesStore((s) => s.savedRecipes);

  const totalSaved = savedRecipes.length;

  const handleLogout = async () => {
    analyticsService.trackLogout(user?.email);
    await reset();
    router.replace("/signup");
  };

  return (
    <Screen>
      <View className="flex-1 p-6">
        {/* User Avatar & Info */}
        <View className="mb-8 mt-6 items-center">
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

        {/* Simple Saved Recipes Card */}
        <View className="bg-surface rounded-2xl border border-surfaceAlt p-4 flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-primary/15 items-center justify-center">
              <Ionicons name="bookmark" size={scale(18)} color={colors.primary} />
            </View>
            <View>
              <AppText className="font-semibold text-textPrimary text-sm">
                Saved Recipes
              </AppText>
              <AppText variant="hint" className="text-textSecondary text-xs mt-0.5">
                Your bookmarked dishes
              </AppText>
            </View>
          </View>
          <View className="bg-primary/20 px-3 py-1 rounded-full">
            <AppText className="text-primary font-bold text-sm">
              {totalSaved}
            </AppText>
          </View>
        </View>

        {/* Logout Button */}
        <Button label="Logout" variant="ghost" onPress={handleLogout} />
      </View>
    </Screen>
  );
}
