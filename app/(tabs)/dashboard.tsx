import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import Header from "../../components/header";
import TotalExpensesGraph from "../../components/lineChart";
import { icons } from "../../constants/image";
import formatNumber from "../../utils/formatNumber";
import TransactionsOverviewGraph from "../../components/barChart";
import LoanChart from "../../components/pieChart";

const Dashboard = () => {
  return (
    <ScrollView className="flex-1 bg-backgroundColor flex-col">
      <StatusBar barStyle="light-content" backgroundColor="#16171B" />
      <Header name="Account Statistics" />
      <View className="px-4 py-2 mt-2 flex flex-col gap-4 mb-24">
        <HeadReports />
        <TotalExpenses />
        <TransactionsOverview />
      </View>
    </ScrollView>
  );
};

function HeadReports() {
  return (
    <View className="w-full h-[180px] mt-2 flex flex-row justify-between">
      <View className="w-[185px] h-full bg-light-black rounded-2xl p-3 flex flex-col justify-between">
        <View className="p-3 bg-lighter-black rounded-xl flex w-12 items-center justify-center">
          <Image source={icons.wallet} className="h-7 w-7" />
        </View>
        <Text className="text-zinc-300 font-rSemibold text-sm">
          ALL TRANSACTIONS
        </Text>

        <View className="w-full flex flex-col gap-1">
          <Text className="text-zinc-500 font-mRegular text-xs">
            Expenses in Mar. 2025
          </Text>
          <Text className="text-zinc-100 font-rBold text-lg">
            ₱{formatNumber(23580.5)}
          </Text>
          <View className="w-full flex flex-row rounded-full h-2">
            <View className="bg-yellow-500 w-[40%] h-full rounded-l-full"></View>
            <View className="bg-purple-500 w-[45%] h-full"></View>
            <View className="bg-red-400 w-[15%] h-full rounded-r-full"></View>
          </View>
        </View>
      </View>

      <View className="w-[185px] h-full bg-light-black rounded-2xl p-3 flex flex-col justify-between">
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-zinc-400 font-rBold text-sm">ACTIVE LOAN</Text>
          <Pressable className="flex flex-row items-center gap-1">
            <Text className="text-primary font-rRegular text-xs">Details</Text>
            <Image source={icons.back} className=" rotate-180 h-4 w-4" />
          </Pressable>
        </View>

        <View className="w-full flex justify-center items-center">
          <LoanChart />
        </View>

        <View className="w-full flex flex-row justify-between">
          <View>
            <Text className="font-rRegular text-xs text-zinc-500">
              Total Amount
            </Text>
            <Text className="font-rBold text-zinc-200">
              ₱{formatNumber(18000)}
            </Text>
          </View>
          <View>
            <Text className="font-rRegular text-xs text-zinc-500">
              Remaining
            </Text>
            <Text className="font-rBold text-red-500">
              ₱{formatNumber(1800)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function TotalExpenses() {
  return (
    <View className="bg-light-black rounded-2xl w-full h-auto p-3 flex flex-col">
      <View className="w-full flex flex-row items-center justify-between">
        <Text className="text-zinc-400 font-rBold">TOTAL EXPENSES</Text>
        <Pressable className="flex flex-row items-center gap-1">
          <Text className="text-zinc-400 font-rRegular text-sm">This Year</Text>
          <Image source={icons.back} className=" rotate-[270deg]" />
        </Pressable>
      </View>

      <View className="flex flex-row items-center gap-2 mb-2">
        <Text className="text-zinc-200 font-rBold text-3xl">
          ₱{formatNumber(43870.5)}
        </Text>
        <View className="flex flex-row border border-green-500 bg-green-500/20 px-2 py-0.5 rounded-full">
          <Image source={icons.arrowUp} className="h-4 w-4" />
          <Text className="text-green-500 font-mBold text-xs">7.8%</Text>
        </View>

        <Text className="font-rRegular text-zinc-500 text-xs">
          vs last year
        </Text>
      </View>

      <View className="w-full flex justify-center items-center">
        <TotalExpensesGraph />
      </View>
    </View>
  );
}

function TransactionsOverview() {
  return (
    <View className="bg-light-black flex flex-col rounded-2xl w-full p-3">
      <View className="w-full flex flex-row items-center justify-between mb-2">
        <Text className="text-zinc-400 font-rBold">TRANSACTIONS OVERVIEW</Text>
        <Pressable className="flex flex-row items-center gap-1">
          <Text className="text-zinc-400 font-rRegular text-sm">This Year</Text>
          <Image source={icons.back} className=" rotate-[270deg]" />
        </Pressable>
      </View>

      <View className="w-full flex justify-center items-center">
        <TransactionsOverviewGraph />
      </View>
    </View>
  );
}

export default Dashboard;
