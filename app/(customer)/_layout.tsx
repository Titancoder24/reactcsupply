import React from "react";
import { Tabs } from "expo-router";
import { View, Text, Platform } from "react-native";
import { tokens } from "@/theme/tokens";
import { Home, Package, ShoppingCart, User } from "@/components/ui/Icon";
import { useCartStore } from "@/stores/cart-store";

const TabIcon: React.FC<{
  Component: React.ComponentType<any>;
  color: string;
  focused?: boolean;
  badge?: number;
}> = ({ Component, color, focused, badge }) => (
  <View
    style={{
      width: 44,
      height: 32,
      borderRadius: 999,
      backgroundColor: focused ? tokens.color.customer.tint : "transparent",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Component size={20} color={color} strokeWidth={focused ? 2.4 : 2} />
    {badge ? (
      <View
        style={{
          position: "absolute",
          top: -2,
          right: 0,
          minWidth: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: tokens.color.state.danger,
          paddingHorizontal: 4,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1.5,
          borderColor: "#fff",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 9,
            fontWeight: "700",
            fontFamily: tokens.font.family.body,
          }}
        >
          {badge > 99 ? "99+" : badge}
        </Text>
      </View>
    ) : null}
  </View>
);

export default function CustomerLayout() {
  const cartCount = useCartStore((s) => s.totalQty());

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.color.customer.primary,
        tabBarInactiveTintColor: tokens.color.ink[400],
        tabBarStyle: {
          height: Platform.OS === "ios" ? 84 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
          paddingHorizontal: 12,
          backgroundColor: tokens.color.surface.white,
          borderTopWidth: 1,
          borderTopColor: tokens.color.border.hairline,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: tokens.font.family.body,
          fontWeight: "500",
          marginTop: 2,
          letterSpacing: -0.1,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Component={Home} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Component={Package} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Component={ShoppingCart} color={color} focused={focused} badge={cartCount} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Component={User} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen name="book" options={{ href: null }} />
    </Tabs>
  );
}
