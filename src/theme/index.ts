import { moderateScale, scale, } from "react-native-size-matters";

// COLOR PALETTE
export const colors = {
  // Brand
  primary: "#FF6B35",       // warm orange — the main action color
  primaryLight: "#FF8C5A",  // lighter shade for hover/pressed states

  // Backgrounds
  background: "#0F0F0F",    // near-black page background
  surface: "#1C1C1E",       // card / input surfaces (slightly lighter)
  surfaceAlt: "#2C2C2E",    // secondary surface (dividers, tags)

  // Text
  textPrimary: "#F5F5F5",   // headings and body text
  textSecondary: "#9A9A9A", // hints, labels, placeholders

  // Borders
  border: "#3A3A3C",        // subtle input borders

  // Feedback
  error: "#FF453A",         // validation errors
  success: "#30D158",       // success states
} as const;


// TYPOGRAPHY
export const fontSize = {
  xs: moderateScale(11),   // fine print, captions
  sm: moderateScale(13),   // helper text, error messages
  md: moderateScale(15),   // body text, input values
  lg: moderateScale(17),   // labels, subheadings
  xl: moderateScale(22),   // section headings
  xxl: moderateScale(28),  // screen titles
  hero: moderateScale(34), // large display text
} as const;

// SPACING
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(48),
} as const;


// BORDER RADIUS
export const radius = {
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  full: 9999, // pill shape — doesn't need scaling
} as const;


// SHADOWS
export const shadows = {
  card: {
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Android
    elevation: 4,
  },
} as const;


export const theme = {
  colors,
  fontSize,
  spacing,
  radius,
  shadows,
} as const;
