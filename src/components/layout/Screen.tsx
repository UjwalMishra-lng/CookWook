import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Screen({ children, className = "", style }: ScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className={`flex-1 bg-background ${className}`} style={style}>
        {children}
      </View>
    </SafeAreaView>
  );
}
