import Screen from "@/components/layout/Screen";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { colors, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import HomeHeader from "../components/HomeHeader";
import RecipeCard from "../components/RecipeCard";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";
import RecipeSearchBar from "../components/RecipeSearchBar";
import { useRecipes } from "../hooks/useRecipes";
import { useRecipeSearch } from "../hooks/useRecipeSearch";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Standard recipes feed
  const {
    data,
    isLoading: isFeedLoading,
    isError: isFeedError,
    error: feedError,
    refetch: refetchFeed,
    isRefetching: isFeedRefetching,
  } = useRecipes({ limit: 20 });

  // Weighted Fuse.js + API search
  const search = useRecipeSearch(debouncedQuery);

  const isSearchActive = debouncedQuery.trim().length > 0;
  const activeRecipes = isSearchActive ? search.recipes : data?.recipes ?? [];
  const activeLoading = isSearchActive ? search.isLoading : isFeedLoading;
  const activeError = isSearchActive ? search.isError : isFeedError;
  const activeErrorObj = isSearchActive ? search.error : feedError;
  const activeRefetch = isSearchActive ? search.refetch : refetchFeed;
  const activeRefetching = isSearchActive
    ? search.isRefetching
    : isFeedRefetching;

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  return (
    <Screen>
      {/* Sticky Top Header + Search Bar */}
      <View className="z-10 bg-background pb-3">
        <HomeHeader />
        <View className="px-6 mt-1">
          <RecipeSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleClearSearch}
            isLoading={search.isLoading}
          />
        </View>
      </View>

      <FlatList
        data={activeLoading ? [] : activeRecipes}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xs,
          paddingBottom: scale(96),
        }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        // Section Title Header
        ListHeaderComponent={
          <View className="flex-row items-center justify-between mt-1 mb-3">
            <AppText variant="title">
              {isSearchActive
                ? `Results for "${debouncedQuery}"`
                : "Featured Recipes"}
            </AppText>
            {!activeLoading && !activeError && activeRecipes.length > 0 && (
              <AppText
                variant="hint"
                className="text-primary font-semibold"
                style={{ fontSize: moderateScale(12) }}
              >
                {activeRecipes.length} recipes
              </AppText>
            )}
          </View>
        }
        // State handling: Skeleton Loading, Error with Retry, and Empty
        ListEmptyComponent={
          activeLoading ? (
            <View>
              <RecipeCardSkeleton />
              <RecipeCardSkeleton />
            </View>
          ) : activeError ? (
            <View className="bg-surface rounded-2xl border border-surfaceAlt p-8 items-center mt-4">
              <View className="mb-2">
                <Ionicons
                  name="alert-circle-outline"
                  size={scale(44)}
                  color={colors.error}
                />
              </View>
              <AppText variant="title" className="text-center mb-1">
                {isSearchActive
                  ? "Failed to search recipes"
                  : "Unable to load recipes"}
              </AppText>
              <AppText
                variant="hint"
                className="text-center mb-6"
                style={{ lineHeight: moderateScale(20) }}
              >
                {activeErrorObj instanceof Error
                  ? activeErrorObj.message
                  : "We couldn't connect to the recipe service. Please check your connection."}
              </AppText>
              <View className="w-full max-w-[200px]">
                <Button
                  label="Try Again"
                  loading={activeRefetching}
                  onPress={() => activeRefetch()}
                />
              </View>
            </View>
          ) : (
            <View className="bg-surface rounded-2xl border border-surfaceAlt p-8 items-center mt-4">
              <View className="mb-2">
                <Ionicons
                  name={isSearchActive ? "search-outline" : "restaurant-outline"}
                  size={scale(44)}
                  color={isSearchActive ? colors.textSecondary : colors.primary}
                />
              </View>
              <AppText variant="title" className="text-center mb-1">
                No recipes found
              </AppText>
              <AppText variant="hint" className="text-center mb-6">
                {isSearchActive
                  ? `No matching recipes found for "${debouncedQuery}". Try another keyword, cuisine, or ingredient.`
                  : "Check back later or pull down to refresh."}
              </AppText>
              <View className="w-full max-w-[160px]">
                <Button
                  label={isSearchActive ? "Clear Search" : "Refresh"}
                  variant="ghost"
                  loading={activeRefetching}
                  onPress={isSearchActive ? handleClearSearch : () => activeRefetch()}
                />
              </View>
            </View>
          )
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
        // Pull-to-refresh
        refreshControl={
          <RefreshControl
            refreshing={activeRefetching && !activeLoading}
            onRefresh={activeRefetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
    </Screen>
  );
}
