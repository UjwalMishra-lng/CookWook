import Screen from "@/components/layout/Screen";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import RecipeDetailBackButton from "@/features/recipes/components/RecipeDetailBackButton";
import RecipeDetailError from "@/features/recipes/components/RecipeDetailError";
import RecipeDetailHero from "@/features/recipes/components/RecipeDetailHero";
import RecipeDetailSkeleton from "@/features/recipes/components/RecipeDetailSkeleton";
import RecipeIngredients from "@/features/recipes/components/RecipeIngredients";
import RecipeInstructions from "@/features/recipes/components/RecipeInstructions";
import RecipeQuickStats from "@/features/recipes/components/RecipeQuickStats";
import SaveRecipeButton from "@/features/recipes/components/SaveRecipeButton";
import { useRecipe } from "@/features/recipes/hooks/useRecipe";
import { analyticsService } from "@/services/analyticsService";
import { useEffect } from "react";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const recipeId = Number(id);

  const { data: recipe, isLoading, isError, error, refetch, isRefetching } =
    useRecipe(recipeId);

  useEffect(() => {
    if (recipe) {
      analyticsService.trackRecipeViewed(recipe);
    }
  }, [recipe]);

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
      <SaveRecipeButton recipe={recipe} variant="detail" />

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
