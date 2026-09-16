// Represents the two possible lifecycle stages of onboarding
export type OnboardingStatus = "NEW" | "READY";

// The user data we keep after signup — no password, ever
export type OnboardingUser = {
  name: string;
  email: string;
};

// The full shape of onboarding state
export type OnboardingState = {
  status: OnboardingStatus;
  user?: OnboardingUser;
};
