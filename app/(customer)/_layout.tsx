import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { tokens } from "@/theme/tokens";
import { Home, Package, ShoppingCart, User } from "@/components/ui/Icon";
import { useCartStore } from "@/stores/cart-store";

const TabIcon: React.FC<{
  Component: React.ComponentType<any>;
  color: string;
  badge?: number;
}> = ({ Component, color, badge }) => (
  <View>
    <Component size={24} color={color} />
    {badge ? (
      <View
        style={{
          position: "absolute",
          top: -6,
          right: -10,
          minWidth: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: tokens.color.state.danger,
          paddingHorizontal: 4,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "#fff",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700", fontFamily: "Poppins" }}>
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
        tabBarInactiveTintColor: tokens.color.text.muted,
        tabBarStyle: {
          height: 72,
          paddingBottom: 12,
          paddingTop: 8,
          borderTopColor: tokens.color.border.divider,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Poppins",
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabIcon Component={Home} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => <TabIcon Component={Package} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <TabIcon Component={ShoppingCart} color={color} badge={cartCount} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <TabIcon Component={User} color={color} />,
        }}
      />
      <Tabs.Screen name="book" options={{ href: null }} />
    </Tabs>
  );
}
