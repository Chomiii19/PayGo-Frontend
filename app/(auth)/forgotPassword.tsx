import { View, Text, Image, TextInput, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { icons } from "../../constants/image";

const ForgotPassword = () => {
  const router = useRouter();

  const onSubmit = () => {
    router.push("/verifyPassword");
  };

  return (
    <View className="bg-backgroundColor flex-1 justify-center items-center">
      <Image className="w-16 h-16 mb-5" source={icons.icon} />
      <Text className="font-mBold text-zinc-200 text-2xl w-60 text-center mb-8">
        Forgot Password?
      </Text>

      <View className="flex flex-col justify-start gap-1 mb-3">
        <Text className="font-mSemibold text-zinc-200">Email Address</Text>
        <TextInput
          className="w-80 bg-light-black border-zinc-800 rounded-lg text-zinc-200 font-mRegular px-2 focus:border-primary"
          style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
        />
      </View>

      <Pressable
        className="w-80 bg-primary flex justify-center items-center rounded-lg mt-4 py-2"
        onPress={() => onSubmit()}
      >
        <Text className="text-zinc-200 font-mBold font-bold">Send Code</Text>
      </Pressable>
    </View>
  );
};

export default ForgotPassword;
