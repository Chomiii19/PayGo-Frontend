import { Image, Pressable, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import * as yup from "yup";
import { icons } from "../../constants/image";
import * as LocalAuthentication from "expo-local-authentication";

const schema = yup.object().shape({
  accountNumber: yup
    .string()
    .length(10, "Account number must be 10 digits")
    .required("Account number is required"),
  password: yup.string().min(4).required("Password is required"),
});

export default function Index() {
  const [hasBiometric, setHasBiometric] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then((result) => {
      setIsBiometricSupported(result);
      if (result) {
        LocalAuthentication.isEnrolledAsync().then((isEnrolled) => {
          setHasBiometric(isEnrolled);
        });
      }
    });
  }, []);

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      console.log("Fingerprint authentication successful");
      router.replace("/verifyLogin");
    } else {
      console.log("Fingerprint authentication failed");
    }
  };

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { accountNumber: string; password: string }) => {
    console.log("Form Data:", data);
    router.replace("/verifyLogin");
  };

  return (
    <View className="flex-1 justify-center items-center bg-backgroundColor">
      <Image className="w-16 h-16 mb-5" source={icons.icon} />
      <Text className="font-mBold text-zinc-200 text-3xl w-60 text-center mb-4">
        Log in to your Account
      </Text>

      {isBiometricSupported && hasBiometric && (
        <Pressable
          className="bg-light-black flex justify-center items-center rounded-lg p-2 mb-4"
          onPress={handleBiometricAuth}
        >
          <Image source={icons.fingerprint} />
        </Pressable>
      )}

      <View className="flex flex-col justify-start gap-1 mb-3">
        <Text className="font-mSemibold text-zinc-200">Account Number</Text>
        <Controller
          control={control}
          name="accountNumber"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-80 bg-light-black border-transparent rounded-lg text-zinc-200 font-mRegular p-[10px]"
              keyboardType="numeric"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex flex-col justify-start gap-1">
        <View className="flex w-80 flex-row justify-between">
          <Text className="font-mSemibold text-zinc-200">Password</Text>
          <Pressable onPress={() => router.push("/forgotPassword")}>
            <Text className="text-primary font-mRegular text-sm">
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View className="rounded-lg p-2 bg-light-black">
              <TextInput
                className="w-[265px] bg-light-black rounded-lg text-zinc-200 font-mRegular "
                secureTextEntry
                value={value}
                onChangeText={onChange}
              ></TextInput>
            </View>
          )}
        />
      </View>

      {(errors.accountNumber || errors.password) && (
        <Text className="mt-2 text-red-500 font-mBold text-xs">
          Invalid Credentials.
        </Text>
      )}

      <Pressable
        className="w-80 bg-primary flex justify-center items-center rounded-lg mt-4 py-2"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-zinc-200 font-mBold font-bold">LOG IN</Text>
      </Pressable>

      <View className="flex flex-row gap-1 mt-4">
        <Text className="text-zinc-500 font-mRegular text-sm">
          Having trouble logging in?
        </Text>
        <Pressable onPress={() => router.push("/")}>
          <Text className="text-primary font-mRegular text-sm">Contact Us</Text>
        </Pressable>
      </View>
    </View>
  );
}
