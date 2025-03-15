import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../components/header";
import { icons, images } from "../../constants/image";
import { useRouter } from "expo-router";
import InviteFriends from "../../components/inviteFriendsAds";

const Profile = () => {
  return (
    <ScrollView className="flex-1 bg-backgroundColor flex-col">
      <Header name="Account Details" />

      <ProfileContainer />
      <InviteFriends />

      <View className="w-full flex flex-col gap-3 px-5">
        <MyAccountTab />
        <LoanMoneyTab />
        <SecuritySettingsTab />
        <LogOutButton />
      </View>
    </ScrollView>
  );
};

function ProfileContainer() {
  return (
    <>
      <View className="p-4 px-5 w-full">
        <View className="w-full relative">
          <View className="w-full h-[180px] rounded-2xl relative overflow-hidden">
            <Image
              source={images.bgBlue1}
              className="w-full h-full absolute scale-150"
              style={{ resizeMode: "contain" }}
            />
          </View>
          <View className="w-full absolute justify-center flex items-center top-24 z-10">
            <View className="bg-backgroundColor rounded-full p-2 w-auto">
              <Image
                className="h-44 w-44 rounded-full"
                source={images.profile}
              />
            </View>
          </View>
        </View>
      </View>

      <View className="flex flex-row gap-2 items-center justify-center mt-20">
        <Text className="text-zinc-100 font-rBold text-3xl">
          Monkey D. Luffy
        </Text>
        <Image source={icons.verified} className="h-7 w-7" />
      </View>
    </>
  );
}

function MyAccountTab() {
  return (
    <TouchableOpacity className="w-full flex flex-row items-center justify-between px-3 py-3 bg-light-black rounded-2xl">
      <View className="flex flex-row gap-2 items-center">
        <Image source={icons.circleUser} className="h-6 w-6" />
        <Text className="text-xl text-zinc-300 font-rSemibold">My Account</Text>
      </View>
      <Image source={icons.back} className="rotate-[270deg] h-6 w-6" />
    </TouchableOpacity>
  );
}

function LoanMoneyTab() {
  return (
    <TouchableOpacity className="w-full flex flex-row items-center justify-between px-3 py-3 bg-light-black rounded-2xl">
      <View className="flex flex-row gap-2 items-center">
        <Image source={icons.receive} className="h-6 w-6" />
        <Text className="text-xl text-zinc-300 font-rSemibold">Loan Money</Text>
      </View>
      <Image source={icons.back} className="rotate-[270deg] h-6 w-6" />
    </TouchableOpacity>
  );
}

function SecuritySettingsTab() {
  return (
    <TouchableOpacity className="w-full flex flex-row items-center justify-between px-3 py-3 bg-light-black rounded-2xl">
      <View className="flex flex-row gap-2 items-center">
        <Image source={icons.settings} className="h-6 w-6" />
        <Text className="text-xl text-zinc-300 font-rSemibold">
          Security Settings
        </Text>
      </View>
      <Image source={icons.back} className="rotate-[270deg] h-6 w-6" />
    </TouchableOpacity>
  );
}

function LogOutButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.replace("/")}
      className="w-full flex flex-row items-center justify-between px-3 py-3 bg-light-black rounded-2xl mb-24"
    >
      <View className="flex flex-row gap-2 items-center">
        <Image source={icons.logOut} className="h-6 w-6" />
        <Text className="text-xl text-zinc-300 font-rSemibold">Log Out</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Profile;
