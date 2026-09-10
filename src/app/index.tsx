import { Redirect } from "expo-router";

// Entry point — immediately redirect to the tabs navigator
export default function Index() {
  return <Redirect href="/(root)/(tabs)/" />;
}
