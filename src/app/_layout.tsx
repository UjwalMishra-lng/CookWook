import "../../global.css";
import { queryClient } from "@/config/queryClient";
import { toastConfig } from "@/config/toastConfig";
import { posthogClient } from "@/services/analyticsService";
import { ErrorBoundary } from "@/components/ErrorBoundary";
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
    <PostHogProvider client={posthogClient}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <Stack screenOptions={{ headerShown: false }} />
          </ErrorBoundary>
          <Toast config={toastConfig} />
        </QueryClientProvider>
      </SafeAreaProvider>
    </PostHogProvider>
  );
}
