import Screen from "@/components/layout/Screen";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import RecipeDetailBackButton from "../components/RecipeDetailBackButton";
import RecipeDetailError from "../components/RecipeDetailError";
import RecipeDetailHero from "../components/RecipeDetailHero";
import RecipeDetailSkeleton from "../components/RecipeDetailSkeleton";
import RecipeIngredients from "../components/RecipeIngredients";
import RecipeInstructions from "../components/RecipeInstructions";
import RecipeQuickStats from "../components/RecipeQuickStats";
import { useRecipe } from "../hooks/useRecipe";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const recipeId = Number(id);

  const { data: recipe, isLoading, isError, error, refetch, isRefetching } =
    useRecipe(recipeId);

  // Loading State
  if (isLoading) {
    return (
      <Screen>
        <RecipeDetailBackButton onBack={() => router.back()} />
        <RecipeDetailSkeleton />
      </Screen>
    );
  }

  // Error State
  if (isError || !recipe) {
    return (
      <Screen>
        <RecipeDetailError
          message={error instanceof Error ? error.message : "Recipe not found"}
          isRetrying={isRefetching}
          onRetry={() => refetch()}
          onBack={() => router.back()}
        />
      </Screen>
    );
  }

  // Success State
  return (
    <Screen>
      <RecipeDetailBackButton onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        <RecipeDetailHero recipe={recipe} />

        <View className="px-6 pt-4">
          <RecipeQuickStats recipe={recipe} />
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RecipeInstructions instructions={recipe.instructions} />
        </View>
      </ScrollView>
    </Screen>
  );
}
