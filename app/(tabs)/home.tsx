import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Pressable,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import { Router, useRouter } from "expo-router";
import { icons, images } from "../../constants/image";
import formatNumber from "../../utils/formatNumber";
import formatDate from "../../utils/formatDate";
import { useUser } from "../../context/userContext";
import IUser from "../../@types/userInterfaces";
import { useFocusEffect } from "@react-navigation/native";
import { useTransactions } from "../../context/transactionContext";
import { useExpensesThisMonth } from "../../context/expensesThisMonthContext";
import { useActiveLoan } from "../../context/activeLoanContext";
import { useSettings } from "../../context/settingsContext";

const home = () => {
  const router = useRouter();
  const { refreshPieGraphData } = useActiveLoan();
  const { user, refreshUser } = useUser();
  const { refreshTransaction } = useTransactions();
  const { refreshExpensesThisMonthReport } = useExpensesThisMonth();

  useFocusEffect(
    useCallback(() => {
      refreshUser();
      refreshTransaction();
      refreshPieGraphData();
      refreshExpensesThisMonthReport();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshUser();
    refreshTransaction();
    refreshPieGraphData();
    refreshExpensesThisMonthReport();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!user)
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
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-backgroundColor flex flex-col w-full"
    >
      <StatusBar barStyle="light-content" backgroundColor="#16171B" />
      <Header user={user} router={router} />
      <Carousel user={user} />
      <View className="px-5 w-full flex flex-col gap-1 mt-1">
        <Reports user={user} />
        <Contacts user={user} />
        <RecentTransactions user={user} />
      </View>

      <Announcement />
    </ScrollView>
  );
};

function Header({ router, user }: { router: Router; user: IUser | null }) {
  return (
    <View className="w-full flex flex-row justify-between bg-backgroundColor items-center py-3 px-5">
      <View className="flex flex-row bg-light-black rounded-xl items-center pr-2 gap-3">
        {user?.profilePictureUrl ? (
          <View className="h-16 w-16 overflow-hidden rounded-xl border-2 border-primary">
            <Image className="h-16 w-16" source={images.profile} />
          </View>
        ) : (
          <View className="w-16 h-16 rounded-xl bg-lighter-black flex items-center justify-center">
            <Text className="font-mBold text-zinc-200 text-2xl">
              {user?.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/viewAccount")}
          className="flex flex-row gap-1 items-center"
        >
          <Text className="font-mBold text-zinc-300">
            {user?.name.split(" ")[0]} {user?.name.split(" ")[1]?.charAt(0)}.
          </Text>
          <Image className="rotate-180 h-5 w-5" source={icons.back} />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center gap-4">
        <Pressable>
          <Image className="w-7 h-7 opacity-90" source={icons.bell} />
        </Pressable>

        <TouchableOpacity
          onPress={() => router.push("/(screens)/qrCode")}
          className="bg-lighter-black rounded-2xl p-2"
        >
          <Image className="w-9 h-9 opacity-80" source={icons.qrCode} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Carousel({ user }: { user: IUser | null }) {
  const totalBalance = (user?.checkingsBal || 0) + (user?.savingsBal || 0);
  const [showTotalBalance, setShowTotalBalance] = useState(false);
  const [showCheckingBalance, setShowCheckingBalance] = useState(false);
  const [showSavingBalance, setShowSavingBalance] = useState(false);
  const { hideAccountNumber } = useSettings();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex flex-row w-full h-48 my-4 pl-5"
    >
      <View className="h-full flex flex-col justify-center gap-2">
        <Text className="font-mBold text-zinc-500 text-sm">TOTAL BALANCE</Text>
        <View className="flex flex-row gap-2 items-center">
          <Text className="font-mBold text-zinc-200 text-4xl">
            {showTotalBalance
              ? `₱${formatNumber(totalBalance)}`
              : "₱                    "}
          </Text>
          <TouchableOpacity
            onPress={() => setShowTotalBalance(!showTotalBalance)}
          >
            <Image
              source={showTotalBalance ? icons.eyeOff : icons.eye}
              className="h-5 w-5"
              tintColor={"#71717a"}
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row gap-2 items-center">
          <View className="flex flex-row gap-1 items-center justify-center p-1 px-3 bg-green-500/15 rounded-xl border border-green-500">
            <Image className="h-4 w-4" source={icons.arrowUp} />
            <Text className="font-mBold text-green-500 text-xs">
              ₱{formatNumber(totalBalance)}
            </Text>
          </View>

          <Pressable className="flex flex-row items-center gap-1">
            <Text className="text-zinc-500 text-xs font-mRegular">
              vs last month
            </Text>
            <Image
              className="h-4 w-4 rotate-180"
              style={{ tintColor: "#71717a" }}
              source={icons.back}
            />
          </Pressable>
        </View>
      </View>

      <View className="w-[370px] h-full mx-20 rounded-[30px] relative overflow-hidden">
        <View className="h-full w-full absolute p-2 px-4 z-10 flex flex-col justify-between">
          <Image source={icons.masterCard} className="h-12 w-12" />

          <View className="w-full flex flex-col justify-center items-center">
            <Text className="font-rBold text-zinc-300">Checkings Account:</Text>
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-zinc-100 font-rBold text-3xl">
                {showCheckingBalance
                  ? `₱${formatNumber(user?.checkingsBal || 0)}`
                  : "₱                    "}
              </Text>
              <TouchableOpacity
                onPress={() => setShowCheckingBalance(!showCheckingBalance)}
              >
                <Image
                  source={showCheckingBalance ? icons.eyeOff : icons.eye}
                  className="h-4 w-4"
                  tintColor={"#d4d4d8"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex flex-row w-full justify-between">
            <Text className="font-mBold text-zinc-200 text-lg">
              {hideAccountNumber
                ? `**** *** ${user?.accountNumber.slice(-4)}`
                : user?.accountNumber}
            </Text>
            <Image source={icons.visa} className="h-10 w-10" />
          </View>
        </View>
        <Image
          source={images.bgBlue}
          className="w-full h-full absolute scale-150"
          style={{ resizeMode: "contain" }}
        />
      </View>

      <View className="w-[370px] h-full mr-10 rounded-[30px] relative overflow-hidden">
        <View className="h-full w-full absolute p-2 px-4 z-10 flex flex-col justify-between">
          <Image source={icons.masterCard} className="h-12 w-12" />

          <View className="w-full flex flex-col justify-center items-center">
            <Text className="font-rBold text-zinc-300">Savings Account:</Text>
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-zinc-100 font-rBold text-3xl">
                {showSavingBalance
                  ? `₱${formatNumber(user?.savingsBal || 0)}`
                  : "₱                    "}
              </Text>
              <TouchableOpacity
                onPress={() => setShowSavingBalance(!showSavingBalance)}
              >
                <Image
                  source={showSavingBalance ? icons.eyeOff : icons.eye}
                  className="h-4 w-4"
                  tintColor={"#d4d4d8"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex flex-row w-full justify-between">
            <Text className="font-mBold text-zinc-200 text-lg">
              {hideAccountNumber
                ? `**** *** ${user?.accountNumber.slice(-4)}`
                : user?.accountNumber}
            </Text>
            <Image source={icons.visa} className="h-10 w-10" />
          </View>
        </View>
        <Image
          source={images.violet}
          className="w-full h-full absolute scale-150"
          style={{ resizeMode: "contain" }}
        />
      </View>
    </ScrollView>
  );
}

function Reports({ user }: { user: IUser | null }) {
  const { expensesThisMonthReport } = useExpensesThisMonth();
  const { pieGraphData } = useActiveLoan();
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };
  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (new Date(pieGraphData?.nextDueDate || 0).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <View className="w-full h-[180px] mt-2 flex flex-row justify-between">
      <View className="w-[180px] h-full bg-light-black rounded-2xl p-3 flex flex-col justify-between">
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
          <View className="w-full flex flex-row rounded-full h-2">
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

      <View className="w-[180px] h-full bg-light-black rounded-2xl p-3 flex flex-col justify-between">
        <View className="p-3 bg-lighter-black rounded-xl flex w-12 items-center justify-center">
          <Image source={icons.piggyBank} className="h-7 w-7" />
        </View>
        <Text className="text-zinc-300 font-rSemibold text-sm">
          ACTIVE LOAN
        </Text>

        <View className="w-full flex flex-col gap-1">
          <Text className="text-zinc-200 font-rBold text-lg">
            {pieGraphData?.balanceRemaining
              ? `-₱ ${formatNumber(pieGraphData?.balanceRemaining || 0)}`
              : "₱0.00"}
          </Text>
          <View className="w-full flex flex-row rounded-2xl bg-red-500/20 px-2 py-2 justify-center">
            <Text className="font-mBold text-xs text-red-500">
              {pieGraphData?.balanceRemaining
                ? `Next payment in ${daysRemaining} days`
                : "No active loans"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function Contacts({ user }: { user: IUser | null }) {
  const router = useRouter();

  return (
    <View className="w-full p-3 flex flex-col mt-3 bg-light-black rounded-2xl gap-3">
      <View className="flex flex-row justify-between w-full">
        <Text className="font-rSemibold text-zinc-200">CONTACTS</Text>
        <TouchableOpacity className="flex flex-row gap-1 items-center">
          <Text className="font-rSemibold text-sm text-primary">SEE ALL</Text>
          <Image source={icons.back} className="rotate-180 h-5 w-5" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row w-full gap-1">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/addContacts")}
          className="flex items-center justify-center bg-lighter-black rounded-2xl h-[60px] w-[60px]"
        >
          <Image source={icons.plus} className="h-8 w-8" />
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="w-full"
        >
          {user?.contacts.map((contact, i) => (
            <View
              key={i}
              className="w-[60px] h-[60px] rounded-2xl mx-2 bg-lighter-black flex items-center justify-center"
            >
              <Text className="font-mBold text-zinc-200 text-2xl">
                {contact?.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function RecentTransactions({ user }: { user: IUser | null }) {
  const router = useRouter();
  const { transactions } = useTransactions();

  return (
    <View className="w-full rounded-2xl p-3 flex flex-col bg-light-black mt-3 gap-1">
      <View className="flex flex-row justify-between w-full">
        <Text className="font-rSemibold text-zinc-200">
          RECENT TRANSACTIONS
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/transactionHistory")}
          className="flex flex-row gap-1 items-center"
        >
          <Text className="font-rSemibold text-sm text-primary">SEE ALL</Text>
          <Image source={icons.back} className="rotate-180 h-5 w-5" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-col gap-1 w-full relative h-[150px]">
        <LinearGradient
          colors={["transparent", "#1D1E27"]}
          className="absolute w-full h-full z-10"
        />
        {transactions.slice(0, 3).map((transaction, i) => (
          <View
            key={i}
            className="w-full flex flex-row justify-between items-center mb-1 rounded-lg px-2 py-1 "
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
          </View>
        ))}
      </View>
    </View>
  );
}

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

function Announcement() {
  const router = useRouter();
  const { pieGraphData } = useActiveLoan();

  return (
    <View className="flex flex-col gap-3 mt-6 pl-5 mb-24">
      <Text className="font-rBold text-zinc-200">ANNOUNCEMENTS</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full h-[200px] flex "
      >
        <View className="w-[320px] h-full mr-7 rounded-[30px] relative overflow-hidden">
          <View className="h-full w-full absolute p-4 z-10 flex flex-col justify-center">
            <Text className="font-mBold font-bold text-zinc-100 text-2xl w-[250px]">
              Enjoy 0.03% loan interest this March!
            </Text>
            <Text className="font-mBold text-sm text-zinc-300">
              Loan now for a minimum of ₱10,000.00
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (!pieGraphData) router.push("/(tabs)/applyLoan");
                else router.push("/loanDetails");
              }}
              className="flex items-center rounded-full bg-zinc-100 flex-row px-3 py-1 w-36 justify-center mt-6"
            >
              <Text className="text-blue-400 font-mBold">Loan Now</Text>
              <Image
                source={icons.back}
                className="rotate-180"
                tintColor={"#60a5fa"}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={images.bgBlue1}
            className="w-full h-full absolute scale-150"
            style={{ resizeMode: "contain" }}
          />
        </View>

        <View className="w-[320px] h-full mr-10 rounded-[30px] relative overflow-hidden">
          <View className="h-full w-full absolute p-4 z-10 flex flex-col justify-center">
            <Text className="font-mBold font-bold text-zinc-100 text-2xl w-[250px]">
              Paying bills is now avaialble!
            </Text>
            <Text className="font-mBold text-sm text-zinc-300">
              Pay your bills with ease.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/payBills")}
              className="flex items-center rounded-full bg-zinc-100 flex-row px-3 py-1 w-36 justify-center mt-6"
            >
              <Text className="text-violet-950 font-mBold">Pay Now</Text>
              <Image
                source={icons.back}
                className="rotate-180"
                tintColor={"#2e1065"}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={images.violet2}
            className="w-full h-full absolute scale-150"
            style={{ resizeMode: "contain" }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default home;
