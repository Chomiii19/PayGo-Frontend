import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants/image";
import InviteFriends from "../../components/inviteFriendsAds";
import Header from "../../components/header";
import { useLocalSearchParams, useRouter } from "expo-router";
import Dropdown from "../../components/dropDown";
import axios from "axios";
import { useUser } from "../../context/userContext";
import getTokenFromStorage from "../../utils/getTokenFromStorage";

const SendPayGo = () => {
  const { user } = useUser();
  const { accNum } = useLocalSearchParams() as { accNum: string };
  const payment = ["Checkings", "Savings"];
  const [paymentSource, setPaymentSource] = useState(false);
  const [selectedPaymentSource, setSelectedPaymentSource] =
    useState("Checkings");
  const [checked, setChecked] = useState(false);
  const [accountNumber, setAccountNumber] = useState<string | undefined>(
    accNum
  );
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const onsSubmit = async () => {
    const token = await getTokenFromStorage();
    try {
      const response = await axios.post(
        "https://paygo-backend-1y0p.onrender.com/api/v1/app/transaction",
        {
          service: "PayGo",
          recepientNumber: accountNumber,
          amount,
          type: "bank_transfer",
          payment: selectedPaymentSource,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const transactionDetails = response.data.data;

      setSelectedPaymentSource("Checkings");
      setAccountNumber(undefined);
      setAmount(undefined);
      setChecked(false);
      setError(undefined);

      router.replace({
        pathname: "/(tabs)/transactionDetails",
        params: {
          refId: transactionDetails._id,
          accNum: transactionDetails.recepientNumber,
          amount: transactionDetails.amount,
          type: "bank",
          service: transactionDetails.service,
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "An error occurred");
      } else {
        console.error("Unknown error:", err);
        setError("Error");
      }
    }
  };

  const checkSufficientBalance = () => {
    if (amount === 0 || amount === undefined) return false;
    if (selectedPaymentSource === "checkings")
      return (user?.checkingsBal || 0) > (amount || 0);

    return (user?.savingsBal || 0) > (amount || 0);
  };

  return (
    <View className="flex-1 flex-col bg-backgroundColor justify-between">
      <View className="flex flex-col w-full">
        <Header name="Transfer Money" />

        <InviteFriends />

        <View className="flex flex-col gap-2 px-5 w-full">
          <Text className="text-zinc-300 font-rSemibold mt-2">
            Which Bank are you transferring to?
          </Text>

          <TouchableOpacity
            disabled
            className="flex flex-row justify-between items-center w-full bg-light-black px-4 py-3 rounded-2xl opacity-55"
          >
            <View className="flex flex-row items-center gap-2">
              <Image source={icons.icon} className="h-8 w-8" />
              <Text className="text-zinc-200 font-rBold text-lg">PayGo</Text>
            </View>
            <Image source={icons.back} className="rotate-[270deg] h-6 w-6" />
          </TouchableOpacity>

          <Text className="text-zinc-300 font-rSemibold mt-4">
            Recipient Number
          </Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="1234567890"
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholderTextColor="#71717a"
            className="w-full p-4 text-zinc-200 font-rRegular rounded-2xl bg-light-black"
          />

          {error && (
            <View className="w-full flex flex-row justify-center">
              <Text className="mt-2 text-red-500 font-mBold text-xs">
                {error}
              </Text>
            </View>
          )}

          <Text className="text-zinc-300 font-rSemibold mt-3">
            Payment Source
          </Text>
          <View className="w-full relative">
            <Pressable
              onPress={() => setPaymentSource(!paymentSource)}
              className={`flex flex-row justify-between items-center w-full bg-light-black px-4 py-3 ${
                paymentSource ? "rounded-t-2xl" : "rounded-2xl"
              }`}
            >
              <Text className="text-zinc-200 font-rBold text-lg">
                {selectedPaymentSource}
              </Text>

              <Image
                source={icons.back}
                className={`${
                  paymentSource ? "rotate-[90deg]" : "rotate-[270deg]"
                } h-6 w-6"`}
              />
            </Pressable>

            {paymentSource && (
              <Dropdown
                lists={payment}
                dropDown={paymentSource}
                setDropDown={setPaymentSource}
                setSelected={setSelectedPaymentSource}
              />
            )}
          </View>

          <Text className="text-zinc-300 font-rSemibold mt-3">Amount</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="0.00"
            value={amount ? String(amount) : undefined}
            onChangeText={(text) => setAmount(text ? Number(text) : 0)}
            placeholderTextColor="#71717a"
            className="w-full p-4 text-zinc-200 font-rRegular rounded-2xl bg-light-black"
          />
          <View className="mt-1 flex flex-row w-full justify-center">
            <Text className="text-zinc-500 font-rRegular text-xs text-center">
              Be informed that PayGo does not charge service fee on PayGo
              transfers.
            </Text>
          </View>
        </View>
      </View>

      <View className="w-full px-5 flex flex-col">
        <View className="flex flex-row gap-2 items-center mb-3">
          <TouchableOpacity
            onPress={() => setChecked(!checked)}
            className={`w-6 h-6 border rounded-lg ${
              checked ? "bg-primary border-primary" : "border-zinc-500"
            }`}
          >
            {checked && <Image source={icons.check} className="h-5 w-5" />}
          </TouchableOpacity>
          <Text className="text-zinc-500 font-rRegular text-sm">
            I confirm that the details provided are accurate.
          </Text>
        </View>

        <View className="relative">
          {(!checked || !accountNumber || !checkSufficientBalance()) && (
            <View className="absolute w-full h-full z-10 bg-backgroundColor/50 rounded-2xl"></View>
          )}
          <TouchableOpacity
            onPress={() => onsSubmit()}
            className="mb-24 w-full rounded-2xl flex flex-row justify-center py-2 bg-primary"
          >
            <Text className="text-zinc-200 font-rBold">CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendPayGo;
