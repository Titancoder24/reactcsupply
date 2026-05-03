import React from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/theme/tokens";
import { Header, StepperBar, Button } from "@/components/ui";
import { ArrowRight } from "@/components/ui/Icon";

interface BookingShellProps {
  title: string;
  subtitle?: string;
  step: number;
  total?: number;
  ctaLabel: string;
  onCta: () => void;
  ctaDisabled?: boolean;
  children: React.ReactNode;
}

export const BookingShell: React.FC<BookingShellProps> = ({
  title,
  subtitle,
  step,
  total = 7,
  ctaLabel,
  onCta,
  ctaDisabled,
  children,
}) => (
  <View style={{ flex: 1, backgroundColor: tokens.color.surface.page }}>
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <Header title={title} subtitle={subtitle} surface="vendor" />
      <StepperBar current={step} total={total} surface="vendor" label="Checkout" />
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
          surface="vendor"
          iconRight={<ArrowRight size={18} color="#fff" />}
        />
      </View>
    </SafeAreaView>
  </View>
);
