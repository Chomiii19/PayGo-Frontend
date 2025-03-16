import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { icons } from "../../constants/image";

function QrCodeScanner() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View className="flex-1 bg-backgroundColor" />;

  if (!permission.granted) {
    return (
      <View className="flex-1 flex-col bg-backgroundColor justify-center items-center">
        <Text className="text-zinc-200 font-rBold text-2xl">
          Camera Permission
        </Text>
        <Text className="text-zinc-400 font-rSemibold">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="flex justify-center items-center rounded-full py-2 px-3 bg-primary mt-3"
        >
          <Text className="text-zinc-200 font-rBold">GRANT PERMISSION</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-backgroundColor relative">
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        onBarcodeScanned={(result) => {
          router.push({
            pathname: "/(tabs)/sendPayGo",
            params: { accNum: result.data },
          });
        }}
      />

      <View className="flex-1 h-full w-full absolute z-20 px-5 py-3">
        <View className="flex flex-col">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row items-center gap-3"
          >
            <Image source={icons.back} className="h-6 w-6" />
            <Text className="text-zinc-200 font-mBold">Back</Text>
          </TouchableOpacity>

          <Text className="font-rBold text-zinc-100 text-4xl mt-10">
            Scan to Pay
          </Text>
          <Text className="font-rRegular text-zinc-300 mt-1">
            Align the QR code within the frame to scan.
          </Text>
        </View>
      </View>

      <View className="flex h-full w-full absolute z-10 flex-col">
        <View className="w-full h-[20%] bg-black/60"></View>
        <View className="w-full h-[50%] flex flex-row">
          <View className="w-[4%] h-full bg-black/60"></View>
          <View className="w-[92%] h-full"></View>
          <View className="w-[4%] h-full bg-black/60"></View>
        </View>
        <View className="w-full h-[30%] bg-black/60"></View>
      </View>

      <View className="w-full flex flex-row justify-center absolute z-20 bottom-28">
        <View className="w-[300px] flex flex-row justify-evenly bg-white/30 rounded-2xl py-2">
          <TouchableOpacity className="flex flex-col items-center">
            <Image
              source={icons.logOut}
              tintColor={"#efefef"}
              className="rotate-[270deg] h-10 w-10"
            />
            <Text className="font-rBold text-zinc-100 text-lg">Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/scanMe")}
            className="flex flex-col items-center"
          >
            <Image
              source={icons.qrCode}
              tintColor={"#efefef"}
              className="rotate-[270deg] h-10 w-10"
            />
            <Text className="font-rBold text-zinc-100 text-lg">Generate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default QrCodeScanner;
