import { fontSize } from "@/theme";
import { ReactNode } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type TextVariant =
  | "hero"
  | "title"
  | "body"
  | "label"
  | "hint"
  | "error";

type AppTextProps = {
  variant?: TextVariant;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
} & Omit<TextProps, "style" | "className">;

const variantFontSize: Record<TextVariant, number> = {
  hero: fontSize.hero,
  title: fontSize.xl,
  body: fontSize.md,
  label: fontSize.sm,
  hint: fontSize.sm,
  error: fontSize.sm,
};

const variantClass: Record<TextVariant, string> = {
  hero: "text-textPrimary font-bold",
  title: "text-textPrimary font-semibold",
  body: "text-textPrimary font-normal",
  label: "text-textSecondary font-medium",
  hint: "text-textSecondary font-normal",
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
