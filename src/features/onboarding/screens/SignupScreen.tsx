import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AppText from "@/components/ui/AppText";
import Screen from "@/components/layout/Screen";
import {
  signupSchema,
  SignupFormValues,
} from "@/features/onboarding/schemas/signupSchema";
import { useOnboardingStore } from "@/features/onboarding/store";
import { spacing } from "@/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

// FormErrors mirrors the form fields — each key holds an error string or undefined
type FormErrors = Partial<Record<keyof SignupFormValues, string>>;

export default function SignupScreen() {
  const router = useRouter();
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);
  const [values, setValues] = useState<SignupFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof SignupFormValues) => (text: string) => {
    setValues((prev) => ({ ...prev, [field]: text }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const result = signupSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      const knownFields: (keyof SignupFormValues)[] = [
        "name",
        "email",
        "password",
        "confirmPassword",
      ];

      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (
          typeof field === "string" &&
          knownFields.includes(field as keyof SignupFormValues) &&
          !fieldErrors[field as keyof SignupFormValues]
        ) {
          fieldErrors[field as keyof SignupFormValues] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    completeOnboarding({
      name: result.data.name,
      email: result.data.email,
    });
    // replace() so the user can't press back to get to the signup screen
    router.replace("/(root)/(tabs)");
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            paddingBottom: spacing.xxl,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mb-8 mt-4">
            <AppText variant="hero">Cook Wook</AppText>
            <AppText variant="hint" className="mt-2">
              Create your account to get started
            </AppText>
          </View>

          {/* Form */}
          <View>
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={values.name}
              onChangeText={handleChange("name")}
              keyboardType="default"
              returnKeyType="next"
              error={errors.name}
            />

            <Input
              label="Email"
              placeholder="john@example.com"
              value={values.email}
              onChangeText={handleChange("email")}
              keyboardType="email-address"
              returnKeyType="next"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Min. 8 characters"
              value={values.password}
              onChangeText={handleChange("password")}
              secureEntry
              returnKeyType="next"
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              secureEntry
              returnKeyType="done"
              error={errors.confirmPassword}
            />
          </View>

          {/* Submit */}
          <View className="mt-4">
            <Button
              label="Create Account"
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
