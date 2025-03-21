import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { icons } from "../../constants/image";
import { useRouter } from "expo-router";
import axios from "axios";
import getTokenFromStorage from "../../utils/getTokenFromStorage";

const VerifyLogin = () => {
  const router = useRouter();
  const length = 6;
  const [code, setCode] = useState(Array(length).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    try {
      if (code.join("").length < 6) return;
      const authToken = await getTokenFromStorage();
      const response = await axios.post(
        "https://paygo-backend-1y0p.onrender.com/api/v1/verify-login",
        { verificationCode: code.join("") },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setError(null);
      router.replace("/(tabs)/home");
    } catch (err) {
      setError("Incorrect code. Please try again.");
    }
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
      inputs.current[index - 1]?.focus(); // ✅ Backspace moves focus left
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
              className="w-[50px] h-[70px] bg-light-black rounded-lg border-transparent text-zinc-200 font-mRegular pl-4 focus:border-primary text-4xl"
              keyboardType="numeric"
              onChangeText={(text) => handleChangeText(text, i)}
              value={digit}
              style={{ borderWidth: 1, marginVertical: 5 }}
              onKeyPress={(e) => handleKeyPress(e, i)}
            />
          ))}
        </View>
      </View>

      {error && (
        <Text className="mt-2 text-red-500 font-mBold text-xs">{error}</Text>
      )}

      <View className="relative">
        {code.join("").length !== 6 && (
          <View
            pointerEvents="auto"
            className="w-full h-full bg-backgroundColor/80 z-10 rounded-lg absolute top-1"
          ></View>
        )}
        <TouchableOpacity
          className="w-80 bg-primary flex justify-center items-center rounded-lg mt-4 py-2"
          onPress={onSubmit}
        >
          <Text className="text-zinc-200 font-mBold font-bold">Confirm</Text>
        </TouchableOpacity>
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
