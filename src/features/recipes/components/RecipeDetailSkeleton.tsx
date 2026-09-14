import { ScrollView, View } from "react-native";
import { scale } from "react-native-size-matters";

export default function RecipeDetailSkeleton() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 48 }}
    >
      {/* Hero Image Skeleton */}
      <View
        className="w-full bg-surfaceAlt"
        style={{ height: scale(280) }}
      />

      <View className="p-6">
        {/* Title placeholder */}
        <View
          className="w-4/5 bg-surfaceAlt rounded mb-2"
          style={{ height: scale(26) }}
        />

        {/* Subtitle / tag placeholder */}
        <View
          className="w-1/2 bg-surfaceAlt rounded mb-6"
          style={{ height: scale(16) }}
        />

        {/* Stat Cards Grid Skeleton */}
        <View className="flex-row items-center justify-between gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              className="flex-1 bg-surface rounded-xl border border-surfaceAlt"
              style={{ height: scale(64) }}
            />
          ))}
        </View>

        {/* Section Heading Placeholder */}
        <View
          className="w-2/5 bg-surfaceAlt rounded mb-4"
          style={{ height: scale(20) }}
        />

        {/* Ingredient lines placeholder */}
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={i}
            className="bg-surfaceAlt rounded mb-2"
            style={{
              height: scale(16),
              width: `${85 - i * 5}%`,
            }}
          />
        ))}

        {/* Section Heading 2 Placeholder */}
        <View
          className="w-2/5 bg-surfaceAlt rounded mt-4 mb-4"
          style={{ height: scale(20) }}
        />

        {/* Instruction boxes placeholder */}
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            className="w-full bg-surface rounded-xl border border-surfaceAlt mb-2"
            style={{ height: scale(60) }}
          />
        ))}
      </View>
    </ScrollView>
  );
}
