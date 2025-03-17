import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, Image } from "react-native";
import { icons } from "../../constants/image";

export default function AuthLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "#16171B" },
        animationDuration: 100,
        headerStyle: { backgroundColor: "#16171B" },
        headerShadowVisible: false,
        title: "",
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ padding: 5 }}>
            <Image source={icons.back} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Signup", headerShown: false }}
      />
      <Stack.Screen
        name="verifyLogin"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen name="forgotPassword" />
      <Stack.Screen name="verifyPassword" />
      <Stack.Screen
        name="newPassword"
        options={{ title: "Login", headerShown: false }}
      />
    </Stack>
  );
}
