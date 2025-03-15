import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/header";
import { icons, images } from "../../constants/image";
import { useRouter } from "expo-router";

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

function InviteFriends() {
  return (
    <View className="w-full px-5 my-6">
      <View className="w-full h-[100px] relative overflow-hidden rounded-2xl">
        <View className="h-full w-full bg-black/30 z-30 flex flex-row justify-between items-center  px-4 py-2">
          <View className="flex flex-col justify-between h-full">
            <Text className="text-zinc-100 font-rBold text-xl">
              Invite Friends
            </Text>
            <Text className="w-80 text-zinc-300 font-mRegular text-sm">
              Support us by inviting your friends to join and enjoy seamless
              banking with us!
            </Text>
          </View>
          <Image source={icons.addFriend} className="h-16 w-16" />
        </View>
        <Image
          source={images.bgGreen}
          className="w-full h-full absolute scale-150"
          style={{ resizeMode: "cover" }}
        />
      </View>
    </View>
  );
}

function MyAccountTab() {
  return (
    <Pressable className="w-full flex flex-row items-center justify-between px-3 py-3 bg-light-black rounded-2xl">
      <View className="flex flex-row gap-2 items-center">
        <Image source={icons.circleUser} className="h-6 w-6" />
        <Text className="text-xl text-zinc-300 font-rSemibold">My Account</Text>
      </View>
      <Image source={icons.back} className="rotate-[270deg] h-6 w-6" />
    </Pressable>
  );
}

function LoanMoneyTab() {
  return (
    <Pressable className="w-full flex flex-row items-center justify-between px-3 py-3 bg-light-black rounded-2xl">
      <View className="flex flex-row gap-2 items-center">
        <Image source={icons.receive} className="h-6 w-6" />
        <Text className="text-xl text-zinc-300 font-rSemibold">Loan Money</Text>
      </View>
      <Image source={icons.back} className="rotate-[270deg] h-6 w-6" />
    </Pressable>
  );
}

function SecuritySettingsTab() {
  return (
    <Pressable className="w-full flex flex-row items-center justify-between px-3 py-3 bg-light-black rounded-2xl">
      <View className="flex flex-row gap-2 items-center">
        <Image source={icons.settings} className="h-6 w-6" />
        <Text className="text-xl text-zinc-300 font-rSemibold">
          Security Settings
        </Text>
      </View>
      <Image source={icons.back} className="rotate-[270deg] h-6 w-6" />
    </Pressable>
  );
}

function LogOutButton() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.replace("/")}
      className="w-full flex flex-row items-center justify-between px-3 py-3 bg-light-black rounded-2xl mb-24"
    >
      <View className="flex flex-row gap-2 items-center">
        <Image source={icons.logOut} className="h-6 w-6" />
        <Text className="text-xl text-zinc-300 font-rSemibold">Log Out</Text>
      </View>
    </Pressable>
  );
}

export default Profile;
