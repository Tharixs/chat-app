import Loading from "@/components/Loading";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require("../assets/images/login.png")}
          />
        </View>
        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign In
          </Text>
        </View>
        {/* Text Input */}
        <View className="gap-4">
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
          >
            <Octicons name="mail" size={24} color="gray" />
            <TextInput
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Email Address"
              placeholderTextColor={"gray"}
            />
          </View>
          <View className="gap-3">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="lock" size={24} color="gray" />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Password"
                placeholderTextColor={"gray"}
                secureTextEntry
              />
            </View>
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-right text-neutral-500"
            >
              Forgot Password?
            </Text>
          </View>
          <View>
            {loading ? (
              <View className="justify-center items-center">
                <Loading size={hp(15.5)} />
              </View>
            ) : (
              <TouchableOpacity
                style={{ height: hp(6.5) }}
                className="bg-rose-700 rounded-xl justify-center items-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-white font-bold tracking-wider text-center"
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View className=" flex-row justify-center">
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-neutral-500"
            >
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("signUp")}>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-rose-500"
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
