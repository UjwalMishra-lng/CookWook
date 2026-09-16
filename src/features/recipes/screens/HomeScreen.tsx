import Screen from "@/components/layout/Screen";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import ActiveFilterBar from "@/features/recipes/components/ActiveFilterBar";
import HomeHeader from "@/features/recipes/components/HomeHeader";
import MealTypeFilter from "@/features/recipes/components/MealTypeFilter";
import RecipeCard from "@/features/recipes/components/RecipeCard";
import RecipeCardSkeleton from "@/features/recipes/components/RecipeCardSkeleton";
import RecipeSearchBar from "@/features/recipes/components/RecipeSearchBar";
import RecipeSortModal from "@/features/recipes/components/RecipeSortModal";
import TagFilterList from "@/features/recipes/components/TagFilterList";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import { useRecipeSearch } from "@/features/recipes/hooks/useRecipeSearch";
import { useRecipeFilterStore } from "@/features/recipes/stores/store";
import { colors, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortModalVisible, setSortModalVisible] = useState(false);

  // Centralized Filter & Sort State from Zustand (persisted locally via AsyncStorage)
  const selectedTag = useRecipeFilterStore((state) => state.selectedTag);
  const selectedMealType = useRecipeFilterStore(
    (state) => state.selectedMealType
  );
  const selectedSort = useRecipeFilterStore((state) => state.selectedSort);
  const resetFilters = useRecipeFilterStore((state) => state.resetFilters);

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Standard or Filtered recipes feed
  const {
    data,
    isLoading: isFeedLoading,
    isError: isFeedError,
    error: feedError,
    refetch: refetchFeed,
    isRefetching: isFeedRefetching,
  } = useRecipes({
    tag: selectedTag,
    mealType: selectedMealType,
    sortBy: selectedSort.sortBy,
    order: selectedSort.order,
    limit: 20,
  });

  // Weighted Fuse.js + API search (with sort option)
  const search = useRecipeSearch(debouncedQuery, {
    sortBy: selectedSort.sortBy,
    order: selectedSort.order,
  });

  const isSearchActive = debouncedQuery.trim().length > 0;
  const activeRecipes = isSearchActive ? search.recipes : data?.recipes ?? [];
  const activeLoading = isSearchActive ? search.isLoading : isFeedLoading;
  const activeError = isSearchActive ? search.isError : isFeedError;
  const activeErrorObj = isSearchActive ? search.error : feedError;
  const activeRefetch = isSearchActive ? search.refetch : refetchFeed;
  const activeRefetching = isSearchActive
    ? search.isRefetching
    : isFeedRefetching;

  const isAnyFilterActive =
    Boolean(selectedTag) ||
    Boolean(selectedMealType && selectedMealType !== "All") ||
    selectedSort.id !== "default";

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const handleClearAll = () => {
    resetFilters();
    handleClearSearch();
  };

  // Compute title for the recipe section
  const sectionTitle = isSearchActive
    ? `Results for "${debouncedQuery}"`
    : selectedTag && selectedMealType
      ? `${selectedTag} · ${selectedMealType}`
      : selectedTag
        ? `${selectedTag} Recipes`
        : selectedMealType
          ? `${selectedMealType} Recipes`
          : selectedSort.id !== "default"
            ? `Recipes · ${selectedSort.label}`
            : "Featured Recipes";

  return (
    <Screen>
      {/* Sticky Top Header + Search Bar + Filters */}
      <View className="z-10 bg-background pb-2">
        <HomeHeader />

        {/* Search Bar + Sort Button */}
        <View className="px-6 mt-1 flex-row items-center gap-2.5">
          <View className="flex-1">
            <RecipeSearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={handleClearSearch}
              isLoading={search.isLoading}
            />
          </View>

          <TouchableOpacity
            onPress={() => setSortModalVisible(true)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Sort recipes"
            className={`w-12 h-12 rounded-xl items-center justify-center border ${selectedSort.id !== "default"
                ? "bg-primary/20 border-primary"
                : "bg-surface border-surfaceAlt"
              }`}
          >
            <Ionicons
              name="options-outline"
              size={scale(20)}
              color={
                selectedSort.id !== "default"
                  ? colors.primary
                  : colors.textSecondary
              }
            />
            {selectedSort.id !== "default" && (
              <View className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary" />
            )}
          </TouchableOpacity>
        </View>

        {/* Meal Type Horizontal Pills (Breakfast, Lunch, Dinner, etc.) */}
        <View className="mt-3">
          <MealTypeFilter />
        </View>

        {/* Dynamic Tags Horizontal Bar (Pakistani, Italian, Pizza, etc.) */}
        <View className="mt-1">
          <TagFilterList />
        </View>

        {/* Active Filter Bar (Tag, Meal, Sort chips with individual clear and reset all) */}
        <ActiveFilterBar onClearAll={handleClearAll} />
      </View>

      <FlatList
        data={activeLoading ? [] : activeRecipes}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xs,
          paddingBottom: scale(96),
        }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        // Section Title Header
        ListHeaderComponent={
          <View className="flex-row items-center justify-between mt-1 mb-3">
            <AppText variant="title">{sectionTitle}</AppText>
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
                  : isAnyFilterActive
                    ? "No recipes match the selected filters. Try changing or clearing filters."
                    : "Check back later or pull down to refresh."}
              </AppText>
              <View className="w-full max-w-[160px]">
                <Button
                  label={
                    isSearchActive
                      ? "Clear Search"
                      : isAnyFilterActive
                        ? "Clear Filters"
                        : "Refresh"
                  }
                  variant="ghost"
                  loading={activeRefetching}
                  onPress={
                    isSearchActive
                      ? handleClearSearch
                      : isAnyFilterActive
                        ? handleClearAll
                        : () => activeRefetch()
                  }
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

      {/* Sort Selection Bottom Modal */}
      <RecipeSortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
      />
    </Screen>
  );
}
