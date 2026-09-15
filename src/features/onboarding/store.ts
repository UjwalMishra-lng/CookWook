import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { OnboardingState, OnboardingUser } from "@/features/onboarding/types";

type OnboardingActions = {
  completeOnboarding: (user: OnboardingUser) => void;
  reset: () => void;
  // Internal flag — true once AsyncStorage has been read on launch
  _hasHydrated: boolean;
  _setHasHydrated: (value: boolean) => void;
};

type OnboardingStore = OnboardingState & OnboardingActions;

const initialState: OnboardingState = {
  status: "NEW",
  user: undefined,
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Hydration flag — starts false, set to true after AsyncStorage read
      _hasHydrated: false,
      _setHasHydrated: (value) => set({ _hasHydrated: value }),

      completeOnboarding: (user: OnboardingUser) =>
        set({ status: "READY", user }),

      // Clears both Zustand memory AND AsyncStorage — full logout
      reset: async () => {
        await AsyncStorage.removeItem("onboarding-storage");
        set({ ...initialState });
      },
    }),
    {
      name: "onboarding-storage", // the AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),

      // Only persist state — not actions or internal flags
      partialize: (state) => ({
        status: state.status,
        user: state.user,
      }),

      // Called when AsyncStorage read is complete on app launch
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
    }
  )
);
