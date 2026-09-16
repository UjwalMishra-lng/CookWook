import { PostHogOptions } from "posthog-react-native";

const apiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
const host = process.env.EXPO_PUBLIC_POSTHOG_HOST;

if (!apiKey) {
  throw new Error(
    "[PostHog] EXPO_PUBLIC_POSTHOG_API_KEY is not set.\n" +
    "Add it to your .env file and restart the Metro bundler."
  );
}

if (!host) {
  throw new Error(
    "[PostHog] EXPO_PUBLIC_POSTHOG_HOST is not set.\n" +
    "Add it to your .env file and restart the Metro bundler."
  );
}

export const POSTHOG_API_KEY: string = apiKey;
export const POSTHOG_HOST: string = host;

export const posthogOptions: PostHogOptions = {
  host: POSTHOG_HOST,
  // Automatic screen views and app lifecycle tracking
  captureAppLifecycleEvents: true,
  enableSessionReplay: false,
  // Flush immediately in development so events appear instantly in your dashboard
  flushAt: __DEV__ ? 1 : 20,
  flushInterval: __DEV__ ? 0 : 30000,
};
