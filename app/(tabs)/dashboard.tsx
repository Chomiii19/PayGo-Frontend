import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../../components/header";
import TotalExpensesGraph from "../../components/lineChart";
import { icons } from "../../constants/image";
import formatNumber from "../../utils/formatNumber";
import TransactionsOverviewGraph from "../../components/barChart";
import LoanChart from "../../components/pieChart";
import { useExpensesThisMonth } from "../../context/expensesThisMonthContext";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import getTokenFromStorage from "../../utils/getTokenFromStorage";
import IBarGraphData from "../../@types/barGraphInterface";
import { ILineGraphData } from "../../@types/expensesMonthly";
import { useActiveLoan } from "../../context/activeLoanContext";

const Dashboard = () => {
  const { refreshPieGraphData } = useActiveLoan();
  const { refreshExpensesThisMonthReport } = useExpensesThisMonth();
  const [barGraphData, setBarGraphData] = useState<IBarGraphData[]>([]);
  const [lineGraphData, setLineGraphData] = useState<ILineGraphData>({
    results: [],
    currentYearTotal: 0,
    lastYearTotal: 0,
    percentageChange: 0,
  });

  const fetchAllData = async () => {
    try {
      const authToken = await getTokenFromStorage();
      const [yearlyTransactions, expensesMonthly] = await Promise.all([
        axios.get(
          "https://paygo-backend-1y0p.onrender.com/api/v1/app/transactions/yearly",
          { headers: { Authorization: `Bearer ${authToken}` } }
        ),
        axios.get(
          "https://paygo-backend-1y0p.onrender.com/api/v1/app/expenses/monthly",
          { headers: { Authorization: `Bearer ${authToken}` } }
        ),
      ]);

      setBarGraphData(yearlyTransactions.data.data);
      setLineGraphData(expensesMonthly.data.data);
    } catch (err) {
      console.error("Error in fetching dashboard data.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      refreshExpensesThisMonthReport();
      refreshPieGraphData();
      fetchAllData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshExpensesThisMonthReport();
    refreshPieGraphData();
    fetchAllData();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (barGraphData.length === 0 || lineGraphData.results.length === 0)
    return (
      <View className="flex-1 bg-backgroundColor justify-center items-center">
        <Image source={icons.icon} className="w-16 h-16" />
      </View>
    );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex-1 bg-backgroundColor flex-col"
    >
      <StatusBar barStyle="light-content" backgroundColor="#16171B" />
      <Header name="Account Statistics" />
      <View className="px-4 py-2 mt-2 flex flex-col gap-4 mb-24">
        <HeadReports />
        <TotalExpenses lineGraphData={lineGraphData} />
        <TransactionsOverview barGraphData={barGraphData} />
      </View>
    </ScrollView>
  );
};

function HeadReports() {
  const { pieGraphData } = useActiveLoan();
  const { expensesThisMonthReport } = useExpensesThisMonth();
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

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
            Expenses in {formatDate(new Date())}
          </Text>
          <Text className="text-zinc-100 font-rBold text-lg">
            ₱{formatNumber(expensesThisMonthReport?.grandTotal)}
          </Text>
          <View
            className={`w-full flex flex-row rounded-full h-2 ${
              expensesThisMonthReport.grandTotal
                ? "border border-lighter-black"
                : ""
            }`}
          >
            {expensesThisMonthReport.expenses.map((expense, i, arr) => {
              let color: string = "transparent";
              if (expense.type === "pay_bills") color = "bg-red-400";
              if (expense.type === "buy_load") color = "bg-purple-500";
              if (expense.type === "bank_transfer") color = "bg-yellow-500";

              let borderRadius = "rounded-none";
              if (arr.length === 1) {
                borderRadius = "rounded-full";
              } else if (i === 0) {
                borderRadius = "rounded-l-full";
              } else if (i === arr.length - 1) {
                borderRadius = "rounded-r-full";
              }

              return (
                <View
                  key={i}
                  style={{ width: `${expense.percentage}%` }}
                  className={`h-full ${borderRadius} ${color}`}
                ></View>
              );
            })}
          </View>
        </View>
      </View>

      <View className="w-[185px] h-full bg-light-black rounded-2xl p-3 flex flex-col justify-between">
        <View className="w-full flex flex-row items-center justify-between">
          <Text className="text-zinc-400 font-rBold text-sm">ACTIVE LOAN</Text>
          <TouchableOpacity className="flex flex-row items-center gap-1">
            <Text className="text-primary font-rRegular text-xs">Details</Text>
            <Image source={icons.back} className=" rotate-180 h-4 w-4" />
          </TouchableOpacity>
        </View>

        <View className="w-full flex justify-center items-center">
          {pieGraphData.amount ? (
            <LoanChart />
          ) : (
            <Text className="text-zinc-300 font-rSemibold">
              No Active Loans
            </Text>
          )}
        </View>

        <View className="w-full flex flex-row justify-between">
          <View>
            <Text className="font-rRegular text-xs text-zinc-500">
              Total Amount
            </Text>
            <Text className="font-rBold text-zinc-200 text-sm">
              ₱{formatNumber(pieGraphData.amount || 0)}
            </Text>
          </View>
          <View>
            <Text className="font-rRegular text-xs text-zinc-500">
              Remaining
            </Text>
            <Text className="font-rBold text-red-500 text-sm">
              ₱{formatNumber(pieGraphData.balanceRemaining || 0)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function TotalExpenses({ lineGraphData }: { lineGraphData: ILineGraphData }) {
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
          ₱{formatNumber(lineGraphData.currentYearTotal)}
        </Text>
        <View className="flex flex-row border border-green-500 bg-green-500/20 px-2 py-0.5 rounded-full">
          <Image source={icons.arrowUp} className="h-4 w-4" />
          <Text className="text-green-500 font-mBold text-xs">
            {lineGraphData.percentageChange}%
          </Text>
        </View>

        <Text className="font-rRegular text-zinc-500 text-xs">
          vs last year
        </Text>
      </View>

      <View className="w-full flex justify-center items-center">
        <TotalExpensesGraph data={lineGraphData.results} />
      </View>
    </View>
  );
}

function TransactionsOverview({
  barGraphData,
}: {
  barGraphData: IBarGraphData[];
}) {
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
        <TransactionsOverviewGraph barGraphData={barGraphData} />
      </View>
    </View>
  );
}

export default Dashboard;
