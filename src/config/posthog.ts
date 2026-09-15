import { PostHogOptions } from "posthog-react-native";

export const POSTHOG_API_KEY =
  process.env.EXPO_PUBLIC_POSTHOG_API_KEY ||
  "phc_nu2L5QMpYVgaAmHt77kaPch5Ua6gWEFkphXFkzDbWuyF";

export const POSTHOG_HOST =
  process.env.EXPO_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export const posthogOptions: PostHogOptions = {
  host: POSTHOG_HOST,
  // Automatic screen views and app lifecycle tracking
  captureAppLifecycleEvents: true,
  enableSessionReplay: false,
  // Flush immediately in development so events appear instantly in your dashboard
  flushAt: __DEV__ ? 1 : 20,
  flushInterval: __DEV__ ? 0 : 30000,
};
