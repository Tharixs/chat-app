import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack
      screenOptions={{ statusBarStyle: "dark", statusBarColor: "white" }}
    />
  );
}
