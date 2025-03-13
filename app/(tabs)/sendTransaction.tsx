import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import Header from "../../components/header";
import { bank, icon } from "../../constants/image";

const SendTransaction = () => {
  return (
    <View className="flex-1 bg-backgroundColor items-center">
      <Header name="Send Money" />

      <View className="p-4 w-full flex items-center">
        {" "}
        <Button />
        <Pressable className="bg-light-black rounded-lg border border-zinc-800 w-full h-[170px] mt-7 p-2 flex flex-col justify-between">
          <View className="bg-[#333333] w-24 rounded-lg flex justify-center items-center py-3 px-3">
            <Image className="h-14 w-14" source={icon} />
          </View>
          <Text className="text-zinc-200 font-mBold text-lg">
            Another PayGo Acount
          </Text>
        </Pressable>
        <Pressable className="bg-light-black rounded-lg border border-zinc-800 w-full h-[170px] mt-7 p-2 flex flex-col justify-between">
          <View className="bg-[#333333] w-24 rounded-lg flex justify-center items-center py-3 px-3">
            <Image className="h-14 w-14" source={bank} />
          </View>
          <Text className="text-zinc-200 font-mBold text-lg">
            Other Banks or E-wallets
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

function Button() {
  return (
    <View className="flex flex-row gap-1 mt-4">
      <Pressable className="rounded-lg px-7 py-1 bg-primary">
        <Text className="text-zinc-200 font-mBold text-xl">Send</Text>
      </Pressable>
      <Pressable className="rounded-lg px-7 py-1 bg-light-black">
        <Text className="text-zinc-400 font-mBold text-xl">Receive</Text>
      </Pressable>
    </View>
  );
}

export default SendTransaction;
