import { View, Text, Image, TextInput, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { icons } from "../../constants/image";
import { useRouter } from "expo-router";

const VerifyLogin = () => {
  const router = useRouter();
  const length = 6;
  const [code, setCode] = useState(Array(length).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const onSubmit = () => {
    const verifyCode = [...code];
    if (verifyCode.join("") === "123456") router.replace("/newPassword");
  };

  const handleChangeText = (text: string, i: number) => {
    if (/^\d?$/.test(text)) {
      if (text && i < length - 1) inputs.current[i + 1]?.focus();
      const newCode = [...code];
      newCode[i] = text;
      setCode(newCode);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="bg-backgroundColor flex-1 justify-center items-center">
      <Image className="w-16 h-16 mb-5" source={icons.icon} />
      <Text className="font-mBold text-zinc-200 text-2xl w-60 text-center mb-8">
        Verify that it's you
      </Text>

      <View className="flex flex-col gap-1 mb-3 items-center">
        <Text className="font-mSemibold text-zinc-200">
          Enter the 6-digit code sent to your email.
        </Text>
        <View className="flex flex-row gap-3">
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => (inputs.current[i] = ref)}
              className="w-[50px] h-[70px] bg-light-black border-transparent rounded-lg text-zinc-200 font-mRegular pl-4 focus:border-primary text-4xl"
              keyboardType="numeric"
              onChangeText={(text) => handleChangeText(text, i)}
              value={digit}
              style={{ borderWidth: 1, marginVertical: 5 }}
              onKeyPress={(e) => handleKeyPress(e, i)}
            />
          ))}
        </View>
      </View>

      <View className="relative">
        {code.join("").length !== 6 && (
          <View
            pointerEvents="auto"
            className="w-full h-full bg-backgroundColor/80 z-10 rounded-lg absolute top-1"
          ></View>
        )}
        <Pressable
          className="w-80 bg-primary flex justify-center items-center rounded-lg mt-4 py-2"
          onPress={onSubmit}
          disabled={code.join("").length !== 6}
        >
          <Text className="text-zinc-200 font-mBold font-bold">Confirm</Text>
        </Pressable>
      </View>

      <View className="flex flex-row gap-1 mt-4">
        <Text className="text-zinc-500 font-mRegular text-sm">
          Resend in 60s?
        </Text>
        <Pressable onPress={() => router.push("/verifyLogin")}>
          <Text className="text-primary font-mRegular text-sm">Resend</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default VerifyLogin;
