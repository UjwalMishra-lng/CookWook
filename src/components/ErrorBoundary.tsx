import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { colors, fontSize, spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Component, ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred.";
    return { hasError: true, errorMessage: message };
  }

  componentDidCatch(error: unknown, info: { componentStack: string }) {
    if (__DEV__) {
      console.error("[ErrorBoundary] Caught error:", error);
      console.error("[ErrorBoundary] Component stack:", info.componentStack);
    }

  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: spacing.lg,
            }}
          >
            {/* Icon */}
            <Ionicons
              name="warning-outline"
              size={scale(64)}
              color={colors.error}
              style={{ marginBottom: spacing.md }}
            />

            {/* Heading */}
            <AppText
              variant="hero"
              className="text-center"
              style={{ marginBottom: spacing.sm }}
            >
              Oops!
            </AppText>

            {/* Sub-heading */}
            <AppText
              variant="title"
              className="text-center"
              style={{ marginBottom: spacing.sm }}
            >
              Something went wrong
            </AppText>

            {/* Detail */}
            <AppText
              variant="hint"
              className="text-center"
              style={{
                lineHeight: moderateScale(22),
                marginBottom: spacing.xl,
                maxWidth: 320,
              }}
            >
              The app ran into an unexpected problem. Your data is safe — tap
              below to try again.
            </AppText>

            {/* Retry */}
            <View style={{ width: "100%", maxWidth: 240 }}>
              <Button label="Try Again" onPress={this.handleReset} />
            </View>

            {/* Dev-only detail */}
            {__DEV__ && this.state.errorMessage ? (
              <AppText
                variant="hint"
                className="text-center"
                style={{
                  marginTop: spacing.lg,
                  color: colors.error,
                  fontSize: fontSize.xs,
                  maxWidth: 320,
                }}
              >
                {this.state.errorMessage}
              </AppText>
            ) : null}
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
