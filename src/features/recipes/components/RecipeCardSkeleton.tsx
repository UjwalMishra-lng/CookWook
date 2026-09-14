import { shadows } from "@/theme";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

export default function RecipeCardSkeleton() {
  return (
    <View
      className="bg-surface rounded-2xl border border-surfaceAlt overflow-hidden mb-4"
      style={shadows.card}
      accessibilityLabel="Loading recipe"
    >
      {/* Image Skeleton Box */}
      <View
        className="w-full bg-surfaceAlt"
        style={{ height: scale(180) }}
      />

      {/* Body Skeleton */}
      <View className="p-4">
        {/* Title line */}
        <View
          className="w-3/4 bg-surfaceAlt rounded mb-2"
          style={{ height: scale(18) }}
        />

        {/* Metadata line */}
        <View
          className="w-1/2 bg-surfaceAlt rounded mb-2"
          style={{ height: scale(14) }}
        />

        {/* Rating line */}
        <View
          className="w-1/3 bg-surfaceAlt rounded"
          style={{ height: scale(14) }}
        />
      </View>
    </View>
  );
}
