import AppText from "@/components/ui/AppText";
import { View } from "react-native";

type Props = {
  instructions: string[];
};

export default function RecipeInstructions({ instructions }: Props) {
  return (
    <View className="mb-6">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-3">
        <AppText variant="title" className="font-bold text-textPrimary">
          Instructions
        </AppText>
        <AppText variant="hint" className="text-primary font-semibold">
          {instructions.length} steps
        </AppText>
      </View>

      {/* Step Cards */}
      {instructions.map((step, index) => (
        <View
          key={index}
          className="flex-row bg-surface border border-surfaceAlt rounded-xl p-4 mb-3"
        >
          {/* Step Number Badge */}
          <View className="w-7 h-7 rounded-full bg-primary items-center justify-center mr-3 mt-0.5">
            <AppText className="text-background font-bold">
              {index + 1}
            </AppText>
          </View>

          {/* Instruction Text */}
          <AppText
            variant="body"
            className="text-textPrimary flex-1 leading-5"
          >
            {step}
          </AppText>
        </View>
      ))}
    </View>
  );
}
