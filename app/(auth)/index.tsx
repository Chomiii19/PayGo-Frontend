import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import * as yup from "yup";
import { icons } from "../../constants/image";
import * as LocalAuthentication from "expo-local-authentication";
import getTokenFromStorage from "../../utils/getTokenFromStorage";
import { useSettings } from "../../context/settingsContext";

const schema = yup.object().shape({
  accountNumber: yup.string().min(10).required("Account number is required"),
  password: yup.string().min(4).required("Password is required"),
});

export default function Index() {
  const [token, setToken] = useState<string | null>(null);
  const [biometricsApproved, setBiometricsApproved] = useState<boolean>(false);
  const [hasBiometric, setHasBiometric] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { enableBiometrics } = useSettings();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const authToken = await getTokenFromStorage();
      setToken(authToken || null);

      try {
        const response = await axios.get(
          "https://paygo-backend-1y0p.onrender.com/api/v1/validate-token",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        setBiometricsApproved(true);
      } catch (err) {
        setBiometricsApproved(false);
      }

      const hardwareAvailable = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(hardwareAvailable);

      if (hardwareAvailable) {
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        setHasBiometric(isEnrolled);
      }
    };

    initializeAuth();
  }, []);

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      try {
        const response = await axios.get(
          "https://paygo-backend-1y0p.onrender.com/api/v1/user/generate-code",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        router.replace("/verifyLogin");
      } catch (err) {
        console.error("Error in regenerating code: ", err);
      }
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

  const onSubmit = async (data: {
    accountNumber: string;
    password: string;
  }) => {
    try {
      console.log("Form Data:", data);

      const response = await axios.post(
        "https://paygo-backend-1y0p.onrender.com/api/v1/login",
        data
      );

      if (!response.data.token) console.error("No token received");
      setToken(response.data.token);
      await SecureStore.setItemAsync("authToken", response.data.token);

      router.replace("/verifyLogin");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.response);
        setError(err.response?.data.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-backgroundColor">
      <Image className="w-16 h-16 mb-5" source={icons.icon} />
      <Text className="font-mBold text-zinc-200 text-3xl w-60 text-center mb-4">
        Log in to your Account
      </Text>

      {token &&
        biometricsApproved &&
        isBiometricSupported &&
        hasBiometric &&
        enableBiometrics && (
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
              keyboardType="number-pad"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View className="flex flex-col justify-start gap-1">
        <View className="flex w-80 flex-row justify-between">
          <Text className="font-mSemibold text-zinc-200">Password</Text>
          <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
            <Text className="text-primary font-mRegular text-sm">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View className="rounded-lg p-2 bg-light-black relative flex justify-center">
              <TextInput
                className="w-[265px] bg-light-black rounded-lg text-zinc-200 font-mRegular "
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity
                className="absolute right-2"
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Image
                  source={showPassword ? icons.eyeOff : icons.eye}
                  className="h-6 w-6 opacity-80"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {(errors.accountNumber || errors.password || error) && (
        <Text className="mt-2 text-red-500 font-mBold text-xs">
          Invalid Credentials.
        </Text>
      )}

      <TouchableOpacity
        className="w-80 bg-primary flex justify-center items-center rounded-lg mt-4 py-2"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-zinc-200 font-mBold font-bold">LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
}
