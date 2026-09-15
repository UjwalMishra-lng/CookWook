import "../../global.css";
import { POSTHOG_API_KEY, posthogOptions } from "@/config/posthog";
import { queryClient } from "@/config/queryClient";
import { toastConfig } from "@/config/toastConfig";
import { QueryClientProvider } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { cssInterop } from "nativewind";
import { PostHogProvider } from "posthog-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// Keep native splash screen visible until app is hydrated
SplashScreen.preventAutoHideAsync().catch(() => {});

cssInterop(Image, { className: "style" });

export default function RootLayout() {
  return (
    <PostHogProvider apiKey={POSTHOG_API_KEY} options={posthogOptions}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast config={toastConfig} />
        </QueryClientProvider>
      </SafeAreaProvider>
    </PostHogProvider>
  );
}
