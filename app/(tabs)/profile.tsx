import { View, Text, Image } from "react-native";
import React from "react";
import Header from "../../components/header";
import { user } from "../../constants/image";

const Profile = () => {
  return (
    <View className="flex-1 bg-backgroundColor items-center">
      <Header name="Account Details" />

      <View className="p-4 w-full">
        <View className="w-full h-[180px] bg-primary rounded-lg relative">
          <View className="w-full absolute justify-center flex items-center top-24 z-10">
            <View className="bg-backgroundColor rounded-full p-2 w-auto">
              <Image className="h-44 w-44 " source={user} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
