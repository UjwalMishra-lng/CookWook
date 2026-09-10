import { useOnboardingStore } from "@/features/onboarding/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const status = useOnboardingStore((s) => s.status);
  const hasHydrated = useOnboardingStore((s) => s._hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return; // wait for AsyncStorage to load
    if (status === "NEW") {
      router.replace("/signup");
    } else {
      router.replace("/(root)/(tabs)");
    }
  }, [hasHydrated, status]);

  // Render nothing while the routing decision is made
  return null;
}
