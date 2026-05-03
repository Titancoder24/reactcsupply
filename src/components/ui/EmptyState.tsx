import React from "react";
import { View, Text } from "react-native";
import { tokens } from "@/theme/tokens";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  cta?: { label: string; onPress: () => void };
  secondaryCta?: { label: string; onPress: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  cta,
  secondaryCta,
}) => (
  <View
    style={{
      paddingVertical: 48,
      paddingHorizontal: 24,
      alignItems: "center",
      gap: 8,
    }}
  >
    {icon && (
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 22,
          backgroundColor: tokens.color.ink[50],
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          borderWidth: 1,
          borderColor: tokens.color.border.hairline,
        }}
      >
        {icon}
      </View>
    )}
    <Text
      style={{
        fontFamily: tokens.font.family.display,
        fontWeight: "700",
        fontSize: 18,
        color: tokens.color.ink[900],
        letterSpacing: -0.3,
        textAlign: "center",
      }}
    >
      {title}
    </Text>
    {description && (
      <Text
        style={{
          marginTop: 4,
          fontFamily: tokens.font.family.body,
          fontSize: 14,
          color: tokens.color.ink[500],
          textAlign: "center",
          lineHeight: 20,
          maxWidth: 320,
        }}
      >
        {description}
      </Text>
    )}
    {(cta || secondaryCta) && (
      <View style={{ marginTop: 16, flexDirection: "row", gap: 8 }}>
        {secondaryCta && (
          <Button
            label={secondaryCta.label}
            onPress={secondaryCta.onPress}
            variant="secondary"
            fullWidth={false}
            size="md"
          />
        )}
        {cta && (
          <Button label={cta.label} onPress={cta.onPress} fullWidth={false} size="md" />
        )}
      </View>
    )}
  </View>
);
