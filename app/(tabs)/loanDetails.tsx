import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/header";
import LoanChart from "../../components/pieChart";
import { useActiveLoan } from "../../context/activeLoanContext";
import formatNumber from "../../utils/formatNumber";
import formatDate from "../../utils/formatDate";
import { useRouter } from "expo-router";

const LoanDetails = () => {
  const { pieGraphData } = useActiveLoan();

  return (
    <ScrollView className="flex-1 bg-backgroundColor flex-col">
      <Header name="Loan Details" />

      <View className="w-full justify-center items-center mt-10 px-5">
        <LoanChart innerRadius={70} radius={90} innerCircleColor="#16171B" />

        <View className="w-full flex flex-row justify-between items-center">
          <View className="flex flex-col justify-center items-center">
            <Text className="font-rRegular text-xs text-zinc-500">
              LOAN AMOUNT
            </Text>
            <Text className="font-rBold text-zinc-200">
              ₱{formatNumber(pieGraphData?.amount || 0)}
            </Text>
          </View>

          <View className="flex flex-col justify-center items-center">
            <Text className="font-rRegular text-xs text-zinc-500">
              REMAINING BALANCE
            </Text>
            <Text className="font-rBold text-red-500">
              ₱{formatNumber(pieGraphData?.balanceRemaining || 0)}
            </Text>
          </View>
        </View>
      </View>

      <LoanReports />
    </ScrollView>
  );
};

function LoanReports() {
  const { pieGraphData } = useActiveLoan();
  const router = useRouter();

  return (
    <View className="flex flex-col w-full gap-2 px-5 mt-4 mb-24">
      {pieGraphData?.termStatus.map((term, i) => (
        <View
          key={i}
          className={`w-full flex flex-row justify-between items-center mb-1 bg-light-black rounded-lg px-2.5 py-2.5 ${
            term.paid ? "opacity-60" : ""
          }`}
        >
          <View>
            <Text className="font-mBold text-zinc-200">
              {formatDate(term?.dueDate || "", false)}
            </Text>
            <Text className="text-zinc-400 font-mRegular text-xs">
              ₱{formatNumber(term?.amount || 0)}
            </Text>
          </View>

          {term.paid ? (
            <View className="border px-2 py-0.5 rounded-full border-green-500 bg-green-500/10">
              <Text className="text-xs font-mSemibold font-bold text-green-500">
                PAID
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/payLoan",
                  params: {
                    loanId: pieGraphData._id,
                    amount: pieGraphData.amount / 10,
                    date: term.dueDate,
                    paymentSource: pieGraphData.paymentSource,
                  },
                });
              }}
              className="px-2 py-0.5 rounded-full bg-red-500"
            >
              <Text className="text-xs font-mSemibold font-bold text-zinc-200">
                PAY TERM
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

export default LoanDetails;
