import { View, Text, Image, Pressable, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { icon } from "../../constants/image";
import React from "react";
import { useRouter } from "expo-router";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(4, "Minimum of 4 characters required.")
    .required("Input is required"),
  confirmPassword: yup
    .string()
    .min(4, "Minimum of 4 characters required.")
    .oneOf([yup.ref("newPassword")], "Password do not match.")
    .required("Input is required"),
});

const NewPassword = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data: { newPassword: string; confirmPassword: string }) => {
    console.log("Form Data:", data);

    router.replace("/");
  };

  return (
    <View className="flex-1 justify-center items-center bg-backgroundColor">
      <Image className="w-16 h-16 mb-5" source={icon} />
      <Text className="font-mBold text-zinc-200 text-2xl text-center mb-8">
        Enter new password
      </Text>

      <View className="flex flex-col justify-start gap-1 mb-3">
        <Text className="font-mSemibold text-zinc-200">New Password</Text>
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-80 bg-light-black border-transparent rounded-lg text-zinc-200 font-mRegular px-2"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
            />
          )}
        />
      </View>

      <View className="flex flex-col justify-start gap-1">
        <Text className="font-mSemibold text-zinc-200">Confirm Password</Text>

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="w-80 bg-light-black rounded-lg text-zinc-200 font-mRegular px-2 "
              secureTextEntry
              value={value}
              onChangeText={onChange}
            ></TextInput>
          )}
        />
      </View>

      {(errors.newPassword || errors.confirmPassword) && (
        <Text className="mt-2 text-red-500 font-mBold text-xs">
          Invalid Credentials.
        </Text>
      )}

      <View className="relative">
        {newPassword !== confirmPassword && (
          <View
            pointerEvents="auto"
            className="w-full h-full bg-backgroundColor/80 z-10 rounded-lg absolute top-1"
          ></View>
        )}
        <Pressable
          className="w-80 bg-primary flex justify-center items-center rounded-lg mt-4 py-2"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-zinc-200 font-mBold font-bold">
            Change Password
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NewPassword;
