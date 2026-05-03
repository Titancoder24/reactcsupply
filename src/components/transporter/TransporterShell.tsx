import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/theme/tokens";
import { Header, StepperBar, Button } from "@/components/ui";

interface TransporterShellProps {
  title: string;
  step: number;
  total?: number;
  ctaLabel: string;
  onCta: () => void;
  ctaDisabled?: boolean;
  children: React.ReactNode;
  showBack?: boolean;
}

export const TransporterShell: React.FC<TransporterShellProps> = ({
  title,
  step,
  total = 12,
  ctaLabel,
  onCta,
  ctaDisabled,
  children,
  showBack = true,
}) => (
  <View style={{ flex: 1, backgroundColor: tokens.color.surface.softBg }}>
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <Header title={title} surface="transporter" showBack={showBack} />
      <StepperBar current={step} total={total} surface="transporter" />
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
        <Button label={ctaLabel} onPress={onCta} disabled={ctaDisabled} surface="transporter" />
      </View>
    </SafeAreaView>
  </View>
);
