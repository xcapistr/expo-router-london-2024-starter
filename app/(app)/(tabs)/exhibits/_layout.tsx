import React from "react";
import { Stack } from "expo-router";
import colors from "@/constants/colors";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: colors.white } }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Exhibits",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
