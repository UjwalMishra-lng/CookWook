import Screen from "@/components/layout/Screen";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import RecipeCard from "@/features/recipes/components/RecipeCard";
import { useSavedRecipesStore } from "@/features/recipes/stores/savedStore";
import { colors, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

export default function SavedRecipesScreen() {
  const router = useRouter();
  const savedRecipes = useSavedRecipesStore((state) => state.savedRecipes);

  return (
    <Screen>
      {/* Header */}
      <View className="px-6 pt-2 pb-3 bg-background z-10">
        <View className="flex-row items-center gap-2">
          <AppText variant="hero">Saved Recipes</AppText>
          <Ionicons
            name="bookmark"
            size={moderateScale(26)}
            color={colors.primary}
          />
        </View>
        <AppText variant="hint" className="text-textSecondary mt-0.5">
          {savedRecipes.length === 0
            ? "Your personal offline cookbook"
            : `${savedRecipes.length} ${savedRecipes.length === 1 ? "recipe" : "recipes"
            } bookmarked`}
        </AppText>
      </View>

      {/* Saved Recipes List */}
      <FlatList
        data={savedRecipes}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xs,
          paddingBottom: scale(96),
        }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={
          <View className="bg-surface rounded-2xl border border-surfaceAlt p-8 items-center mt-6">
            <View className="w-16 h-16 rounded-full bg-surfaceAlt items-center justify-center mb-3">
              <Ionicons
                name="bookmark-outline"
                size={scale(32)}
                color={colors.primary}
              />
            </View>
            <AppText variant="title" className="text-center mb-1">
              No saved recipes yet
            </AppText>
            <AppText
              variant="hint"
              className="text-center mb-6"
              style={{ lineHeight: moderateScale(20) }}
            >
              Explore recipes and tap the bookmark icon on any card or detail page to save your favorites here.
            </AppText>
            <View className="w-full max-w-[180px]">
              <Button
                label="Explore Recipes"
                variant="primary"
                onPress={() => router.push("/(root)/(tabs)")}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => {
              router.push({
                pathname: "/recipe/[id]",
                params: { id: String(item.id) },
              });
            }}
          />
        )}
      />
    </Screen>
  );
}
