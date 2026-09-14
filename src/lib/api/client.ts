import axios from "axios";

// Base URL comes from the environment — never hardcoded.
// EXPO_PUBLIC_ prefix makes it available in the client bundle.
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://dummyjson.com";

if (__DEV__) console.log("[API] Base URL:", BASE_URL);

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request Interceptor 
apiClient.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    // Future: inject auth token here when real auth is added
    // const token = authStore.getState().token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor() on it.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      const fullUrl = `${error?.config?.baseURL ?? ""}${error?.config?.url ?? ""}`;
      console.warn(
        `[API] Error on [${error?.config?.method?.toUpperCase()} ${fullUrl}]:`,
        error?.code,
        error?.message
      );
    }
    // Re-throw the raw Axios error — the repository converts it to ApiError
    return Promise.reject(error);
  }
);
