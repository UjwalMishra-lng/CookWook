import "../../global.css";
import { queryClient } from "@/config/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { cssInterop } from "nativewind";
import { SafeAreaProvider } from "react-native-safe-area-context";

import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/config/toastConfig";

// Keep native splash screen visible until app is hydrated
SplashScreen.preventAutoHideAsync().catch(() => {});

cssInterop(Image, { className: "style" });

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
