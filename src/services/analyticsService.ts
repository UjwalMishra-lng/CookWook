import { POSTHOG_API_KEY, posthogOptions } from "@/config/posthog";
import { Recipe } from "@/types/recipe";
import { PostHog } from "posthog-react-native";


export const posthogClient = new PostHog(POSTHOG_API_KEY, posthogOptions);

export interface SignupAnalyticsPayload {
  name: string;
  email: string;
}

export interface RecipeViewPayload {
  id: number;
  name: string;
  cuisine?: string;
  difficulty?: string;
  rating?: number;
}

export interface RecipeActionPayload {
  id: number;
  name: string;
  cuisine?: string;
}

export interface SearchAnalyticsPayload {
  query: string;
  resultsCount: number;
}

export interface FilterAnalyticsPayload {
  filterType: "tag" | "mealType" | "sort";
  value: string;
}

export const analyticsService = {
  client: posthogClient,

  identifyUser(distinctId: string, properties?: Record<string, any>) {
    try {
      posthogClient.identify(distinctId, properties);
    } catch (err) {
      console.warn("[AnalyticsService] Failed to identify user:", err);
    }
  },

  resetUser() {
    try {
      posthogClient.reset();
    } catch (err) {
      console.warn("[AnalyticsService] Failed to reset user:", err);
    }
  },

  trackSignup({ name, email }: SignupAnalyticsPayload) {
    try {
      this.identifyUser(email, { name, email });
      posthogClient.capture("user_signup", { name, email });
      posthogClient.logger.info("user completed signup", { email });
    } catch (err) {
      console.warn("[AnalyticsService] Failed to track signup:", err);
    }
  },

  trackLogout(email?: string) {
    try {
      posthogClient.capture("user_logout", email ? { email } : undefined);
      posthogClient.logger.info("user logged out", email ? { email } : undefined);
      this.resetUser();
    } catch (err) {
      console.warn("[AnalyticsService] Failed to track logout:", err);
    }
  },

  trackRecipeViewed(recipe: Recipe | RecipeViewPayload) {
    try {
      const properties: Record<string, any> = {
        recipe_id: recipe.id,
        recipe_name: recipe.name,
      };
      if (recipe.cuisine) properties.cuisine = recipe.cuisine;
      if (recipe.difficulty) properties.difficulty = recipe.difficulty;
      if (recipe.rating !== undefined) properties.rating = recipe.rating;

      posthogClient.capture("recipe_viewed", properties);
      posthogClient.logger.info("recipe viewed", {
        recipe_id: recipe.id,
        recipe_name: recipe.name,
      });
    } catch (err) {
      console.warn("[AnalyticsService] Failed to track recipe viewed:", err);
    }
  },

  trackRecipeSaved(recipe: Recipe | RecipeActionPayload) {
    try {
      const properties: Record<string, any> = {
        recipe_id: recipe.id,
        recipe_name: recipe.name,
      };
      if (recipe.cuisine) properties.cuisine = recipe.cuisine;

      posthogClient.capture("recipe_saved", properties);
      posthogClient.logger.info("recipe saved to bookmarks", {
        recipe_id: recipe.id,
        recipe_name: recipe.name,
      });
    } catch (err) {
      console.warn("[AnalyticsService] Failed to track recipe saved:", err);
    }
  },

  trackRecipeUnsaved(recipe: Recipe | RecipeActionPayload) {
    try {
      const properties: Record<string, any> = {
        recipe_id: recipe.id,
        recipe_name: recipe.name,
      };
      if (recipe.cuisine) properties.cuisine = recipe.cuisine;

      posthogClient.capture("recipe_unsaved", properties);
      posthogClient.logger.info("recipe removed from bookmarks", {
        recipe_id: recipe.id,
        recipe_name: recipe.name,
      });
    } catch (err) {
      console.warn("[AnalyticsService] Failed to track recipe unsaved:", err);
    }
  },

  trackSearch({ query, resultsCount }: SearchAnalyticsPayload) {
    try {
      posthogClient.capture("recipe_searched", {
        search_query: query,
        results_count: resultsCount,
      });
      posthogClient.logger.info("recipe search performed", {
        query,
        resultsCount,
      });
    } catch (err) {
      console.warn("[AnalyticsService] Failed to track search:", err);
    }
  },

  trackFilterApplied({ filterType, value }: FilterAnalyticsPayload) {
    try {
      posthogClient.capture("filter_applied", {
        filter_type: filterType,
        filter_value: value,
      });
    } catch (err) {
      console.warn("[AnalyticsService] Failed to track filter applied:", err);
    }
  },

  capture(event: string, properties?: Record<string, any>) {
    try {
      posthogClient.capture(event, properties);
    } catch (err) {
      console.warn("[AnalyticsService] Failed to capture event:", event, err);
    }
  },

  logInfo(message: string, attributes?: Record<string, any>) {
    try {
      posthogClient.logger.info(message, attributes);
    } catch (err) {
      console.warn("[AnalyticsService] Failed to log info:", err);
    }
  },

  logWarn(message: string, attributes?: Record<string, any>) {
    try {
      posthogClient.logger.warn(message, attributes);
    } catch (err) {
      console.warn("[AnalyticsService] Failed to log warn:", err);
    }
  },

  logError(message: string, attributes?: Record<string, any>) {
    try {
      posthogClient.logger.error(message, attributes);
    } catch (err) {
      console.warn("[AnalyticsService] Failed to log error:", err);
    }
  },
};

export default analyticsService;
