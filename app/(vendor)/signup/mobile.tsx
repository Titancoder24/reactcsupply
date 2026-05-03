import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Input, OtpInput } from "@/components/ui";
import { useVendorOnboarding } from "@/stores/vendor-onboarding-store";
import { VendorShell } from "@/components/vendor/VendorShell";
import { isValidIndianPhone } from "@/lib/utils";

export default function VendorMobile() {
  const router = useRouter();
  const { phone, otp, passcode, setField } = useVendorOnboarding();
  const [otpSent, setOtpSent] = useState(false);

  const phoneOk = isValidIndianPhone(phone);
  const otpOk = otp.length === 6;
  const passcodeOk = passcode.length === 4;
  const canContinue = phoneOk && otpOk && passcodeOk;

  return (
    <VendorShell
      title="Mobile Registration"
      step={2}
      ctaLabel={otpSent ? "Continue" : "Send OTP"}
      ctaDisabled={otpSent ? !canContinue : !phoneOk}
      onCta={() => {
        if (!otpSent) {
          setOtpSent(true);
        } else {
          router.push("/(vendor)/signup/business-type");
        }
      }}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary }}>
        Enter your mobile number
      </Text>

      <Input
        label="Mobile Number"
        value={phone}
        onChangeText={(t) => setField("phone", t.replace(/\D/g, "").slice(0, 10))}
        placeholder="98765 43210"
        keyboardType="number-pad"
        maxLength={10}
        surface="vendor"
        prefix={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: 14 }}>+91</Text>
            <View style={{ width: 1, height: 20, backgroundColor: tokens.color.border.input, marginHorizontal: 12 }} />
          </View>
        }
      />

      {otpSent && (
        <>
          <View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: 12,
                color: tokens.color.text.secondary,
                marginBottom: 8,
              }}
            >
              Enter OTP
            </Text>
            <OtpInput value={otp} onChange={(v) => setField("otp", v)} length={6} surface="vendor" />
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: 12,
                color: tokens.color.text.secondary,
                marginBottom: 8,
              }}
            >
              Create 4-digit Passcode
            </Text>
            <OtpInput value={passcode} onChange={(v) => setField("passcode", v)} length={4} surface="vendor" />
          </View>
        </>
      )}
    </VendorShell>
  );
}
