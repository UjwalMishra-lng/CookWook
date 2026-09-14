import AppText from "@/components/ui/AppText";
import { colors } from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function HomeHeader() {
  return (
    <View className="px-6 pt-2 pb-2.5 bg-background z-10">
      <View className="flex-row items-center gap-2">
        <AppText variant="hero">Cook Wook</AppText>
        <MaterialCommunityIcons
          name="chef-hat"
          size={moderateScale(28)}
          color={colors.primary}
        />
      </View>
      <AppText variant="hint" className="text-textSecondary mt-0.5">
        Find & cook delicious recipes
      </AppText>
    </View>
  );
}
