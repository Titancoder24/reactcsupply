import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { tokens } from "@/theme/tokens";
import { Input, OtpInput } from "@/components/ui";
import { TransporterShell } from "@/components/transporter/TransporterShell";
import { isValidIndianPhone } from "@/lib/utils";

export default function TransporterMobile() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const phoneOk = isValidIndianPhone(phone);
  const otpOk = otp.length === 6;

  return (
    <TransporterShell
      title="Enter Mobile Number"
      step={2}
      ctaLabel={otpSent ? "Continue" : "Send OTP"}
      ctaDisabled={otpSent ? !otpOk : !phoneOk}
      onCta={() => {
        if (!otpSent) setOtpSent(true);
        else router.push("/(transporter)/signup/join-as");
      }}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 14, color: tokens.color.text.secondary, textAlign: "center" }}>
        We will send OTP to verify
      </Text>

      <Input
        label="Mobile Number"
        value={phone}
        onChangeText={(t) => setPhone(t.replace(/\D/g, "").slice(0, 10))}
        placeholder="98765 43210"
        keyboardType="number-pad"
        maxLength={10}
        surface="transporter"
        prefix={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "Poppins", fontWeight: "500", fontSize: 14 }}>+91</Text>
            <View
              style={{
                width: 1,
                height: 20,
                backgroundColor: tokens.color.border.input,
                marginHorizontal: 12,
              }}
            />
          </View>
        }
      />

      {otpSent && <OtpInput value={otp} onChange={setOtp} length={6} surface="transporter" />}

      <Text
        style={{
          fontFamily: "Poppins",
          fontSize: 12,
          color: tokens.color.text.secondary,
          textAlign: "center",
          marginTop: 16,
        }}
      >
        By continuing, you agree to our{"\n"}
        <Text style={{ color: tokens.color.brand.green, fontWeight: "600" }}>Terms & Conditions</Text> and{" "}
        <Text style={{ color: tokens.color.brand.green, fontWeight: "600" }}>Privacy Policy</Text>
      </Text>
    </TransporterShell>
  );
}
