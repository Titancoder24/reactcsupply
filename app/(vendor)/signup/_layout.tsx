import { Stack } from "expo-router";

export default function SignupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#F9FAFB" },
        animation: "slide_from_right",
      }}
    />
  );
}
