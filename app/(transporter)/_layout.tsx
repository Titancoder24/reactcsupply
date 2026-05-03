import { Stack } from "expo-router";

export default function TransporterLayout() {
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
