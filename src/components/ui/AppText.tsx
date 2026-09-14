import { fontSize } from "@/theme";
import { ReactNode } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type TextVariant =
  | "hero"    // large display, screen titles
  | "title"   // section headings
  | "body"    // regular body text
  | "label"   // input labels
  | "hint"    // secondary/helper text
  | "error";  // validation error messages

// className maps to NativeWind for colors, weight etc.
// style is for moderateScale font sizes — can't be done in Tailwind
type AppTextProps = {
  variant?: TextVariant;
  children: ReactNode;
  style?: StyleProp<TextStyle>; // accepts single object, array, false, null
  className?: string;           // NativeWind passthrough
} & Omit<TextProps, "style" | "className">;

// Per-variant font size (moderateScale) — Tailwind can't compute these
const variantFontSize: Record<TextVariant, number> = {
  hero:  fontSize.hero,
  title: fontSize.xl,
  body:  fontSize.md,
  label: fontSize.sm,
  hint:  fontSize.sm,
  error: fontSize.sm,
};

// Per-variant NativeWind classes for color and weight
const variantClass: Record<TextVariant, string> = {
  hero:  "text-textPrimary font-bold",
  title: "text-textPrimary font-semibold",
  body:  "text-textPrimary font-normal",
  label: "text-textSecondary font-medium",
  hint:  "text-textSecondary font-normal",
  error: "text-error font-normal",
};

export default function AppText({
  variant = "body",
  children,
  style,
  className = "",
  ...rest
}: AppTextProps) {
  return (
    <Text
      className={`${variantClass[variant]} ${className}`}
      style={[{ fontSize: variantFontSize[variant] }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
