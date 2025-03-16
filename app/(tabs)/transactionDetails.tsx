import { View, Text, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import Header from "../../components/header";
import formatNumber from "../../utils/formatNumber";
import { icons } from "../../constants/image";

const TransactionDetails = () => {
  const { refId, accNum, type } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-backgroundColor items-center">
      <Header name="Transaction Details" />

      <View className="w-full h-full px-5 items-center flex flex-col mt-14 relative">
        <View className="rounded-2xl bg-light-black w-full px-4 pt-16 py-7 flex flex-col items-center relative">
          <Image
            source={icons.success}
            className="h-20 w-20 absolute -top-10"
          />
          <Text className="font-rBold text-3xl text-zinc-200">{accNum}</Text>
          <Text className="text-zinc-500 font-rSemibold">Sent via PayGo</Text>

          <View className="border-y border-y-lighter-black w-full flex flex-col gap-1 my-2 py-5">
            <View className="flex flex-row w-full">
              <Text className="font-rSemibold text-zinc-400 w-1/2">
                {type === "load" && "Telco"}
                {type === "bills" && "Service"}
                {type === "bank" && "Bank"}
              </Text>
              <Text className="font-rSemibold text-zinc-200 w-1/2">TM</Text>
            </View>
            <View className="flex flex-row w-full">
              <Text className="font-rSemibold text-zinc-400 w-1/2">Amount</Text>
              <Text className="font-rSemibold text-zinc-200 w-1/2">
                ₱{formatNumber(2380)}
              </Text>
            </View>
          </View>

          <View className="flex flex-row justify-between items-center w-full my-6">
            <View className="flex flex-row gap-1 items-end">
              <Text className="font-rSemibold text-zinc-400 text-xs">
                Ref No.
              </Text>
              <Text className="font-rSemibold text-zinc-200">{refId}</Text>
            </View>
            <View className="flex flex-row gap-1 items-end">
              <Text className="font-rSemibold text-zinc-400 text-xs">Date</Text>
              <Text className="font-rSemibold text-zinc-200">
                March 3, 2025
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="w-full flex flex-row justify-center py-3 rounded-2xl bg-primary absolute bottom-52">
          <Text className="font-rSemibold text-lg text-zinc-200">
            Save Receipt
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionDetails;
