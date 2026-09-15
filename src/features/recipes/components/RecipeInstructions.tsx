import AppText from "@/components/ui/AppText";
import { shadows } from "@/theme";
import { View } from "react-native";
import { moderateScale } from "react-native-size-matters";

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

      {/* Single Glassy Card Container */}
      <View
        className="bg-surface/90 border border-white/10 rounded-2xl p-5 overflow-hidden"
        style={shadows.card}
      >
        {instructions.map((step, index) => {
          const isLast = index === instructions.length - 1;
          return (
            <View
              key={index}
              className={`flex-row items-start ${
                !isLast ? "border-b border-surfaceAlt/60 pb-4 mb-4" : ""
              }`}
            >
              {/* Round orange badge with centered white number */}
              <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-3.5 mt-0.5">
                <AppText className="text-white font-bold text-xs">
                  {index + 1}
                </AppText>
              </View>

              {/* Instruction Text */}
              <AppText
                variant="body"
                className="text-textPrimary flex-1"
                style={{
                  fontSize: moderateScale(14),
                  lineHeight: moderateScale(22),
                }}
              >
                {step}
              </AppText>
            </View>
          );
        })}
      </View>
    </View>
  );
}
