import { QueryClient } from "@tanstack/react-query";

// Centralized QueryClient with mobile-appropriate defaults.
// Individual queries can override any of these per-query.

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,   // 5 min — recipes don't change often
      gcTime: 10 * 60 * 1000,     // 10 min — keep cache while browsing
      retry: 2,                    // mobile networks are flaky — retry twice
      refetchOnMount: true,        // fresh data when screen is visited
      refetchOnWindowFocus: false, // not applicable on mobile
      refetchOnReconnect: true,    // refresh when network comes back
    },
  },
});
