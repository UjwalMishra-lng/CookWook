import { usePostHog } from "posthog-react-native";
import { useCallback } from "react";

export { usePostHog };

export type AnalyticsEvent =
  | "user_signup"
  | "user_logout"
  | "recipe_viewed"
  | "recipe_saved"
  | "recipe_unsaved"
  | "recipe_search"
  | "filter_applied"
  | "instruction_step_completed"
  | "button_pressed";

export function useAnalytics() {
  const posthog = usePostHog();

  const trackEvent = useCallback(
    (event: AnalyticsEvent, properties?: Record<string, any>) => {
      posthog?.capture(event, properties);
    },
    [posthog]
  );

  const logInfo = useCallback(
    (message: string, attributes?: Record<string, any>) => {
      posthog?.logger?.info(message, attributes);
    },
    [posthog]
  );

  const logWarn = useCallback(
    (message: string, attributes?: Record<string, any>) => {
      posthog?.logger?.warn(message, attributes);
    },
    [posthog]
  );

  const logError = useCallback(
    (message: string, attributes?: Record<string, any>) => {
      posthog?.logger?.error(message, attributes);
    },
    [posthog]
  );

  const identify = useCallback(
    (distinctId: string, userProperties?: Record<string, any>) => {
      posthog?.identify(distinctId, userProperties);
    },
    [posthog]
  );

  const reset = useCallback(() => {
    posthog?.reset();
  }, [posthog]);

  return {
    posthog,
    trackEvent,
    logInfo,
    logWarn,
    logError,
    identify,
    reset,
  };
}
