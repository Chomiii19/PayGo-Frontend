import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import Header from "../../components/header";
import { icons, images } from "../../constants/image";
import formatNumber from "../../utils/formatNumber";

const SendTransaction = () => {
  return (
    <View className="flex-1 bg-backgroundColor items-center">
      <Header name="Send Money" />

      <View className="p-5 w-full flex items-center">
        <Features />
        <PayGoBankComponent />
        <OtherBanksComponent />
      </View>
    </View>
  );
};

function Features() {
  return (
    <View className="w-full h-[180px] mt-2 flex flex-row justify-between">
      <Pressable className="w-[180px] h-full bg-light-black rounded-2xl p-3 flex flex-col justify-between">
        <View className="p-3 bg-lighter-black rounded-xl flex w-12 items-center justify-center">
          <Image source={icons.signal} className="h-7 w-7" />
        </View>
        <Text className="text-zinc-300 font-rSemibold text-sm">BUY LOAD</Text>

        <View className="w-full flex flex-col gap-1">
          <Text className="text-zinc-500 font-mRegular text-xs">
            Buy load from TM, Globe, Smart, or TNT.
          </Text>
          <View className="w-full flex flex-row rounded-2xl bg-primary py-2 items-center justify-center mt-1">
            <Text className="font-rBold text-zinc-100">Buy Now</Text>
            <Image
              source={icons.back}
              className="rotate-180 h-6 w-6"
              tintColor={"#e3e3e3"}
            />
          </View>
        </View>
      </Pressable>

      <Pressable className="w-[180px] h-full bg-light-black rounded-2xl p-3 flex flex-col justify-between">
        <View className="p-3 bg-lighter-black rounded-xl flex w-12 items-center justify-center">
          <Image source={icons.receipt} className="h-7 w-7" />
        </View>
        <Text className="text-zinc-300 font-rSemibold text-sm">PAY BILLS</Text>

        <View className="w-full flex flex-col gap-1">
          <Text className="text-zinc-500 font-mRegular text-xs">
            Pay your bills on Meralco, Maynilad, Converge, or PLDT.
          </Text>
          <View className="w-full flex flex-row rounded-2xl bg-primary py-2 items-center justify-center mt-1">
            <Text className="font-rBold text-zinc-100">Pay Now</Text>
            <Image
              source={icons.back}
              className="rotate-180 h-6 w-6"
              tintColor={"#e3e3e3"}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

function PayGoBankComponent() {
  return (
    <Pressable
      className="bg-light-black rounded-2xl w-full h-[170px] mt-7 relative overflow-hidden"
      style={{
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      }}
    >
      <View className="absolute w-full h-full flex flex-col justify-between p-4 z-10">
        <View className="bg-zinc-800/30 w-24 rounded-lg flex  justify-center items-center py-3 px-3">
          <Image className="h-14 w-14" source={icons.icon} />
        </View>
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-zinc-200 font-mBold text-lg">
            Another PayGo Account
          </Text>
          <View className="flex flex-row">
            <Image source={icons.masterCard} className="h-10 w-10 mr-2" />
            <Image source={icons.visa} className="h-10 w-10" />
          </View>
        </View>
      </View>
      <Image
        source={images.bgBlue}
        className="w-full h-full absolute scale-150"
        style={{ resizeMode: "contain" }}
      />
    </Pressable>
  );
}

function OtherBanksComponent() {
  return (
    <Pressable
      className="rounded-2xl w-full h-[170px] mt-7 relative overflow-hidden"
      style={{
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      }}
    >
      <View className="absolute w-full h-full flex flex-col justify-between p-4 z-10">
        <View className="bg-zinc-300/30 w-24 rounded-lg flex  justify-center items-center py-3 px-3">
          <Image className="h-14 w-14" source={icons.bank} />
        </View>
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-zinc-200 font-mBold text-lg">
            Other Banks or E-wallets
          </Text>
          <View className="flex flex-row">
            <Image source={icons.masterCard} className="h-10 w-10 mr-2" />
            <Image source={icons.visa} className="h-10 w-10" />
          </View>
        </View>
      </View>
      <Image
        source={images.violet}
        className="w-full h-full absolute scale-150"
        style={{ resizeMode: "contain" }}
      />
    </Pressable>
  );
}

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
