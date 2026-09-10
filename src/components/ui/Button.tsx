import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import AppText from "./AppText";

type ButtonProps = {
  label: string;
  loading?: boolean;
  variant?: "primary" | "ghost";
} & Omit<TouchableOpacityProps, "style">;

export default function Button({
  label,
  loading = false,
  variant = "primary",
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseClass = "h-[52px] rounded-xl justify-center items-center px-6";

  const variantClass =
    variant === "primary"
      ? "bg-primary"
      : "bg-transparent border border-primary";

  const disabledClass = isDisabled ? "opacity-50" : "";

  return (
    <TouchableOpacity
      className={`${baseClass} ${variantClass} ${disabledClass}`}
      disabled={isDisabled}
      activeOpacity={0.75}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#0F0F0F" : "#FF6B35"}
          size="small"
        />
      ) : (
        <AppText
          variant="body"
          className={`font-semibold ${variant === "ghost" ? "text-primary" : "text-background"}`}
        >
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
}
