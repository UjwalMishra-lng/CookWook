import { fontSize, spacing } from "@/theme";
import { useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import AppText from "./AppText";

type InputProps = {
  label: string;
  error?: string;
  secureEntry?: boolean;
} & Omit<TextInputProps, "style">;

export default function Input({
  label,
  error,
  secureEntry = false,
  ...rest
}: InputProps) {
  const [hidden, setHidden] = useState(secureEntry);

  return (
    <View className="mb-4">
      {/* Label */}
      <AppText variant="label" className="mb-1">
        {label}
      </AppText>

      {/* Input row */}
      <View
        className={`flex-row items-center rounded-xl border px-4 bg-surface h-[52px] ${
          error ? "border-error" : "border-border"
        }`}
      >
        <TextInput
          className="flex-1 text-textPrimary"
          style={{ fontSize: fontSize.md }}
          placeholderTextColor="#8C7A70"
          secureTextEntry={hidden}
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />

        {/* Show/hide toggle — only for password fields */}
        {secureEntry && (
          <TouchableOpacity
            onPress={() => setHidden((prev) => !prev)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <AppText variant="label">{hidden ? "Show" : "Hide"}</AppText>
          </TouchableOpacity>
        )}
      </View>

      {/* Error — only renders when error prop is set */}
      {error && (
        <AppText variant="error" className="mt-1">
          {error}
        </AppText>
      )}
    </View>
  );
}
