import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom > 0 ? insets.bottom : scale(8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: moderateScale(11),
          fontWeight: "600",
          marginTop: -2,
          marginBottom: 4,
        },
        tabBarStyle: {
          // 100% Solid opaque background — completely blocks any cards/text from bleeding through
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.surfaceAlt,
          // Attached to the bottom edge so cards cleanly slide under and vanish
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: scale(58) + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: scale(8),
          // Upward elevation/shadow so tab bar floats cleanly over content
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.5,
          shadowRadius: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "restaurant" : "restaurant-outline"}
              size={scale(20)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={scale(20)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={scale(20)}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
