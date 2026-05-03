import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/theme/tokens";
import { Header, StepperBar, Button } from "@/components/ui";

interface BookingShellProps {
  title: string;
  step: number;
  total?: number;
  ctaLabel: string;
  onCta: () => void;
  ctaDisabled?: boolean;
  children: React.ReactNode;
}

export const BookingShell: React.FC<BookingShellProps> = ({
  title,
  step,
  total = 7,
  ctaLabel,
  onCta,
  ctaDisabled,
  children,
}) => (
  <View style={{ flex: 1, backgroundColor: tokens.color.surface.light }}>
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <Header title={title} surface="vendor" />
      <StepperBar current={step} total={total} surface="vendor" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 24 }}>
        {children}
      </ScrollView>
      <View
        style={{
          padding: 20,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: tokens.color.border.divider,
        }}
      >
        <Button label={ctaLabel} onPress={onCta} disabled={ctaDisabled} surface="vendor" />
      </View>
    </SafeAreaView>
  </View>
);
