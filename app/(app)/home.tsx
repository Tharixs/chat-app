import { useAuth } from "@/context/authContext";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Home() {
  const { loginOut, user } = useAuth();

  return (
    <View>
      <Text>Home {user?.email}</Text>
      <Button title="LogOut" onPress={loginOut} />
    </View>
  );
}
