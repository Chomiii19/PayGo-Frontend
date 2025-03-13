import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import {
  buyLoad,
  contactUser,
  eyeOff,
  logOut,
  masterCard,
  payBills,
  plus,
  qrCode,
  sendMoney,
  user,
  visa,
} from "../../constants/image";
import recentTransactions from "../../data/reentTransactions";
import formatNumber from "../../utils/formatNumber";
import formatDate from "../../utils/formatDate";
import { useRouter } from "expo-router";

const home = () => {
  return (
    <ScrollView className="flex-1 bg-backgroundColor">
      <StatusBar barStyle="light-content" backgroundColor="#161616" />
      <Header />
      <View className="flex flex-col px-4 mt-4 gap-3">
        <BalanceContainer />
        <ContactsContainer />
        <FeaturesContainer />
        <RecentTransactionsContainer />
      </View>
    </ScrollView>
  );
};

function Header() {
  const router = useRouter();
  return (
    <View className="w-full flex flex-row justify-between px-4 bg-light-black items-center pb-1 border-b border-b-zinc-800">
      <View className="flex flex-row gap-2 items-center">
        <Image className="w-[40px] h-[40px]" source={user} />
        <View className="flex flex-col">
          <Text className="font-mSemibold text-zinc-200">Welcome back,</Text>
          <Text className="font-mBold text-zinc-200 font-bold text-lg">
            John Doe
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-4">
        <Image className="w-[30px] h-[30px]" source={qrCode} />
        <Pressable onPress={() => router.replace("/(auth)")}>
          <Image className="w-[30px] h-[30px]" source={logOut} />
        </Pressable>
      </View>
    </View>
  );
}

function BalanceContainer() {
  return (
    <View className="bg-primary w-full h-[170px] rounded-lg p-2 flex flex-col justify-between">
      <View className="flex flex-col">
        <Text className="font-mSemibold text-zinc-300">Your Balance</Text>
        <View className="flex flex-row gap-1 items-center">
          <View className="flex flex-row gap-1 items-end">
            <Text className="font-mSemibold text-zinc-100 text-lg">PHP</Text>
            <Text className="font-mBold text-zinc-100 text-3xl">
              {formatNumber(15000)}
            </Text>
          </View>
          <Image className="h-5 w-5" source={eyeOff} />
        </View>
      </View>

      <View className="flex flex-row justify-between w-full items-center">
        <View>
          <Text className="font-mSemibold text-zinc-300">Credit Card</Text>
          <Text className="font-mBold text-zinc-100 text-3xl">
            **** *** 123
          </Text>
        </View>

        <View className="flex flex-row gap-2">
          <Image className="h-12 w-12" source={masterCard} />
          <Image className="h-12 w-12" source={visa} />
        </View>
      </View>
    </View>
  );
}

function ContactsContainer() {
  return (
    <View className="w-full h-auto bg-light-black border border-zinc-800 rounded-lg flex flex-col px-2 py-1 gap-2">
      <View className="flex flex-row justify-between w-full items-center">
        <Text className="font-mBold text-zinc-200 text-lg">Contacts</Text>
        <Pressable className="border border-primary rounded-full items-center flex justify-center px-1 h-5">
          <Text className="text-primary font-mRegular text-xs">See All</Text>
        </Pressable>
      </View>

      <View className="flex flex-row gap-2 items-center">
        <Pressable className="flex flex-col items-center">
          <View
            className="border-zinc-200 rounded-full gap-0.5"
            style={{ borderWidth: 2 }}
          >
            <Image source={plus} className="h-10 w-10" />
          </View>
          <Text className="font-mRegular text-zinc-300 text-sm">Add</Text>
        </Pressable>

        <ScrollView horizontal className="flex flex-row">
          {Array.from({ length: 10 }).map((_, i) => (
            <Pressable key={i} className="flex flex-col items-center mx-3">
              <Image source={contactUser} className="h-11 w-11" />
              <Text className="font-mRegular text-zinc-300 text-sm">
                User {i + 1}
              </Text>
            </Pressable>
          ))}{" "}
        </ScrollView>
      </View>
    </View>
  );
}

function FeaturesContainer() {
  return (
    <View className="w-full h-auto px-2 py-1 flex flex-row gap-3 items-center justify-center">
      <View className="bg-light-black border border-zinc-800 rounded-lg flex flex-col items-center justify-center p-2 w-32">
        <Image className="h-16 w-16" source={sendMoney} />
        <Text className="font-mBold text-zinc-200  text-sm">Send Money</Text>
      </View>
      <View className="bg-light-black border border-zinc-800 rounded-lg flex flex-col items-center justify-center p-2 w-32">
        <Image className="h-16 w-16" source={buyLoad} />
        <Text className="font-mBold text-zinc-200 text-sm">Buy Load</Text>
      </View>
      <View className="bg-light-black border border-zinc-800 rounded-lg flex flex-col items-center justify-center p-2 w-32">
        <Image className="h-16 w-16" source={payBills} />
        <Text className="font-mBold text-zinc-200 text-sm">Pay Bills</Text>
      </View>
    </View>
  );
}

function RecentTransactionsContainer() {
  return (
    <View className="w-full h-auto bg-light-black border border-zinc-800 rounded-lg flex flex-col px-2 py-1 gap-2 mb-24">
      <View className="flex flex-row justify-between w-full items-center">
        <Text className="font-mBold text-zinc-200 text-lg">
          Recent Transactions
        </Text>
        <Pressable className="border border-primary rounded-full items-center flex justify-center px-1 h-5">
          <Text className="text-primary font-mRegular text-xs">See All</Text>
        </Pressable>
      </View>

      <View className="flex flex-col w-full gap-2">
        {recentTransactions.map((transaction, i) => (
          <View
            key={i}
            className="w-full flex flex-row justify-between items-center"
          >
            <View>
              <Text className="font-mBold text-zinc-200">
                {transaction.name}
              </Text>
              <Text className="text-zinc-400 font-mRegular text-xs">
                {formatDate(transaction.timestamp)}
              </Text>
            </View>

            <View
              className={`border px-2 py-0.5 rounded-full ${
                transaction.type === 1
                  ? "border-green-500 bg-green-500/10"
                  : "border-red-500 bg-red-500/10"
              }`}
            >
              <Text
                className={`text-xs font-mSemibold font-bold ${
                  transaction.type === 1 ? "text-green-500" : "text-red-500"
                }`}
              >
                {transaction.type ? "+ " : "- "}PHP{" "}
                {formatNumber(transaction.amount)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default home;
