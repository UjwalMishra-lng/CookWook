import { ApiError } from "@/lib/api/errors";

export function getErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) {
    if (error instanceof Error) return error.message;
    return "An unexpected error occurred. Please try again.";
  }

  // Network / connectivity failures
  if (error.kind === "network") {
    return "No internet connection. Please check your network and try again.";
  }

  // HTTP errors — map status codes to friendly copy
  if (error.kind === "http" && error.status !== undefined) {
    switch (error.status) {
      case 400:
        return "The request was invalid. Please check your input and try again.";
      case 401:
        return "Your session has expired. Please sign in again.";
      case 403:
        return "You don't have permission to access this.";
      case 404:
        return "We couldn't find what you were looking for.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      case 500:
      case 502:
      case 503:
      case 504:
        return "The server is temporarily unavailable. Please try again later.";
      default:
        // Fall through to the ApiError message if we got one from the server
        return error.message || `Server error (${error.status}). Please try again.`;
    }
  }

  // Unknown — use message if available
  return error.message || "An unexpected error occurred. Please try again.";
}
