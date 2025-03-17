import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import formatDate from "../../utils/formatDate";
import Header from "../../components/header";
import formatNumber from "../../utils/formatNumber";
import { icons } from "../../constants/image";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import getTokenFromStorage from "../../utils/getTokenFromStorage";
import { useTransactions } from "../../context/transactionContext";

const TransactionHistory = () => {
  const { transactions, refreshTransaction } = useTransactions();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      refreshTransaction();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    refreshTransaction();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!transactions || transactions.length === 0)
    return <NoTransactions refreshing={refreshing} onRefresh={onRefresh} />;

  return (
    <View className="flex-1 bg-backgroundColor items-center">
      <Header name="Transaction History" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="w-full h-full px-5 mt-2 flex flex-col"
      >
        <View className="flex flex-col w-full gap-2">
          {transactions.map((transaction, i) => (
            <TouchableOpacity
              key={i}
              className="w-full flex flex-row justify-between items-center mb-1 bg-light-black rounded-lg px-2.5 py-2.5"
            >
              <View className="flex flex-row gap-2 items-center">
                {renderIcon(transaction.name)}
                <View>
                  <Text className="font-mBold text-zinc-200">
                    {transaction.name}
                  </Text>
                  <Text className="text-zinc-400 font-mRegular text-xs">
                    {formatDate(transaction.timestamp)}
                  </Text>
                </View>
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
                  {transaction.type ? "+ " : "- "}₱
                  {formatNumber(transaction.amount)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const renderIcon = (transactionName: string) => {
  if (transactionName[0] === "R") {
    return <Image className="h-7 w-7" source={icons.receive} />;
  } else if (transactionName.slice(0, 2) === "Ba") {
    return <Image className="h-7 w-7" source={icons.transfer} />;
  } else if (transactionName[0] === "P") {
    return <Image className="h-7 w-7" source={icons.receipt} />;
  } else if (transactionName.slice(0, 2) === "Bu") {
    return <Image className="h-7 w-7" source={icons.signal} />;
  } else if (transactionName[0] === "L") {
    return <Image className="h-7 w-7" source={icons.piggyBank} />;
  }
  return null;
};

function NoTransactions({
  refreshing,
  onRefresh,
}: {
  refreshing: boolean;
  onRefresh: () => void;
}) {
  return (
    <View className="flex-1 bg-backgroundColor">
      <Header name="Transaction History" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 w-full justify-center items-center">
          <Text className="font-rSemibold text-sm text-zinc-400">
            No transactions yet.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default TransactionHistory;
