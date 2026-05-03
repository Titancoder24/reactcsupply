import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/theme/tokens";
import { Header, StepperBar, Button } from "@/components/ui";
import { ArrowRight } from "@/components/ui/Icon";

interface TransporterShellProps {
  title: string;
  subtitle?: string;
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
  subtitle,
  step,
  total = 12,
  ctaLabel,
  onCta,
  ctaDisabled,
  children,
  showBack = true,
}) => (
  <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <Header title={title} subtitle={subtitle} surface="transporter" showBack={showBack} />
      <StepperBar current={step} total={total} surface="transporter" label="Driver onboarding" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 24 }}>
        {children}
      </ScrollView>
      <View
        style={{
          padding: 20,
          paddingBottom: 24,
          backgroundColor: tokens.color.surface.white,
          borderTopWidth: 1,
          borderTopColor: tokens.color.border.hairline,
        }}
      >
        <Button
          label={ctaLabel}
          onPress={onCta}
          disabled={ctaDisabled}
          surface="transporter"
          iconRight={<ArrowRight size={18} color="#fff" />}
        />
      </View>
    </SafeAreaView>
  </View>
);
