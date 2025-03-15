import { View, Text, Image } from "react-native";
import React from "react";
import Header from "../../components/header";
import { images } from "../../constants/image";

const ScanMe = () => {
  return (
    <View className="flex-1 bg-backgroundColor">
      <Header name="My QR Code" />

      <View className="w-full h-full flex flex-col items-center mt-32 gap-4">
        <Text className="font-rBold text-3xl text-zinc-200">Scan Me!</Text>
        <Image
          source={images.myQrCode}
          className="w-[300px] h-[300px] rounded-2xl"
        />
      </View>
    </View>
  );
};

export default ScanMe;
