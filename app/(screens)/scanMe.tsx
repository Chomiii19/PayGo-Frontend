import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { images } from "../../constants/image";
import axios from "axios";
import getTokenFromStorage from "../../utils/getTokenFromStorage";

const ScanMe = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const authToken = await getTokenFromStorage();
        const response = await axios.get(
          "https://paygo-backend-1y0p.onrender.com/api/v1/app/generate-qrcode",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        setQrCodeUrl(response.data.qrCodeUrl);
        console.log(qrCodeUrl);
        console.log(qrCodeUrl);
      } catch (err) {
        console.error("Error generating qrcode");
      }
    };
    fetchQrCode();
  }, []);

  return (
    <View className="flex-1 bg-backgroundColor">
      <Header name="My QR Code" />

      <View className="w-full h-full flex flex-col items-center mt-32 gap-4">
        <Text className="font-rBold text-3xl text-zinc-200">Scan Me!</Text>
        <Image
          source={{ uri: qrCodeUrl }}
          className="w-[300px] h-[300px] rounded-2xl"
        />
      </View>
    </View>
  );
};

export default ScanMe;
