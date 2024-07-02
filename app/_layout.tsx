import { Slot, Stack, router, useSegments } from "expo-router";

import { AuthContextProvider, useAuth } from "@/context/authContext";
import { useEffect } from "react";

import "../global.css";
const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("home");
    } else if (!isAuthenticated) {
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
