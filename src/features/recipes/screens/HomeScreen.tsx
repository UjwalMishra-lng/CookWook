import Screen from "@/components/layout/Screen";
import AppText from "@/components/ui/AppText";
import { spacing } from "@/theme";
import { ActivityIndicator, FlatList, View } from "react-native";
import HomeHeader from "../components/HomeHeader";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../hooks/useRecipes";
import { colors } from "@/theme";

export default function HomeScreen() {
  const { data, isLoading, isError, error } = useRecipes({ limit: 20 });

  return (
    <Screen>
      <FlatList
        // Header scrolls with the list — no nested ScrollView
        ListHeaderComponent={
          <View style={{ paddingTop: spacing.lg, paddingHorizontal: spacing.lg }}>
            <HomeHeader />
            <AppText variant="title" style={{ marginBottom: spacing.md }}>
              Recipes
            </AppText>
          </View>
        }

        // Loading state
        ListEmptyComponent={
          isLoading ? (
            <View className="items-center justify-center py-20">
              <ActivityIndicator size="large" color={colors.primary} />
              <AppText variant="hint" className="mt-3">Loading recipes...</AppText>
            </View>
          ) : isError ? (
            <View className="items-center justify-center py-20 px-6">
              <AppText variant="title" className="mb-2">😕</AppText>
              <AppText variant="body" className="text-center">
                {error instanceof Error ? error.message : "Something went wrong"}
              </AppText>
            </View>
          ) : null
        }

        data={data?.recipes ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: spacing.lg }}>
            <RecipeCard
              recipe={item}
              onPress={() => {
                // Step 4: navigate to recipe detail
                console.log("Recipe tapped:", item.id);
              }}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
