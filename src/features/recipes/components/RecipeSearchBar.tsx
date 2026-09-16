import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Keyboard, Pressable, TextInput, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  isLoading?: boolean;
};

export default function RecipeSearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = "Search recipes, cuisine, ingredients...",
  isLoading = false,
}: Props) {
  return (
    <View className="flex-row items-center bg-surface border border-surfaceAlt rounded-xl px-3.5 h-12">
      <Ionicons
        name="search-outline"
        size={scale(18)}
        color={value.length > 0 ? colors.primary : colors.textSecondary}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8C7A70"
        className="flex-1 ml-2.5 text-textPrimary text-sm h-full"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="never"
        onSubmitEditing={Keyboard.dismiss}
      />

      {isLoading ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : value.length > 0 ? (
        <Pressable
          onPress={onClear}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear search text"
        >
          <Ionicons
            name="close-circle"
            size={scale(18)}
            color={colors.textSecondary}
          />
        </Pressable>
      ) : null}
    </View>
  );
}
