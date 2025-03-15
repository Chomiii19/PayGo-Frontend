import { View, Text, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants/image";

function InviteFriends() {
  return (
    <View className="w-full px-5" style={{ marginVertical: 13 }}>
      <View
        className="w-full relative overflow-hidden rounded-2xl"
        style={{ height: 120 }}
      >
        <Image
          source={images.bgGreen}
          className="w-full h-full absolute scale-150"
          style={{ resizeMode: "cover", zIndex: 1 }}
        />

        <View
          className="h-full w-full bg-black/30 flex flex-row justify-between items-center px-4 py-2"
          style={{ position: "absolute", zIndex: 2 }}
        >
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
      </View>
    </View>
  );
}

export default InviteFriends;
