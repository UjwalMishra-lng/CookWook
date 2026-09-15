import SplashScreenView from "@/components/layout/SplashScreenView";
import { useOnboardingStore } from "@/features/onboarding/store";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const status = useOnboardingStore((s) => s.status);
  const hasHydrated = useOnboardingStore((s) => s._hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    // Small delay ensures smooth transition without flash
    const timer = setTimeout(async () => {
      try {
        await SplashScreen.hideAsync();
      } catch {
        // ignore if already hidden
      }

      if (status === "NEW") {
        router.replace("/signup");
      } else {
        router.replace("/(root)/(tabs)");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [hasHydrated, status, router]);

  // Render branded splash view while hydration and routing complete
  return <SplashScreenView />;
}
