import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Router, useRouter } from "expo-router";
import { icons, images } from "../../constants/image";
import formatNumber from "../../utils/formatNumber";
import recentTransactions from "../../data/reentTransactions";
import formatDate from "../../utils/formatDate";

const home = () => {
  const router = useRouter();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-backgroundColor flex flex-col w-full"
    >
      <StatusBar barStyle="light-content" backgroundColor="#16171B" />
      <Header router={router} />
      <Carousel />
      <View className="px-5 w-full flex flex-col gap-1 mt-1">
        <Reports />
        <Contacts />
        <RecentTransactions />
      </View>

      <Announcement />
    </ScrollView>
  );
};

function Header({ router }: { router: Router }) {
  return (
    <View className="w-full flex flex-row justify-between bg-backgroundColor items-center py-3 px-5">
      <View className="flex flex-row bg-light-black rounded-xl items-center pr-2 gap-3">
        <View className="h-16 w-16 overflow-hidden rounded-xl border-2 border-primary">
          <Image className="h-16 w-16" source={images.profile} />
        </View>

        <View className="flex flex-row gap-1 items-center">
          <Text className="font-mBold text-zinc-300">Monkey L.</Text>
          <Image className="rotate-180 h-5 w-5" source={icons.back} />
        </View>
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

function Carousel() {
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
            ₱{formatNumber(15327.92)}
          </Text>
          <Image
            source={icons.eyeOff}
            className="h-5 w-5"
            tintColor={"#71717a"}
          />
        </View>

        <View className="flex flex-row gap-2 items-center">
          <View className="flex flex-row gap-1 items-center justify-center p-1 px-3 bg-green-500/15 rounded-xl border border-green-500">
            <Image className="h-4 w-4" source={icons.arrowUp} />
            <Text className="font-mBold text-green-500 text-xs">
              ₱{formatNumber(512)}
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
                ₱{formatNumber(8027)}
              </Text>
              <Image
                source={icons.eyeOff}
                className="h-4 w-4"
                tintColor={"#d4d4d8"}
              />
            </View>
          </View>

          <View className="flex flex-row w-full justify-between">
            <Text className="font-mBold text-zinc-200 text-lg">
              **** *** 1234
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
            <Text className="font-rBold text-zinc-300">Checkings Account:</Text>
            <View className="flex flex-row gap-1 items-center">
              <Text className="text-zinc-100 font-rBold text-3xl">
                ₱{formatNumber(7030)}
              </Text>
              <Image
                source={icons.eyeOff}
                className="h-4 w-4"
                tintColor={"#d4d4d8"}
              />
            </View>
          </View>

          <View className="flex flex-row w-full justify-between">
            <Text className="font-mBold text-zinc-200 text-lg">
              **** *** 1234
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

function Reports() {
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

      <View className="w-[180px] h-full bg-light-black rounded-2xl p-3 flex flex-col justify-between">
        <View className="p-3 bg-lighter-black rounded-xl flex w-12 items-center justify-center">
          <Image source={icons.piggyBank} className="h-7 w-7" />
        </View>
        <Text className="text-zinc-300 font-rSemibold text-sm">
          ACTIVE LOAN
        </Text>

        <View className="w-full flex flex-col gap-1">
          <Text className="text-zinc-200 font-rBold text-lg">
            -₱{formatNumber(1800)}
          </Text>
          <View className="w-full flex flex-row rounded-2xl bg-red-500/20 px-2 py-2 justify-center">
            <Text className="font-mBold text-xs text-red-500">
              Next payment in 5 days
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function Contacts() {
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
        <View className="flex items-center justify-center bg-lighter-black rounded-2xl h-[60px] w-[60px]">
          <Image source={icons.plus} className="h-8 w-8" />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="w-full"
        >
          <Image
            className="w-[60px] h-[60px] rounded-2xl mx-2"
            source={images.user1}
          ></Image>
          <Image
            className="w-[60px] h-[60px] rounded-2xl mx-2"
            source={images.user2}
          ></Image>
          <View className="w-[60px] h-[60px] rounded-2xl mx-2 bg-lighter-black flex items-center justify-center">
            <Text className="font-mBold text-zinc-200 text-2xl">CK</Text>
          </View>

          <Image
            className="w-[60px] h-[60px] rounded-2xl mx-2"
            source={images.user3}
          ></Image>
          <Image
            className="w-[60px] h-[60px] rounded-2xl mx-2"
            source={images.user4}
          ></Image>
        </ScrollView>
      </View>
    </View>
  );
}

function RecentTransactions() {
  return (
    <View className="w-full rounded-2xl p-3 flex flex-col bg-light-black mt-3 gap-1">
      <View className="flex flex-row justify-between w-full">
        <Text className="font-rSemibold text-zinc-200">
          RECENT TRANSACTIONS
        </Text>
        <TouchableOpacity className="flex flex-row gap-1 items-center">
          <Text className="font-rSemibold text-sm text-primary">SEE ALL</Text>
          <Image source={icons.back} className="rotate-180 h-5 w-5" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-col gap-1 w-full relative">
        <LinearGradient
          colors={["transparent", "#1D1E27"]}
          className="absolute w-full h-full z-10"
        />
        {recentTransactions.slice(0, 3).map((transaction, i) => (
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
  } else if (transactionName[0] === "S") {
    return <Image className="h-7 w-7" source={icons.transfer} />;
  } else if (transactionName[0] === "P") {
    return <Image className="h-7 w-7" source={icons.receipt} />;
  } else if (transactionName[0] === "B") {
    return <Image className="h-7 w-7" source={icons.signal} />;
  }
  return null;
};

function Announcement() {
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
              Enjoy 0% loan interest this March!
            </Text>
            <Text className="font-mBold text-sm text-zinc-300">
              Loan now for a minimum of ₱1,000
            </Text>

            <Pressable className="flex items-center rounded-full bg-zinc-100 flex-row px-3 py-1 w-36 justify-center mt-6">
              <Text className="text-blue-400 font-mBold">Loan Now</Text>
              <Image
                source={icons.back}
                className="rotate-180"
                tintColor={"#60a5fa"}
              />
            </Pressable>
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

            <Pressable className="flex items-center rounded-full bg-zinc-100 flex-row px-3 py-1 w-36 justify-center mt-6">
              <Text className="text-violet-950 font-mBold">Pay Now</Text>
              <Image
                source={icons.back}
                className="rotate-180"
                tintColor={"#2e1065"}
              />
            </Pressable>
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
