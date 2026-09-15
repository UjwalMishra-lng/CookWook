import AppText from "@/components/ui/AppText";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { ToastConfig } from "react-native-toast-message";
import { moderateScale, scale } from "react-native-size-matters";

export const toastConfig: ToastConfig = {
  saved: ({ text1 }) => (
    <View className="w-full items-center justify-center">
      <View
        className="flex-row items-center bg-[#15803D] px-4 py-2 rounded-full border border-[#22C55E]/50"
        style={{
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons
          name="checkmark-circle"
          size={scale(16)}
          color="#FFFFFF"
          style={{ marginRight: scale(6) }}
        />
        <AppText
          className="text-white font-bold"
          style={{ fontSize: moderateScale(13) }}
        >
          {text1 || "Saved"}
        </AppText>
      </View>
    </View>
  ),

  removed: ({ text1 }) => (
    <View className="w-full items-center justify-center">
      <View
        className="flex-row items-center bg-[#271E18] px-4 py-2 rounded-full border border-white/15"
        style={{
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons
          name="bookmark-outline"
          size={scale(15)}
          color="#E4D5CB"
          style={{ marginRight: scale(6) }}
        />
        <AppText
          className="text-[#FFF8F4] font-medium"
          style={{ fontSize: moderateScale(13) }}
        >
          {text1 || "Removed"}
        </AppText>
      </View>
    </View>
  ),
};
