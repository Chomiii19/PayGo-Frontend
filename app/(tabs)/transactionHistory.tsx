import { View, Text, ScrollView } from "react-native";
import React from "react";
import recentTransactions from "../../data/reentTransactions";
import formatDate from "../../utils/formatDate";
import Header from "../../components/header";
import formatNumber from "../../utils/formatNumber";

const TransactionHistory = () => {
  return (
    <View className="flex-1 bg-backgroundColor items-center">
      <Header name="Transaction History" />
      <ScrollView className="w-full h-full px-2 mt-2 flex flex-col">
        <View className="flex flex-col w-full gap-2">
          {recentTransactions.map((transaction, i) => (
            <View
              key={i}
              className="w-full flex flex-row justify-between items-center mb-1 bg-light-black rounded-lg px-2 py-1 border-zinc-800 border"
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
      </ScrollView>
    </View>
  );
};

export default TransactionHistory;
