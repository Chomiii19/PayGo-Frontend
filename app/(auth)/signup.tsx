import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import * as yup from "yup";
import { icons } from "../../constants/image";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email address is required"),
  password: yup.string().min(4).required("Password is required"),
});

export default function Index() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      console.log("Form Data:", data);

      const response = await axios.post(
        "https://paygo-backend-1y0p.onrender.com/api/v1/signup",
        data
      );

      if (!response.data.token) console.error("No token received");
      await SecureStore.setItemAsync("authToken", response.data.token);

      router.replace("/verifyLogin");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-backgroundColor">
      <Image className="w-16 h-16 mb-5" source={icons.icon} />
      <Text className="font-mBold text-zinc-200 text-3xl text-center mb-7">
        Create an Account
      </Text>

      <View className="flex flex-col justify-start gap-1 mb-3">
        <Text className="font-mSemibold text-zinc-200">Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-80 bg-light-black border-transparent rounded-lg text-zinc-200 font-mRegular p-[10px]"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex flex-col justify-start gap-1 mb-3">
        <Text className="font-mSemibold text-zinc-200">Email Address</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-80 bg-light-black border-transparent rounded-lg text-zinc-200 font-mRegular p-[10px]"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex flex-col justify-start gap-1">
        <Text className="font-mSemibold text-zinc-200">Password</Text>

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

      {(errors.name || errors.email || errors.password) && (
        <Text className="mt-2 text-red-500 font-mBold text-xs">
          Invalid Credentials.
        </Text>
      )}

      <TouchableOpacity
        className="w-80 bg-primary flex justify-center items-center rounded-lg mt-4 py-2"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-zinc-200 font-mBold font-bold">
          CREATE ACCOUNT
        </Text>
      </TouchableOpacity>

      <View className="flex flex-row gap-1 mt-4">
        <Text className="text-zinc-500 font-mRegular text-sm">
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)")}>
          <Text className="text-primary font-mRegular text-sm">Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
