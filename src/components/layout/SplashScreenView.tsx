import AppText from "@/components/ui/AppText";
import { colors } from "@/theme";
import { Image } from "expo-image";
import { ActivityIndicator, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

export default function SplashScreenView() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      {/* Centered App Icon */}
      <View
        className="w-32 h-32 rounded-3xl overflow-hidden mb-5 border border-primary/30"
        style={{
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 18,
          elevation: 12,
        }}
      >
        <Image
          source={require("@/assets/images/icon.png")}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      </View>

      {/* Brand Title */}
      <AppText
        variant="hero"
        className="text-center font-bold text-textPrimary mb-1.5"
        style={{ fontSize: moderateScale(34) }}
      >
        Cook Wook
      </AppText>

      {/* Tagline */}
      <AppText
        variant="hint"
        className="text-center text-textSecondary"
        style={{ fontSize: moderateScale(14) }}
      >
        Find & cook delicious recipes
      </AppText>

      {/* Subtle Loading Indicator */}
      <View className="mt-8">
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    </View>
  );
}
