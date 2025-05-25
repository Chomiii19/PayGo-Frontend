import { View, Text, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import Header from "../../components/header";
import formatNumber from "../../utils/formatNumber";
import { icons } from "../../constants/image";
import { useUser } from "../../context/userContext";
import axios from "axios";
import getTokenFromStorage from "../../utils/getTokenFromStorage";

const PayLoan = () => {
  const { user } = useUser();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { loanId, amount, date, paymentSource } = useLocalSearchParams();
  const parsedDate = Array.isArray(date) ? date[0] : date;
  const targetDate = new Date(parsedDate);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  console.log(loanId);

  const checkSufficientBalance = () => {
    console.log(user);
    if (!user) return false;

    if (
      paymentSource === "checkings" &&
      user?.checkingsBal < Number(amount) + 0.3
    )
      return false;
    if (paymentSource === "savings" && user?.savingsBal < Number(amount) + 0.3)
      return false;

    return true;
  };

  const onSubmit = async () => {
    const token = await getTokenFromStorage();
    try {
      const response = await axios.patch(
        `https://paygo-backend-1y0p.onrender.com/api/v1/app/loan/${loanId}/pay-term`,
        {
          date,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const loanDetails = response.data.data;

      setChecked(false);

      router.replace({
        pathname: "/(tabs)/transactionDetails",
        params: {
          refId: loanDetails._id,
          accNum: user?.accountNumber,
          amount: Number(amount) + 0.3,
          type: "loan",
          service: "PayGo Loan",
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error("Unknown error:", err);
      }
      setError("Error");
    }
  };

  return (
    <View className="flex-1 bg-backgroundColor items-center">
      <Header name="Loan Payment" />

      <View className="w-full h-full px-5 items-center flex flex-col mt-14 relative">
        <View className="rounded-2xl bg-light-black w-full px-4 pt-16 py-7 flex flex-col items-center relative">
          <Image source={icons.loan} className="h-20 w-20 absolute -top-10" />
          <Text className="text-zinc-500 font-rSemibold">
            Confirm Loan Term Payment
          </Text>

          <View className="border-y border-y-lighter-black w-full flex flex-col gap-1 my-2 py-5">
            <View className="flex flex-row w-full">
              <Text className="font-rSemibold text-zinc-400 w-1/2">
                Loan ID
              </Text>
              <Text className="font-rSemibold text-zinc-200 w-1/2">
                {loanId}
              </Text>
            </View>
            <View className="flex flex-row w-full">
              <Text className="font-rSemibold text-zinc-400 w-1/2">
                Term Date
              </Text>
              <Text className="font-rSemibold text-zinc-200 w-1/2">
                {formatDate(targetDate)}
              </Text>
            </View>
            <View className="flex flex-row w-full">
              <Text className="font-rSemibold text-zinc-400 w-1/2">
                Balance
              </Text>
              <Text className="font-rSemibold text-zinc-200 w-1/2">
                ₱{formatNumber(Number(amount))}
              </Text>
            </View>
            <View className="flex flex-row w-full">
              <Text className="font-rSemibold text-zinc-400 w-1/2">
                Interest
              </Text>
              <Text className="font-rSemibold text-zinc-200 w-1/2">
                ₱{formatNumber(0.3)}
              </Text>
            </View>
            <View className="flex flex-row w-full">
              <Text className="font-rSemibold text-zinc-400 w-1/2">
                Total Amount
              </Text>
              <Text className="font-rSemibold text-zinc-200 w-1/2">
                ₱{formatNumber(Number(amount) + 0.3)}
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full px-5 flex flex-col mt-72">
          <View className="flex flex-row gap-2 items-center mb-3">
            <TouchableOpacity
              onPress={() => setChecked(!checked)}
              className={`w-6 h-6 border rounded-lg ${
                checked ? "bg-primary border-primary" : "border-zinc-500"
              }`}
            >
              {checked && <Image source={icons.check} className="h-5 w-5" />}
            </TouchableOpacity>
            <Text className="text-zinc-500 font-rRegular text-sm">
              I confirm that the details provided are accurate.
            </Text>
          </View>

          <View className="relative">
            {(!checked || !checkSufficientBalance()) && (
              <View className="absolute w-full h-full z-10 bg-backgroundColor/50 rounded-2xl"></View>
            )}
            <TouchableOpacity
              onPress={() => onSubmit()}
              className="mb-24 w-full rounded-2xl flex flex-row justify-center py-2 bg-primary"
            >
              <Text className="text-zinc-200 font-rBold">CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PayLoan;
