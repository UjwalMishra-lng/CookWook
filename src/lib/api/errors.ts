// A structured error class for all API failures.
// Instead of catching raw Axios errors in components,
// the repository always throws ApiError — a predictable shape.

export type ApiErrorKind =
  | "network"   // no internet, timeout, DNS failure
  | "http"      // server responded with 4xx or 5xx
  | "unknown";  // anything else

export class ApiError extends Error {
  kind: ApiErrorKind;
  status?: number; // HTTP status code, only present for "http" errors

  constructor(message: string, kind: ApiErrorKind, status?: number) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
  }
}

// Helper — converts a raw Axios error into a typed ApiError.
// Call this in repository catch blocks, not in components.
export function toApiError(error: unknown): ApiError {
  // We import AxiosError type only — no Axios runtime imported here
  if (typeof error === "object" && error !== null && "isAxiosError" in error) {
    const axiosErr = error as unknown as {
      response?: { status: number; data?: { message?: string } };
      message: string;
    };

    if (axiosErr.response) {
      // Server responded — HTTP error
      const message =
        axiosErr.response.data?.message ??
        `Request failed with status ${axiosErr.response.status}`;
      return new ApiError(message, "http", axiosErr.response.status);
    }

    // No response — network failure
    return new ApiError(axiosErr.message, "network");
  }

  if (error instanceof Error) {
    return new ApiError(error.message, "unknown");
  }

  return new ApiError("An unexpected error occurred", "unknown");
}
