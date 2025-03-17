import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/header";
import { Image } from "react-native";
import { icons } from "../../constants/image";
import InviteFriends from "../../components/inviteFriendsAds";
import { useRouter } from "expo-router";
import Dropdown from "../../components/dropDown";
import axios from "axios";
import { useUser } from "../../context/userContext";
import getTokenFromStorage from "../../utils/getTokenFromStorage";

const BuyLoad = () => {
  const { user } = useUser();
  const telcos = ["TM", "TNT", "Globe", "Smart"];
  const payment = ["Checkings", "Savings"];
  const [dropDown, setDropDown] = useState(false);
  const [paymentSource, setPaymentSource] = useState(false);
  const [selected, setSelected] = useState("TM");
  const [selectedPaymentSource, setSelectedPaymentSource] =
    useState("Checkings");
  const [checked, setChecked] = useState(false);
  const [accountNumber, setAccountNumber] = useState<string | undefined>(
    undefined
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
          service: selected,
          recepientNumber: accountNumber,
          amount,
          type: "buy_load",
          payment: selectedPaymentSource,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const transactionDetails = response.data.data;

      setSelectedPaymentSource("Checkings");
      setSelected("TM");
      setAccountNumber(undefined);
      setAmount(undefined);
      setChecked(false);

      router.replace({
        pathname: "/(tabs)/transactionDetails",
        params: {
          refId: transactionDetails._id,
          accNum: transactionDetails.recepientNumber,
          amount: transactionDetails.amount,
          type: "load",
          service: transactionDetails.service,
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error("Unknown error:", err);
      }
      setError("Error");
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
        <Header name="Buy Load" />

        <InviteFriends />

        <View className="flex flex-col gap-2 px-5 w-full">
          <Text className="text-zinc-300 font-rSemibold mt-2">
            Which Telco are you purchasing from?
          </Text>

          <View className="w-full relative">
            <Pressable
              onPress={() => setDropDown(!dropDown)}
              className={`flex flex-row justify-between items-center w-full bg-light-black px-4 py-3 ${
                dropDown ? "rounded-t-2xl" : "rounded-2xl"
              }`}
            >
              <View className="flex flex-row items-center gap-2">
                <Image
                  source={
                    (icons as Record<string, any>)[selected.toLowerCase()]
                  }
                  className="h-8 w-8"
                />
                <Text className="text-zinc-200 font-rBold text-lg">
                  {selected}
                </Text>
              </View>
              <Image
                source={icons.back}
                className={`${
                  dropDown ? "rotate-[90deg]" : "rotate-[270deg]"
                } h-6 w-6"`}
              />
            </Pressable>

            {dropDown && (
              <Dropdown
                lists={telcos}
                dropDown={dropDown}
                setDropDown={setDropDown}
                setSelected={setSelected}
              />
            )}
          </View>

          <Text className="text-zinc-300 font-rSemibold mt-4">
            Recipient Number
          </Text>

          <View className="flex flex-row w-full justify-center items-center relative">
            <View className="h-full w-[20%] justify-center rounded-l-2xl bg-light-black flex flex-row items-center gap-2 pl-2">
              <Image source={icons.philippines} className="h-6 w-6" />
              <Text className="font-rSemibold text-zinc-200">+63</Text>
            </View>
            <TextInput
              keyboardType="number-pad"
              placeholder="1234567890"
              value={accountNumber}
              onChangeText={setAccountNumber}
              placeholderTextColor="#71717a"
              className="w-[80%] px-2 py-4 text-zinc-200 font-rRegular rounded-r-2xl bg-light-black"
            />
            <TouchableOpacity className="absolute right-3">
              <Image
                source={icons.bookUser}
                className="h-6 w-6"
                tintColor={"#71717a"}
              />
            </TouchableOpacity>
          </View>

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

          <Text className="text-zinc-300 font-rSemibold mt-3">Load Amount</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="0.00"
            value={amount ? String(amount) : undefined}
            onChangeText={(text) => setAmount(text ? Number(text) : 0)}
            placeholderTextColor="#71717a"
            className="w-full p-4 text-zinc-200 font-rRegular rounded-2xl bg-light-black"
          />
          <View className="mt-1 flex flex-row w-full justify-center">
            <Text className="text-zinc-500 font-rRegular text-xs">
              Be informed that PayGo charges P2.00 as service fee.
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

export default BuyLoad;
