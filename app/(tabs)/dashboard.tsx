import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/header";

const Dashboard = () => {
  return (
    <View className="flex-1 bg-backgroundColor flex-col">
      <Header name="Account Statistics" />
      <View className="px-4 py-2 mt-2 flex flex-col gap-4">
        <TotalExpenses />
        <TransactionsOverview />
      </View>
    </View>
  );
};

function TotalExpenses() {
  return (
    <View className="bg-light-black border border-zinc-800 rounded-lg w-full h-[200px]"></View>
  );
}

function TransactionsOverview() {
  return (
    <View className="bg-light-black border border-zinc-800 rounded-lg w-full h-[200px]"></View>
  );
}

export default Dashboard;
